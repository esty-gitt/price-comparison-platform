import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import AddUser from './AddUser';
import { useSelector } from 'react-redux';
import { useDeleteUserMutation, useGetUserQuery } from '../../../slices/users/userApiSlice';

const AllUsers = () => {
    let emptyUser = {
        _id: null,
        name: "",
        userName: "",
        permission: "",
        email: "",

    };

    const [users, setUsers] = useState([]);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [onHide, setHide] = useState(false)
    const [edit, setEdit] = useState(null)
    const toast = useRef(null);
    const dt = useRef(null);
    const { data: datausers, isSuccess: usersIsSuccess } = useGetUserQuery()
    const [deletedUser, { data: updataedList, isSuccess: succesDeleteUser }] = useDeleteUserMutation()
    const userId = useSelector((state => state.user.userInfo._id))
    useEffect(() => {
        if (usersIsSuccess) {
            console.log("server", datausers)
            setUsers(
                datausers.map((user) => {
                    return {
                        _id: user._id,
                        userName: user.userName,
                        name: user.name,
                        email: user.email,
                        permission: user.permission
                    }
                })
            )

        }



    }, [usersIsSuccess]);
    useEffect(() => {
        if (onHide) {
            hideDialog()

        }

    }, [onHide])
    useEffect(() => {
        if (succesDeleteUser) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            setUsers(updataedList)
        }

    }, [succesDeleteUser])

    useEffect(() => {
        console.log(selectedUsers)
    }, [selectedUsers])

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);

    };
    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
        setHide(false)
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };



    const editUser = (user) => {
        const userrr = { _id: user._id, name: user.name, userName: user.userName, email: user.email, permission: user.permission }
        setEdit(userrr)
        setUserDialog(true);
    };

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        setDeleteUserDialog(false);
        setUser(emptyUser);
        try {
            deletedUser(user._id)
        }
        catch (err) {
            console.log(err)
        }
    };





    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };

    const deleteSelectedUsers = async () => {
        let _user = users.filter((val) => selectedUsers.includes(val));
        console.log(_user, "sssssss")
        try {
            const promises = _user.map(_user => deletedUser(_user._id).unwrap());
            await Promise.all(promises);
            setUsers(prev => prev.filter(item => !_user.includes(item)));
        } catch (error) {
            console.error("Error deleting objects:", error);
        }
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
    };



    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteUser(rowData)} />
            </React.Fragment>
        );
    };
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">{"users"}</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );

    const deleteUserDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteUser} />
        </React.Fragment>
    );
    const deleteUsersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedUsers} />
        </React.Fragment>
    );
    return (
        <div className="   mb-3 md:mb-0" style={{ flex: 1 }}>
            <Toast ref={toast} />
            <div className="card ">
                <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={users} selection={selectedUsers} onSelectionChange={(e) => {
                    setSelectedUsers(e.value)
                }}
                    dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} user" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="userName" header="UserName" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="permission" header="Permission" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



            <Dialog visible={deleteUserDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && (
                        <span>
                            Are you sure you want to delete <b>{user.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteUsersDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {user && <span>Are you sure you want to delete the selected user?</span>}
                </div>
            </Dialog>
            {userDialog ? <AddUser setUsers={setUsers} users={users} setHide={setHide} edit={edit} setEdit={setEdit} /> : <></>}
        </div>
    )

}
export default AllUsers;