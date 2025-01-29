
import { ChangeEvent } from "react";

interface LabelledInputType {
    label : string,
    placeholder : string,
    onChange : ( e : ChangeEvent<HTMLInputElement>) => void;
}

function InputBox ( {label , placeholder  , onChange }: LabelledInputType) {
    return <div>
        <label className="mb-2 text-sm font-medium text-gray-900 ">{label}</label>
        <input type="text" onChange={ onChange} placeholder= {placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:to-blue-500 w-full p-2.5 " />
    </div>
}

export default InputBox;