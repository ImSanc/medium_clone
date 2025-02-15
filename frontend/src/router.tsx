import { RouteObject } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Blog } from "./pages/Blog";
import NotFoundPage from "./pages/NotFound";
import { Blogs } from "./pages/Blogs";


const routes: RouteObject[] = [
    { path : "/" , element : <Signin/>  } , //TODO 
   { path : "/signin" , element : <Signin/> },
   { path : "/signup" , element : <Signup/> },
   { path : "/blog/:id" , element : <Blog/> },
   { path : "/blogs" , element : <Blogs/> },
   { path: "*", element : <NotFoundPage/>} //TODO
]

export default routes;