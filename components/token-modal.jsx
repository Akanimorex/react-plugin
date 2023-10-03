import React, { useEffect, useState } from "react";

const TokenModal = ({
  variant,
  sourceTokens,
  destinationTokens,
  activeSourceToken,
  activeDestinationToken,
  setActiveToken,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSourceTokens, setFilteredSourceTokens] = useState([]);
  const [filteredDestinationTokens, setFilteredDestinationTokens] = useState(
    []
  );

  // useEffect(()=>{
  //   fetchTokenData();
  // },[fetchTokenData])

  useEffect(() => {
    if (searchQuery.length) {
      const payload = sourceTokens?.filter((t) => {
        const nameMatch = t?.name?.toLowerCase()?.match(searchQuery);
        const addressMatch = t?.address?.toLowerCase()?.match(searchQuery);
        return nameMatch || addressMatch;
      });

      setFilteredSourceTokens(payload);
    } else {
      setFilteredSourceTokens(sourceTokens);
    }
  }, [sourceTokens, searchQuery]);

  useEffect(() => {
    if (searchQuery.length) {
      const payload = destinationTokens?.filter((t) => {
        const nameMatch = t?.name?.toLowerCase()?.match(searchQuery);
        const addressMatch = t?.address?.toLowerCase()?.match(searchQuery);
        return nameMatch || addressMatch;
      });

      setFilteredDestinationTokens(payload);
    } else {
      setFilteredDestinationTokens(destinationTokens);
    }
  }, [destinationTokens, searchQuery]);

  return (
    <div>
      {isLoading ? (
        <div
          role="status"
          className="flex max-w-sm animate-pulse items-center gap-1">
          <div className=" h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className=" h-5 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : sourceTokens?.length === 0 || destinationTokens?.length === 0 ? (
        <p>Unsupported</p>
      ) : (
        <button
          className="block flex items-center justify-between  gap-3 px-1"
          onClick={() => setShowModal(!showModal)}>
          <span className="flex items-center justify-between gap-2">
            <img
              className="rounded-full"
              src={
                variant === "source"
                  ? activeSourceToken?.logoURI
                  : activeDestinationToken?.logoURI
              }
              alt={`logo`}
              width={20}
            />
            {variant === "source"
              ? activeSourceToken?.symbol
              : activeDestinationToken?.symbol}
          </span>
          <i className={`fa-solid fa-chevron-down`}></i>
        </button>
      )}

      {showModal && (
        <>
          {/* modal underlay */}
          <div
            className="fixed left-0 top-0 w-full overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
              console.log("close modal!");
            }}
            style={{
              height: "auto",
              background: "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7))",
              backdropFilter: "blur(5px)",
            }}></div>

          {/* modal inner */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 overflow-hidden bg-[#111827] text-white"
            style={{ width: "30vw", height: "55vh" }}>
            <header className="my-3">
              <section className="flex items-center justify-between border-b-2 p-2">
                <h5>Select Token</h5>
                {/* <button onClick={()=>fetchTokenDataWithAddress()}>balances</button> */}
                <button onClick={() => setShowModal(false)} className="text-xl">
                  <i className="fa-solid fa-close"></i>
                </button>
              </section>

              <section className="my-1 px-5">
                <form className="flex justify-center ">
                  <input
                    className="mx-2 bg-transparent text-white w-full border border-gray-400 px-2 py-1 focus:outline-0"
                    type="search"
                    placeholder="Search by name or paste address"
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value.toLowerCase())
                    }
                  />
                </form>
              </section>
            </header>

            <main className="h-full overflow-y-scroll">
              {console.log(filteredSourceTokens,"filtered tokens")}
              {variant === "source"
                ? filteredSourceTokens?.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveToken(variant, t.symbol.toLowerCase());
                        setShowModal(false);
                      }}
                      className="block flex w-full items-center gap-5 p-3 hover:bg-gray-500">
                      <div>
                        <img
                          src={t.logoURI}
                          alt={`${t.name} icon`}
                          width={30}
                        />
                      </div>
                      <div>
                        <h6>
                          {t.name}

                          {activeSourceToken?.name === t.name && (
                            <i className="fa-solid fa-circle-check mx-2 text-green-800"></i>
                          )}
                        </h6>
                        <p className="text-left text-xs">{t.symbol}</p>
                      </div>
                    </button>
                  ))
                : filteredDestinationTokens?.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveToken(variant, t.symbol.toLowerCase());
                        setShowModal(false);
                      }}
                      className="block flex w-full items-center gap-5 p-3 hover:bg-gray-300">
                      <div>
                        <img
                          src={t.logoURI}
                          alt={`${t.name} icon`}
                          width={30}
                        />
                      </div>
                      <div>
                        <h6>
                          {t.name}

                          {activeDestinationToken?.name === t.name && (
                            <i className="fa-solid fa-circle-check mx-2 text-green-800"></i>
                          )}
                        </h6>
                        <p className="text-left text-xs">{t.symbol}</p>
                      </div>
                    </button>
                  ))}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default TokenModal;
