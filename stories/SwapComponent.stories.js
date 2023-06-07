import { SwapComponent } from "../components/SwapComponent";


export default {
    title:'Example/Swap',
    component:SwapComponent,
    args:{
        darkMode:false,
        disabled:false
    }
}

export const DarkMode = {
    args: {
        darkMode:true
    }
}

export  const disabledOutput ={
    args:{
        disabled:true
    }
}