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
import '../../css/searchStore.css';
import SearchStore from './SearchStore';
import AddProduct from './AddProduct';
import { useSelector } from 'react-redux';
import { useUpdataShoppingListMutation } from '../../slices/shoppingList/shoppingListApiSlice';
const ShoppingList = ({ detailList, setDetailList, visibleAdd }) => {
    let emptyProduct = {
        _id: null,
        idProduct: "null",
        barcode: "",
        name: "",
        quantity: 0,
        img: "none"
    };
    const [products, setProducts] = useState(detailList.productsList);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [onHide, setHide] = useState(false)
    const [edit, setEdit] = useState(null)
    const toast = useRef(null);
    const dt = useRef(null);
    const [deletedProduct, { data: updataedList, isSuccess: succesDeleteProduct }] = useUpdataShoppingListMutation()
    const userId = useSelector((state => state.user.userInfo._id))
    useEffect(() => {
        console.log("detailList", detailList)
        console.log(detailList.productsList, "aaaaa")
        setProducts(
            detailList.productsList?.map((productList) => {
                return {
                    _id: productList._id,
                    idProduct: productList.product._id,
                    barcode: productList.product.barcode,
                    name: productList.product.name,
                    quantity: productList.quantity,
                    img: productList.product.img,
                }
            })
        )


    }, [detailList]);
    useEffect(() => {
        if (onHide) {
            hideDialog()

        }

    }, [onHide])
    useEffect(() => {
        if (succesDeleteProduct) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            setDetailList(updataedList)
        }

    }, [succesDeleteProduct])

    useEffect(() => {
        console.log("use")
        console.log(selectedProducts)
    }, [selectedProducts])
    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);

    };
    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setHide(false)
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };



    const editProduct = (product) => {
        const prod = { product: { _id: product.idProduct, name: product.name, barcode: product.barcode, img: product.img }, quantity: product.quantity, _id: product._id }
        setEdit(prod)
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = detailList.productsList.filter((val) => val._id !== product._id);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        try {
            deletedProduct({ _id: detailList._id, nameList: detailList.nameList, productsList: _products, userId })

        }
        catch (err) {
            console.log(err)
        }
    };





    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        console.log("aaaaaaaa", _products)
        let newProducts = _products.map((product) => {
            return {
                product: {
                    _id: product.idProduct
                },
                quantity: product.quantity
            }
        })
        try {
            deletedProduct({ _id: detailList._id, nameList: detailList.nameList, productsList: newProducts, userId })

        }
        catch (err) {
            console.log(err)
        }
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
    };



    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };
    const middelToolbarTemplate = () => {
        return <SearchStore products={detailList.productsList} />
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        //
        // return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">{!visibleAdd ? detailList.nameList : ""}</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
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
    return (
        <div className="   mb-3 md:mb-0" style={{ flex: 1 }}>
            <Toast ref={toast} />
            <div className="card ">
                <Toolbar className="mb-4" start={leftToolbarTemplate} center={middelToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={!visibleAdd ?products:[]} selection={selectedProducts} onSelectionChange={(e) => {
                    setSelectedProducts(e.value)
                }}
                    dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="barcode" header="Barcode" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="quantity" header="Quantity" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="img" header="Image" body={imageBodyTemplate}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



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
            {productDialog ? <AddProduct setDetailList={setDetailList} detailList={detailList} setHide={setHide} edit={edit} setEdit={setEdit} /> : <></>}
        </div>
    )
}
export default ShoppingList;