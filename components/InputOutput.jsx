import { React } from "react"

 export const InputOutput =({ variant,value ,styles, disabled})=>{
    return(
        
            <form>
               {
                variant === "Output"? (
                <input 
                type="number" 
                className={Object.values(styles).join(" ")}
                value={value}
                placeholder="Enter amount to swap"
                disabled/>)
                :(<input
                 value={value}
                 className={Object.values(styles).join(" ")}
                  />)
               }
            </form>
       
    )
}

