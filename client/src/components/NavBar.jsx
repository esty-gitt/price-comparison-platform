import React, { useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const NavBar = () => {
    const user = useSelector((state) => state.user.userInfo);
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0); 
    const items = [
        { label: 'Shooping List', icon: 'pi pi-home', command: () => navigate('/layout') },
        { label: 'Log Out', icon: 'pi pi-inbox', command: () => navigate('/layout/logOut') },
        ...(user.permission === 'admin'
            ? [{ label: 'Users', icon: 'pi pi-inbox', command: () => navigate('/layout/users') },
                { label: 'Prices', icon: 'pi pi-inbox', command: () => navigate('/layout/prices') }
            ]
            : [])
    ];
    const handleTabChange = (e) => {
          setActiveIndex(e.index); 
        items[e.index].command();
    }
    return (
        <div className="navbar-container" style={{ position: 'relative', width: '100%' }}>
            <div className="card  " style={{ width: '100%' }}>
                <TabMenu model={items}activeIndex={activeIndex}  onTabChange={(e) => { handleTabChange(e) }} />
            </div >
            <div className="user-info" style={{
                position: 'absolute',
                top: '50%',
                right: '20px',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
                zIndex: 2
            }}>
                <div style={{ marginLeft: '10px', width: '300px', minWidth: '200px', padding: '12px' }} title="פרטי משתמש">
                    <div>
                        <div><b>name:</b> {user.name}</div>
                        <div><b>userName:</b> {user.userName}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default NavBar;