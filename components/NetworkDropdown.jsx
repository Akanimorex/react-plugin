import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../helper-fxs/use-click-outside";

const NetworkDropdown = ({
  variant,
  chainsList,
  setActiveChain,
  activeSourceChain,
  activeDestinationChain,
  loading,
}) => {
  let chainList;
  const [show, setShow] = useState(false);

 

  const networkRef = useRef();
  // useClickOutside(networkRef, () => setShow(false));

  if (chainsList.result?.length) {
    chainList =
      variant === "source"
        ? chainsList.result.filter(
            (d) =>
              d.sendingEnabled &&
              d.receivingEnabled !== false &&
              d.name.toLowerCase() !== "polygon zkevm"
          )
        : chainsList.result;
  }

  // useEffect(() => {
  //   if (networkRef.current) {
  //     console.log(networkRef.current);
  //   }
  // }, [show]);

  return (
    <div className="flex gap-1 ">
      <span>{variant === "source" ? "From" : "To"}</span>
      {loading ? (
        <div
          role="status"
          className="flex max-w-sm animate-pulse items-center gap-1">
          <div className=" h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className=" h-5 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <button
          className="flex w-full items-center justify-between  gap-1  px-1"
          onClick={() => setShow(!show)}>
          <span className="flex items-center gap-1">
            <img
              className="rounded-full"
              src={
                variant === "source"
                  ? activeSourceChain?.icon
                  : activeDestinationChain?.icon
              }
              alt="logo"
              width={20}
            />

            {variant === "source"
              ? activeSourceChain?.name
              : activeDestinationChain?.name}
          </span>
          <i className={`fa-solid fa-chevron-${show ? "up" : "down"}`}></i>
        </button>
      )}

      {/* all networks dropdown */}
      {show && (
        <div ref={networkRef}>
          <section className="absolute  bg-black p-2">
            {chainList
              ?.filter(
                (d) =>
                  d.chainId !== activeSourceChain?.chainId &&
                  d.chainId !== activeDestinationChain?.chainId
              )
              .map((d, i) => (
                <button
                  className="block flex w-full items-center gap-5 py-1 hover:bg-gray-400"
                  key={i}
                  onClick={() => {
                    setShow(false);
                    setActiveChain(variant, d.chainId);
                  }}>
                  <img
                    className="rounded-full"
                    src={d.icon}
                    alt={`${d.icon} logo`}
                    width={20}
                  />
                  {d.name}
                </button>
              ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default NetworkDropdown;
