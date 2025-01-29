import { Link } from "react-router-dom";
import InputBox from "./InputBox";
import { SignUpInput } from "@imsanc/medium-common";
import { useState } from "react";

export const Auth = ( {type} : { type : "signin" | "signup"}) => {

    const isSignUp = (type === "signup");
    const postInputs = useState<SignUpInput> ({
        name : "",
        email : "",
        password : ""
    });

    return <div className="h-screen flex justify-center ">
        <div className=" flex justify-center  flex-col">
            <div>
                <div className="text-4xl font-extrabold">
                    Create an Account
                </div>
            </div>
            <div className=" pt-2 flex justify-center  text-gray-600 font-thin">
                <div> Already have an account? </div>
                <Link className="pl-3 underline " to={"/signin"}> Login</Link>
            </div>

            <div>
                <InputBox  label="User Name" placeholder="Sanchit mishra" onChange={ ()=>{}} />
            </div>
            
            
        </div>
        
    </div>
}