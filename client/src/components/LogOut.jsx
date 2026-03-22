import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken } from "../slices/users/userSlice";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const LogOut= () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      setVisible(true); 
    }, []);
  
    const handleConfirm = () => {
      dispatch(removeToken());
      setVisible(false);
      navigate("/");
    };
  
    const handleCancel = () => {
      setVisible(false);
      navigate("/layout");
    };
  
    const footer = (
      <div>
        <Button label="No" icon="pi pi-times" onClick={handleCancel} className="p-button-text" />
        <Button label="Yes" icon="pi pi-check" onClick={handleConfirm} autoFocus />
      </div>
    );
    return(<>
 <Dialog
      header="LogOut"
      visible={visible}
      style={{ width: '350px'}}
      footer={footer}
      onHide={handleCancel}
      closable={false}
    >
      <p>Are you sure you want to log out?</p>
    </Dialog>
  
    </>)
}
export default LogOut;