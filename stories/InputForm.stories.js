import React, { useState } from "react";
import { InputForm } from "../components/InputForm";

export default  {
    title: 'Example/InputField',
    component:InputForm
}

export const Basic = () => {
    const [value, setValue] = useState('');

    const handleChange = (e) =>{
        e.preventDefault()
        setValue(e.target.value)
    }

    return <InputForm label="Input field" placeholder="type in your password" value={value} onChange={handleChange} />
}
