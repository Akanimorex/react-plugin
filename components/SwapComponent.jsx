import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { FaSettings } from "react-icons/fa";
import { MdSwapVerticalCircle } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";



export const SwapComponent = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-[#F9F8FD] ">
            <div className="bg-white w-4/6 p-5 rounded-xl ">
                <div className="flex justify-between">
                    <p className="font-bold">Transfer</p>
                    <div className="flex items-baseline gap-1">
                        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-socket-primary">
                            <IoMdRefresh className="h-[25px] w-[25px]" />
                        </div>
                        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-socket-primary ">

                            <AiFillSetting className="h-[25px] w-[25px]" />
                        </div>
                    </div>
                </div>

                <div className="w-[100%] bg-gray-200 p-4 m-2 rounded-md">
                    <div></div>
                    <div className="w-[100%]">
                        <input type="number" placeholder="0.0" className="w-[80%] p-3 focus:outline-none bg-gray-200 text-xl font-bold appearance-none" />
                        <select className="p-2 bg-gray-200 focus:outline-none">
                            <option value={"USDC"}>USDC</option>
                            <option value={"USDC"}>USDC</option>
                            <option value={"USDC"}>USDC</option>
                            <option value={"USDC"}>USDC</option>
                            <option value={"USDC"}>USDC</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center text-3xl"> <MdSwapVerticalCircle /> </div>

                <div className="w-[100%] bg-gray-200 p-4 m-2">
                    <input type="number" placeholder="0.0"  disabled="true"  spellCheck="false" className="w-[80%] p-3 focus:outline-none bg-gray-200 text-xl font-bold appearance-none" />
                    <select className="p-2 bg-gray-200 focus:outline-none">
                        <option value={"USDC"}>USDC</option>
                        <option value={"USDC"}>USDC</option>
                        <option value={"USDC"}>USDC</option>
                        <option value={"USDC"}>USDC</option>
                        <option value={"USDC"}>USDC</option>
                    </select>
                </div>
            </div>
        </div>
    )
}