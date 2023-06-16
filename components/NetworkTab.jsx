import React, { useState, useEffect } from "react";
import { data } from "../utils/data";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

export const NetworkTab = ({ variant }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedChain, setSelectedChain] = useState(null);




    const getActiveChain = (id) => {
        //updateActive network

        setSelectedChain(()=>data.find((d)=>d.chainId ===id) )

        //togglenetwork

        setIsOpen(!isOpen)
      
    };


  


    useEffect(()=>{



        //if variant is FROM, set active network as Ethereum
            if (variant === "from") {
                setSelectedChain(()=>
                data.find(d=>d.name.toLowerCase() === "ethereum")
                )
            }else 
            if(variant === "to"){
                setSelectedChain(()=>
                data.find(d=>d.name.toLowerCase() === "polygon")
                )
            }
         
        //if variant is TO, set active network as Polygon

    },[])

    return (
        <div className="w-1/6">

            <div className="relative flex flex-col">
                <button onClick={() => setIsOpen(!isOpen)} className=" w-full p-2 items-center  flex justify-between  border-black font-bold tracking-wider border focus:border-black">
                    <span className="flex items-center">
                        {selectedChain && (
                            <img
                                src={selectedChain.icon}
                                className="rounded-full"
                                alt="icon"
                                height="30"
                                width="30"
                            />
                        )}
                        {selectedChain?.name}
                    </span>
                    {
                        !isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />
                    }
                </button>

                <ul className="border-black flex  flex-col items-center rounded-lg p-2 w-full ">
                    {
                        isOpen && (data
                            .filter((c) => c.chainId !== selectedChain.chainId)
                            .map((item, i) => {
                                return (
                                    <li
                                        key={i}
                                        onClick={() => {
                                          
                                            getActiveChain(item.chainId);
                                        }}
                                        className="flex w-full justify-around  hover:bg-blue-300 p-3 cursor-pointer  hover:border-l-white border-l-4"
                                    >
                                        <img
                                            src={item?.icon}
                                            className="rounded-full"
                                            alt="icon"
                                            height="30"
                                            width="30" /> {item?.name} </li>
                                )
                            })
                        )
                    }

                </ul>
            </div>



        </div>
    )
}



