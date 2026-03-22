
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
const Layout= () => {
    return (
        <>
          <NavBar className="block bg-primary font-bold text-center p-4 border-round mb-3"/>
          <Outlet className="block bg-primary font-bold text-center p-4 border-round mb-3"/>
        </> 
    )


}


export default Layout;