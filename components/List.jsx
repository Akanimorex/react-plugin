import React from "react"

export const List = ({variant, items})=>{

    // console.log(variant)
    const ListComponent = variant ==='ordered'?'ol':'ul';
    return (
        <div>
           
            <ListComponent>
                {items.map((item,index)=>{
                    // console.log(item)
                   return <li className="font-bold text-black" key={index}>{item}</li>
                })}
             
            </ListComponent> 
        </div>
    )
}