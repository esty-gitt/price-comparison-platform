import React, { use, useEffect, useRef, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Controller, useForm } from "react-hook-form"
import { Dialog } from 'primereact/dialog';
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useAddUserMutation, useUpdataUserMutation } from '../../slices/users/userApiSlice';
const AddUser = ({ setUsers, users, setHide, edit, setEdit }) => {
    const [addUser, { data: addedUser, isSuccess: isSuccessAdd, isError: addError, status }] = useAddUserMutation();
    const [updateUser, { data: updatedUser, isSuccess: isSuccessUpdate, isError: updateError }] = useUpdataUserMutation();
    const toast = useRef(null);
    const userId = useSelector((state => state.user.userInfo._id))
    useEffect(() => {
        if (isSuccessAdd) {
            setUsers(prev => [...prev, { _id: addedUser._id, product: addedUser.productId.name, store: addedUser.storeId.name, user: addedUser.user }])
            setHide(true)
        }
        if (isSuccessUpdate) {
            setUsers(updatedUser.map((user) => {
                return {
                    _id: user._id,
                    user: user.user,
                    product: user.productId.name,
                    store: user.storeId.name
                }

            }))
            setHide(true)
        }
        // if (updataError) {
        //     toast.current.show(
        //         { severity: 'error', summary: 'Error', detail: status, life: 3150 })
        // }
    }, [ isSuccessAdd, addError, isSuccessUpdate])
 
   
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: edit?.product || "",
            userName: edit?.userName || "",
            email: edit?.userName ||"",
            permission:edit?.permission ||"",
        }
    })

    const onSubmit = (data) => {
        console.log("onsubmit", )
        try {
                if (!edit) {
                    //addUser({ user: data.user, storeId: _newDataStore._id, productId: newData._id })
                }
                else {

                    console.log("hiiiiii")
                    setEdit(null)
                    updateUser({ _id: edit._id,...data})
                }
            }

        
        catch (err) {
            console.log(err)
        }
    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={() => { setEdit(null);setHide(true) }} />
            <Button label="Save" icon="pi pi-check" onClick={handleSubmit(onSubmit)} />
        </React.Fragment>
    );
    return (

        <Dialog visible={true} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={() => { setHide(true) }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                       <div className="formgrid grid">
                    <label htmlFor="quantity" className="font-bold">
                        Name
                    </label>
                </div >
                <div className="card flex justify-content-center">
                    <Controller
                        name="name"
                        control={control}
                          rules={{ required: true }}
                        render={({ field }) => (
                            <InputText
                                type="text"
                                placeholder="Small"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                </div>

                  <div className="formgrid grid">
                    <label htmlFor="quantity" className="font-bold">
                        userName
                    </label>
                </div >
                <div className="card flex justify-content-center">
                    <Controller
                        name="userName"
                        control={control}
                          rules={{ required: true }}
                        render={({ field }) => (
                            <InputText
                                type="text"
                                placeholder="Small"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                </div>

                <div className="formgrid grid">
                    <label htmlFor="quantity" className="font-bold">
                        email
                    </label>
                </div >
                <div className="card flex justify-content-center">
                    <Controller
                        name="email"
                        control={control}
                          rules={{ required: true }}
                        render={({ field }) => (
                            <InputText
                                type="text"
                                placeholder="Small"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                </div>
<div className="formgrid grid">
                    <label htmlFor="quantity" className="font-bold">
                        permission
                    </label>
                </div >
                <div className="card flex justify-content-center">
                    <Controller
                        name="permission"
                        control={control}
                          rules={{ required: true }}
                        render={({ field }) => (
                            <InputText
                                type="text"
                                placeholder="Small"
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e);
                                }}
                            />
                        )}
                    />
                </div>





            </form>
        </Dialog>

    )

}
export default AddUser;