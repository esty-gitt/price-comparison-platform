import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Register from './components/Register';
import Layout from './components/Layout';
import MenuSide from './components/shoppingList/MenuSide';
import LogOut from './components/LogOut';
import StoreResult from './components/shoppingList/StoreResult';
import User from './components/admin/Users';
import ProtectedRoute from './components/ProtectedRoute';
import AllPrices from './components/admin/prices/AllPrices';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/layout" element={<Layout />} >
            <Route index element={<MenuSide />} />
            <Route path="logOut" element={<LogOut />} />
            <Route path="prices" element={<AllPrices/>}/>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="users" element={<User />} />
              
            </Route>
          </Route>
          <Route path="storeResult" element={<StoreResult />} />
          <Route path="/unauthorized" element={<h1>Unauthorized</h1>} />

        </Routes>

      </Router>

    </>

  )


}

export default App;
