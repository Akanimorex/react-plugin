import React from "react";
import { secsToMinsConverter } from "../helper-fxs/secs-to-mins";

const Route = ({
  loading,
  routes,
  activeRoute,
  activeDestinationToken,
  isRouteModal,
  setRouteModal,
  selectActiveRoute
}) => {
  // console.log(routes, "ROUTE")
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8">
          <img
            className="w-full rounded-full"
            src={activeRoute?.userTxs[0]?.steps[0]?.protocol?.icon}
            alt="bridge logo"
          />
        </div>
        <div className="route-info text-[0.8em]">
          <h2>
            {activeRoute?.userTxs[0]?.steps[0]?.protocol?.displayName}
             {/* ~
            <span className="text-gray-400">
              {secsToMinsConverter(activeRoute?.userTxs[0]?.serviceTime)} mins
            </span> */}
          </h2>

          <div className="flex items-center gap-1 text-gray-400">
            <h2>
              Est. Output:
              <span className="text-white">
                {activeRoute?.toAmount} {activeDestinationToken?.symbol}
              </span>
            </h2>
            <h2>
              Gas Fees:
              <span className="text-white">
                ${activeRoute?.totalGasFeesInUsd.toFixed(3)}
              </span>
            </h2>
            <div
              className="cursor-pointer"
              onClick={() => setRouteModal(!isRouteModal)}
            >
              {" "}
              <p> View Route</p>
            </div>
          </div>
        </div>
      </div>

      {isRouteModal && (
        <>
          {/* modal underlay */}
          <div
            className="fixed left-0 top-0 w-full overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
              console.log("close modal!");
            }}
            style={{
              height: "100vh",
              background: "linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7))",
              backdropFilter: "blur(5px)",
            }}
          ></div>

          {/* modal inner  */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-sm bg-[#171721] text-white"
            style={{ width: "50vw", height: "80vh" }}
          >
            <header className="my-3">
              <section className="flex items-center justify-between border-b-2 p-2">
                <h5>View Routes</h5>
                <button
                  onClick={() => setRouteModal(false)}
                  className="text-xl"
                >
                  <i className="fa-solid fa-close"></i>
                </button>
              </section>
            </header>

            {routes.map((item) => {
              {console.log(item, "ROUTE ITEM")}
              return (
                <div className="border-[#C193FD]-2 text-white my-3 p-3 flex justify-between bg-[#1C1C28]"
                 key={item?.routeId}
                 onClick={ ()=> selectActiveRoute(item?.routeId) }
                 >
                  <span>{item?.usedBridgeNames}</span>
                  Gas Fees: ${item?.totalGasFeesInUsd.toFixed(3)}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Route;
