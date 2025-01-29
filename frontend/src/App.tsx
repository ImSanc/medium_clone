import './App.css'
import { BrowserRouter , useRoutes } from 'react-router-dom';
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
