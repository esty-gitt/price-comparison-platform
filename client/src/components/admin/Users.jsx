import React, { useState, useEffect, useRef, use } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useAddUserMutation } from '../../slices/users/userApiSlice';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import{useGetUsersQuery} from '../../slices/users/userApiSlice';
import { useDeleteUserMutation } from '../../slices/users/userApiSlice';
import { set } from 'react-hook-form';
const Users=()=>{
    let emptyProduct = {
        name: '',
        userName: '',
        email: '',
        permission: '',
      
     
      
    };
const [password, setPassword] = useState('');
    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const { data: users, isLoading, isError,isSuccess ,refetch} = useGetUsersQuery(); 
    const [addUser, {data,error,isError:isErrorAddUser,isSuccess:isSuccessAddUser}] = useAddUserMutation();
    const[deleteUser, {isSuccess:isSuccessDeleteUser}] = useDeleteUserMutation();
    useEffect(() => {
        if( isSuccess || users) 
          {  setProducts(users);
            
          }
        else
            setProducts([]);
        
    }, [users,isSuccess]);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = async() => {
       
        const newUser = { ...product, password };
       
        try {
            const response = await addUser(newUser).unwrap(); 
         
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'User added successfully',
                life: 3000
            });
    
            
             setSubmitted(true); 
         setProductDialog(false);
           setPassword('');
            refetch(); 
            setProduct(emptyProduct);
         
        } catch (err) {
            console.error("Error adding user:", err);
            const message = err?.data?.message || "An unexpected error occurred";
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: message,
                life: 3000
            });
            setPassword('');
          
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = async() => {
try {
     const _id = product._id;
  console.log("ddddd",product._id)
       await deleteUser(_id).unwrap();
       refetch()
       setDeleteProductDialog(false);
      setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });}
        catch (err) {
            console.error("Error deleting user:", err);
            const message = err?.data?.message || "An unexpected error occurred";
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: message,
                life: 3000
            });
        }
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let _id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            _id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return _id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = async() => {
        const _products = products.filter((val) => selectedProducts.includes(val));
        await Promise.all(
            _products.map(async (product) => {
                const _id = product._id;
                await deleteUser(_id);
            }))
refetch()
       
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };
    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['permission'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };
    
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        let icon;

        if (rowData.permission === "admin") 
          icon = "/icons/user1.svg";
         else 
          icon = "/icons/user2.svg"; 
       
  return (
    <img
      src={icon}
      alt="user role"
      className="shadow-2 border-round"
      style={{ width: '32px', height: '32px' }}
    />
  );
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.permission} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (product) => {
        switch (product.permission) {
            case 'user':
                return 'success';

            case 'admin':
                return 'warning';

           
            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );
    return(<>
     <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products}  selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="_id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="image" header="" body={imageBodyTemplate}></Column>
                    <Column field="userName" header="UserName" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column> */}
                    <Column field="email" header="Email" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="permission" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="userName" className="font-bold">
                        UserName
                    </label>
                    <InputText id="userName" value={product.userName} onChange={(e) => onInputChange(e, 'userName')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.userName })} />
                    {submitted && !product.userName && <small className="p-error">UserName is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="password" className="font-bold">
                        Password
                    </label>
                    <InputText id="password" value={product.password} onChange={(e) =>{ setPassword(e.target.value)}} required autoFocus className={classNames({ 'p-invalid': submitted && !product.password})} />
                    {submitted && !product.password && <small className="p-error">Password is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email" className="font-bold">
                      Email
                    </label>
                    <InputText id="email" value={product.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.email })} />
                  
                </div>
                {/* <div className="field">
                    <label htmlFor="description" className="font-bold">
                       UserName
                    </label>
                    <InputTextarea id="description" value={product.user} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div> */}

                <div className="field">
                    <label className="mb-3 font-bold">Permission</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="user" name="user" value="user" onChange={onCategoryChange} checked={product.permission=== 'user'} />
                            <label htmlFor="category1">User</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="admin" name="admin" value="admin" onChange={onCategoryChange} checked={product.permission === 'admin'} />
                            <label htmlFor="admin">Admin</label>
                        </div>
                        
                    </div>
                </div>

               
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    </>)
}
export default Users;