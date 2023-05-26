import Input from "postcss/lib/input"

export const InputForm = ({
    value,
    onChange,
    label,
    placeholder
})=>{
    return (
        <div>
            <label className="m-3">{ label }</label>
            <input className="py-1 border border-black" type="text" placeholder={ placeholder } value={ value } onChange={onChange}  />
        </div>
    )
}