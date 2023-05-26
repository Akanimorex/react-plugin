import React from "react";

export const Modal = ({
    title,
    body,
    withCloseBtn,
    hasBgLayer,
    canCustomize,
    customStyles,
}) => {

    return (
        <div className={`flex h-screen items-center justify-center 
        ${canCustomize && hasBgLayer
                ? customStyles.background
                : ""
            
            }`}>

            <div className={`w-2/4 rounded ${
                canCustomize? customStyles.modalBg:"bg-gray-200"
            }
            `}>
                <div className="flex items-center justify-between p-3">
                    <h6 className="font-bold">{title}</h6>
                    {withCloseBtn && (
                        <button>
                            close
                        </button>
                    )}
                </div>

                <div className="mb-10 p-3 text-xl">
                    <h3>{body}</h3>
                </div>
                <div className="flex justify-between gap-1 text-white">
                    <button
                        className={`block w-[20%] m-2  px-3 py-2 text-left ${canCustomize
                            ? [...Object.values(customStyles.noBtn)].join(" ")
                            : "bg-gray-600 hover:bg-gray-700"
                            }`}>Confirm</button>
                    <button className={`block w-[20%] m-3  px-3 py-2 text-left ${canCustomize
                            ? [...Object.values(customStyles.yesBtn)].join(" ")
                            : "bg-gray-600 hover:bg-gray-700"
                        }`}> No</button>
                </div>
            </div>
        </div>
    )
};

