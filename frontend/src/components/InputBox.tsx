
import { ChangeEvent } from "react";

interface LabelledInputType {
    label : string,
    placeholder : string,
    onChange : ( e : ChangeEvent<HTMLInputElement>) => void;
}

function InputBox ( {label , placeholder  , onChange }: LabelledInputType) {
    return <div>
        <label className="block">{label}</label>
        <input type="text" onChange={ onChange} placeholder= {placeholder} />
    </div>
}

export default InputBox;