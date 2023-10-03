import { useEffect, useState } from "react";

//blockchain starts

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora],
  [
    alchemyProvider({ apiKey: "KsAEJekQaZg7rl_FzaF4ejlDqPm_GZ6I" }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'React plugin',
  projectId: 'c07a8b898d6fe54dc9fe9fa799a81d07',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

//blockchain ends

import NetworkDropdown from "../components/NetworkDropdown";
import TokenModal from "../components/token-modal";
import ConnectWallet from "../components/ConnectWallet";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveDestinationChain,
  setActiveSourceChain,
} from "../redux/features/chains/chains.slice";
import { getChains } from "../redux/features/chains/chains.slice";
import {
  getDestinationTokens,
  getSourceTokens,
  setActiveDestinationToken,
  setActiveSourceToken,
} from "../redux/features/tokens/tokens.slice";
import InputOutput from "../components/InputOutput";
import {
  fetchQuote,
  setActiveRoute,
} from "../redux/features/quote/quote.slice";
import Route from "../components/route";
import { fetchTokenBalance, TestThis } from "../redux/features/tokenBalances/TokenBalanceSlice";

import { ColorRing } from "react-loader-spinner";

const Wrapper = () => {

  const [connectedWalletAddress, setConnectedWalletAddress]=useState("");
  const [sourceAmount, setSourceAmount] = useState("");
  const [canAutoQuote, setCanAutoQuote] = useState(false);

  const [isRouteModal, setRouteModal] = useState(false);

  const dispatch = useDispatch();

  const { loading, chainsList, activeSourceChain, activeDestinationChain } =
    useSelector((state) => state.chains);
  const {
    loading: isLoading,
    sourceTokens,
    destinationTokens,
    activeSourceToken,
    activeDestinationToken,
  } = useSelector((state) => state.tokens);

  const {
    loading: loadingQuote,
    routes,
    activeRoute,
  } = useSelector((state) => state.quote);

  const {
    initialSourceTokenBalance,
    initialDestinationTokenBalance

  } = useSelector((state)=>state.balances);

  //choose active route

  const selectActiveRoute = (id) => {
    //  console.log(id, "selected route id");
    dispatch(setActiveRoute(id));
    setRouteModal(false);
  };

  // chains section
  const setActiveChain = (variant, id) => {
    switch (variant) {
      case "source":
        dispatch(setActiveSourceChain(id));
        break;

      case "destination":
        dispatch(setActiveDestinationChain(id));
        break;
      default:
        break;
    }
  };



  useEffect(() => {
    dispatch(getChains());
  }, []);

  useEffect(() => {
    if (chainsList.result?.length !== 0) {
      dispatch(setActiveSourceChain(1));
      dispatch(setActiveDestinationChain(137));
    }
  }, [chainsList]);

  // tokens section
  const setActiveToken = (variant, symbol) => {
    // the function updates activeSourceToken/activeDestinationToken whenever a token is selected from the tokensList based on the activeSourceChain/activeDestinationChain
    switch (variant) {
      case "source":
        dispatch(setActiveSourceToken(symbol));
        break;
      case "destination":
        dispatch(setActiveDestinationToken(symbol));
        break;
      default:
        break;
    }
  };

  const setActiveTokenParam = (tokenList, variant) => {
    const usdcToken = tokenList.find(
      (token) => token.symbol.toLowerCase() === "usdc"
    );

    const NATIVE_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
    const nativeToken = tokenList.find(
      (token) => token.address.toLowerCase() === NATIVE_TOKEN_ADDRESS
    );
    const firstToken = tokenList[0];
    console.log(firstToken);

    if (activeSourceChain?.chainId === activeDestinationChain?.chainId) {
      console.log("active and destination chain are the same");

      switch (variant) {
        case "source":
          dispatch(
            setActiveSourceToken(
              usdcToken?.symbol?.toLowerCase() ||
                firstToken?.symbol?.toLowerCase()
            )
          );
          break;
        case "destination":
          dispatch(
            setActiveDestinationToken(
              nativeToken?.symbol?.toLowerCase() ||
                firstToken?.symbol?.toLowerCase()
            )
          );
          break;
        default:
          break;
      }
    } else {
      console.log("active and destination chain are not the same");

      switch (variant) {
        case "source":
          dispatch(
            setActiveSourceToken(
              usdcToken?.symbol?.toLowerCase() ||
                nativeToken?.symbol?.toLowerCase() ||
                firstToken?.symbol?.toLowerCase()
            )
          );
          break;
        case "destination":
          dispatch(
            setActiveDestinationToken(
              usdcToken?.symbol?.toLowerCase() ||
                nativeToken?.symbol?.toLowerCase() ||
                firstToken?.symbol?.toLowerCase()
            )
          );
          break;
        default:
          break;
      }
    }
  };

  // function to fetch token balance

 
  useEffect(()=>{
    if (activeSourceChain?.chainId && activeSourceToken?.address){
      dispatch(fetchTokenBalance({
        activeSourceToken:activeSourceToken,
        sourceChainId:activeSourceChain?.chainId,
        userAddress:connectedWalletAddress || "0x3e8cB4bd04d81498aB4b94a392c334F5328b237b"
      }));
    }
  
  },[activeSourceToken, activeSourceChain, connectedWalletAddress])

  
  

  


  useEffect(() => {
    if (activeSourceChain?.chainId) {
      dispatch(getSourceTokens(activeSourceChain.chainId));
    }
  }, [activeSourceChain, activeDestinationChain]);

  useEffect(() => {
    if (activeSourceChain?.chainId && activeDestinationChain?.chainId) {
      dispatch(
        getDestinationTokens({
          sourceId: activeSourceChain.chainId,
          destinationId: activeDestinationChain.chainId,
        })
      );
    }
  }, [activeDestinationChain, activeSourceChain]);

  useEffect(() => {
    if (sourceTokens?.length) {
      setActiveTokenParam(sourceTokens, "source");
    }
  }, [activeSourceChain, sourceTokens]);

  useEffect(() => {
    if (destinationTokens?.length) {
      setActiveTokenParam(destinationTokens, "destination");
    }
  }, [activeDestinationChain, destinationTokens]);

  // quote section
  const handleSrcAmt = (e) => {
    setSourceAmount(e.target.value);
  };

  useEffect(() => {
    const goodPattern = /^0*[1-9][0-9]*$/;

    if (goodPattern.test(sourceAmount)) {
      console.log("fetching...");
      dispatch(
        fetchQuote({
          sourceChainId: activeSourceChain?.chainId,
          sourceTokenAddress: activeSourceToken?.address,
          destinationChainId: activeDestinationChain?.chainId,
          destinationTokenAddress: activeDestinationToken?.address,
          sourceAmount,
          userAddress: "0x3e8cB4bd04d81498aB4b94a392c334F5328b237b",
        })
      );
      setCanAutoQuote(true);
    } else {
      setCanAutoQuote(false);
    }
  }, [sourceAmount]);

  // TODO: figure out why the Interval function is making the request with/without a valid sourceAMount
  // useEffect(() => {
  //   if (canAutoQuote) {
  //     setInterval(() => {
  //       console.log("can auto quote:", canAutoQuote);
  //       console.log("source amount:", sourceAmount);
  //       dispatch(
  //         fetchQuote({
  //           sourceChainId: activeSourceChain?.chainId,
  //           sourceTokenAddress: activeSourceToken?.address,
  //           destinationChainId: activeDestinationChain?.chainId,
  //           destinationTokenAddress: activeDestinationToken?.address,
  //           sourceAmount,
  //           userAddress: "0x3e8cB4bd04d81498aB4b94a392c334F5328b237b",
  //         })
  //       );
  //     }, 60000);
  //   }
  // }, [canAutoQuote]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
       modalSize="compact" 
       chains={chains}
       theme={darkTheme({
        accentColor: '#7b3fe4',
        accentColorForeground: 'white',
        borderRadius: 'small',
        fontStack: 'system',
        overlayBlur: 'small',
       })}
       >
        {console.log(connectedWalletAddress,"wallet addy")}
        <ConnectWallet 
        connectedWalletAddress={connectedWalletAddress}
        setConnectedWalletAddress={setConnectedWalletAddress}
        />
        <div className="flex min-h-screen items-center justify-center text-white">
          <div className="flex w-1/3 flex-col gap-4 border bg-gray-900 p-4">
            <section className=" bg-[#111827]">
              <section className="flex items-center justify-between border-b border-b-gray-50 p-2">
                <div>
                  <NetworkDropdown
                    variant="source"
                    chainsList={chainsList}
                    setActiveChain={setActiveChain}
                    activeSourceChain={activeSourceChain}
                    loading={loading}
                  />
                </div>
                <div>Bal{initialSourceTokenBalance}</div>
              </section>

              <section className="flex items-center justify-between p-2">
                <div>
                  <InputOutput
                    variant={"source"}
                    sourceAmount={sourceAmount}
                    handleSrcAmt={handleSrcAmt}
                  />
                </div>
                <div className="w-auto bg-black rounded-full">
                  <TokenModal
                    variant="source"
                    sourceTokens={sourceTokens}
                    activeSourceToken={activeSourceToken}
                    setActiveToken={setActiveToken}
                    isLoading={isLoading}
                    connectedWalletAddress={connectedWalletAddress}
                  />
                </div>
              </section>
            </section>

            <section className="bg-[#111827]">
              <section className="flex items-center justify-between border-b border-b-gray-50 p-2">
                <div>
                  <NetworkDropdown
                    variant="destination"
                    chainsList={chainsList}
                    setActiveChain={setActiveChain}
                    activeDestinationChain={activeDestinationChain}
                    loading={loading}
                  />
                </div>
                <div>Bal</div>
              </section>

              <section className="flex items-center justify-between p-2">
                <div>
                  <InputOutput variant={"destination"} />
                </div>
                <div className="w-auto bg-black rounded-full">
                  <TokenModal
                    className="min-h-lg min-w-lg"
                    variant="destination"
                    destinationTokens={destinationTokens}
                    activeDestinationToken={activeDestinationToken}
                    setActiveToken={setActiveToken}
                    isLoading={isLoading}
                  />
                </div>
              </section>
            </section>

            {routes.length ? (
              <section className="bg-gray-600 p-2">
                <Route
                  loading={loadingQuote}
                  routes={routes}
                  activeRoute={activeRoute}
                  activeDestinationToken={activeDestinationToken}
                  isRouteModal={isRouteModal}
                  setRouteModal={setRouteModal}
                  selectActiveRoute={selectActiveRoute}
                />
              </section>
            ) : loadingQuote ? (
              <div className="flex items-center">
                <ColorRing width={50} height={50} />
                <p>Finding the best bridge routes for you</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Wrapper;