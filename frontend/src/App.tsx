import './App.css'
import { BrowserRouter , useRoutes } from 'react-router-dom';
import routes from './router';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AppRoutes( )
{
  return useRoutes(routes); //Loads routes dynamically 
}



function App() {
  return <>
    <BrowserRouter>
      <AppRoutes/>
      <ToastContainer theme="colored"/>
    </BrowserRouter>
  </>;
}

export default App
