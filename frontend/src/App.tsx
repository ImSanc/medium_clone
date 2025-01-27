import './App.css'
import { BrowserRouter , Route , Routes, useRoutes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Blog } from './pages/Blog';
import routes from './router';


function AppRoutes( )
{
  return useRoutes(routes); //Loads routes dynamically 
}

function App() {
  return <>
    <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
  </>;
}

export default App
