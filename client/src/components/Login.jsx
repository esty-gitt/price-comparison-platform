import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import '../css/register.css';
import { useLoginMutation } from '../slices/users/userApiSlice';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/users/userSlice';
const Login = () => {
    const dispatch = useDispatch();
    const [login, { isError, error, isSuccess, data: response }] = useLoginMutation();
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const toast = useRef(null);

    const navigate = useNavigate();
    const defaultValues = {
        userName: '',
        password: '',
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const showMultiple = (message, isSuccessOrError) => {
        if (isSuccessOrError ===0) {
            toast.current.show(
                { severity: 'error', summary: 'Error', detail: message, life: 3150 })
        }

        else {
            toast.current.show(
                { severity: 'success', summary: 'Success', detail: 'Message Content', life: 3000,sticky: true })            
        }
    };
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(response))
            showMultiple("",1);
            navigate('/layout')
        }
        if (isError) {
            showMultiple(error?.data?.message,0)
        }

    }, [isSuccess, isError])

    const handleLogin = async (data) => {
        try {
            const response1 = await login(data);
            setFormData(data);
        }
        catch (err) {
            console.log(err);

        }
    }

    const onSubmit = (data) => {
        handleLogin(data)
        reset();

    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <div className="card flex justify-content-center gap-2">
                <Toast ref={toast} />

            </div>
            {/* <Dialog visible={showMessage} onClick={()=>{ navigate('/layout');}} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>login Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        You are logged in under the username <b>{formData.userName}</b>
                    </p>
                </div>
            </Dialog> */}

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">LogIn</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="userName" control={control} rules={{ required: 'userName is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="userName" className={classNames({ 'p-error': errors.name })}>userName*</label>
                            </span>
                            {getFormErrorMessage('userName')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <Button icon="pi pi-user" type="submit" label="Log in" className="mt-2" />
                        <div className="mt-2">
                            <Divider className="hidden md:flex" >
                                <b>OR</b>
                            </Divider>
                            <Divider className="flex md:hidden" align="center">
                                <b>OR</b>
                            </Divider>
                        </div>
                        <Button icon="pi pi-user-plus" label="Sign up" className="mt-2" onClick={() => {
                            navigate('/register');
                        }} />

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;