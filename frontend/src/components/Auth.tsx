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
                <div className={`text-4xl font-extrabold px-8 ${ isSignUp ? "" :  "mx-9"}`}>
                { isSignUp ? "Create an Account" : "Login Account"}
                </div>
            </div>
            <div className=" pt-2 flex justify-center  text-gray-600 font-thin">
                <div> { isSignUp ? "Already have an account?" : "Don't have an Account?"} </div>
                <Link className=" pl-2 underline " to={  isSignUp ? "/signin" : "/signup"} >
                    { isSignUp ? "Login" : "Sign Up"}
                </Link>
            </div>
            <form>
                <div className=" pt-8">
                    <InputBox  label="User Name" placeholder="Your name..." onChange={ (e)=>{
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
                    <InputBox  label="Password" placeholder="123456..."  type="password" onChange={ (e)=>{
                        setPostInputs( c => ({
                            ...c,
                            password : e.target.value
                        }))
                    }} />
                </div>
            </form>
            <button type="button" className=" mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                {isSignUp ? "Sign Up" : "Sign in"}
            </button>

            
        </div>
        
    </div>
}