import { Link } from "react-router-dom";


export const Auth = ( {type} : { type : "signin" | "signup"}) => {

    const isSignUp = (type === "signup");

    return <div className="h-screen flex justify-center flex-col">
                <div className=" flex justify-center ">
                    <div className=" flex-col">
                        <div className=" font-extrabold text-5xl">
                        { isSignUp ? "Create an Account"  : "Log in"  }
                        </div>

                            {  
                                isSignUp && <div className=" flex flex-row text-center">
                                    <div className=" font-thin text-lg text-center text-slate-500">
                                        Already have an account?
                                    </div>
                                    <div className=" underline">
                                        <Link to={"/signin"}> Login</Link>
                                    </div>
                                </div>
                            }
                    
                        <div>
                            Page
                        </div>
                        <div>
                            Page
                        </div>
                
                    </div>
                </div>
            </div>
}