
import { ChangeEvent,HTMLInputTypeAttribute, useState } from "react";

interface LabelledInputType {
    label : string,
    placeholder : string,
    onChange : ( e : ChangeEvent<HTMLInputElement>) => void,
    type ?: HTMLInputTypeAttribute
}

function InputBox ( {type ,label , placeholder  , onChange }: LabelledInputType) {

    const [isPasswordVisible,setIsPasswordVisible] = useState(false);

    return (
        <div>
            <label className="mb-2 text-sm font-medium text-gray-900 ">{label}</label>
            <div className=" flex items-center border border-gray-300 rounded-lg bg-gray-50">
                <input 
                    type={ (type==="password" && !isPasswordVisible ) ? "password" : "text" }
                    onChange={ onChange } 
                    placeholder= {placeholder} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:to-blue-500 w-full p-2.5 outline-none border-none" 
                />
                { type === "password"  && (
                    <div  onClick={ ()=>setIsPasswordVisible( (isPasswordVisible)=>(!isPasswordVisible)) }   className="px-3 cursor-pointer">
                        {isPasswordVisible ? (
                            // Eye Open Icon (Password Visible)
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-slate-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774m-11.544-1.724a10.47 10.47 0 0 1-4.293-5.774A10.45 10.45 0 0 1 12 4.5m-3 7.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" />
                            </svg>
                        ) : (
                            // Eye Closed Icon (Password Hidden)
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-slate-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        )}

                    </div>)
                }
            </div>
        </div>
    );
}

export default InputBox;