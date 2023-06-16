import { InputOutput } from "../components/InputOutput";


export default {
    title:"Example/Input-Output",
    component:InputOutput,
    args:{
        styles:{
            border:"border border-red-400",
            padding:"p-3"
        },
        value:'30,000',
        disabled:false
    }
}

export const InputVariant ={
    args:{
        variant:"Input",
        disabled:false
    }
}
export const OutputVariant ={
    args:{
        variant:"Output",
        disabled:true,
        value:30000
    }
}