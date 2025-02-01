import { Link } from "react-router-dom";
import InputBox from "./InputBox";
import { SignUpInput } from "@imsanc/medium-common";
import { useState } from "react";

export const Auth = ( {type} : { type : "signin" | "signup"}) => {

    const isSignUp = (type === "signup");
    const [postInputs , setPostInputs] = useState<SignUpInput> ({
        name : "",
        email : "",
        password : ""
    });

    return <div className="h-screen flex justify-center ">
        <div className=" flex justify-center  flex-col">
            <div>
                <div className="text-4xl font-extrabold px-10">
                    Create an Account
                </div>
            </div>
            <div className=" pt-2 flex justify-center  text-gray-600 font-thin">
                <div> Already have an account? </div>
                <Link className="pl-2 underline " to={"/signin"}> Login</Link>
            </div>

            <div className=" pt-8">
                <InputBox  label="User Name" placeholder="Your name" onChange={ (e)=>{
                    setPostInputs( c => ({
                        ...c,
                        name : e.target.value
                    }))
                }} />
                <InputBox  label="E-mail" placeholder="your..@email.com" onChange={ (e)=>{
                    setPostInputs( c => ({
                        ...c,
                        email : e.target.value
                    }))
                }} />
                <InputBox  label="password" placeholder="123456" type="password" onChange={ (e)=>{
                    setPostInputs( c => ({
                        ...c,
                        password : e.target.value
                    }))
                }} />
            </div>
            
            
        </div>
        
    </div>
}