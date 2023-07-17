import { useState } from "react"


function InputText({ labelTitle, labelStyle, type, isRequired = false,name, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) {

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({ updateType, value: val })
    }

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content font-bold " + labelStyle}>{labelTitle}</span>
            </label>
            <input   required={isRequired} type={type || "text"} value={value} placeholder={placeholder || ""}
                onChange={(e) => updateInputValue(e.target.value)}
                name={name}
                className="border border-solid border-gray-400 rounded p-2 outline-none  input-bordered w-full  " />
        </div>
    )
}


export default InputText

//  "attributes_ln": {
// 0:"uzbek",
// 1:"meva"

// },
// "attributes_kr": {},
// "attributes_ru": {},
// "attributes_en": {},