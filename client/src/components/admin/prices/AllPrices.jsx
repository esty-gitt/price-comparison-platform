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
import AddPrice from './AddPrice';
import { useSelector } from 'react-redux';
import { useDeletePriceMutation, useGetPriceQuery } from '../../../slices/prices/priceApiSlice';

const AllPrices = () => {
    let emptyPrice = {
        _id: null,
        store: "",
        price: 0,
        product: "",
    };

    const [prices, setPrices] = useState([]);
    const [priceDialog, setPriceDialog] = useState(false);
    const [deletePriceDialog, setDeletePriceDialog] = useState(false);
    const [deletePricesDialog, setDeletePricesDialog] = useState(false);
    const [price, setPrice] = useState(emptyPrice);
    const [selectedPrices, setSelectedPrices] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [onHide, setHide] = useState(false)
    const [edit, setEdit] = useState(null)
    const toast = useRef(null);
    const dt = useRef(null);
    const { data: dataprices, isSuccess: pricesIsSuccess } = useGetPriceQuery()
    const [deletedPrice, { data: updataedList, isSuccess: succesDeletePrice }] = useDeletePriceMutation()
    const userId = useSelector((state => state.user.userInfo._id))
    useEffect(() => {
        if (pricesIsSuccess) {
            console.log("server", dataprices)
            setPrices(
                dataprices.map((price) => {
                    return {
                        _id: price._id,
                        store: price.storeId?.name,
                        product: price.productId.name,
                        price: price.price
                    }
                })
            )

        }



    }, [pricesIsSuccess]);
    useEffect(() => {
        if (onHide) {
            hideDialog()

        }

    }, [onHide])
    useEffect(() => {
        if (succesDeletePrice) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Price Deleted', life: 3000 });
            setPrices(updataedList)
        }

    }, [succesDeletePrice])

    useEffect(() => {
        console.log(selectedPrices)
    }, [selectedPrices])

    const openNew = () => {
        setPrice(emptyPrice);
        setSubmitted(false);
        setPriceDialog(true);

    };
    const hideDialog = () => {
        setSubmitted(false);
        setPriceDialog(false);
        setHide(false)
    };

    const hideDeletePriceDialog = () => {
        setDeletePriceDialog(false);
    };

    const hideDeletePricesDialog = () => {
        setDeletePricesDialog(false);
    };



    const editPrice = (price) => {
        const pricerr = { _id: price._id, name: price.name, store: price.store, product: price.product, price: price.price }
        setEdit(pricerr)
        setPriceDialog(true);
    };

    const confirmDeletePrice = (price) => {
        setPrice(price);
        setDeletePriceDialog(true);
    };

    const deletePrice = () => {
        setDeletePriceDialog(false);
        setPrice(emptyPrice);
        try {
            deletedPrice(price._id)
        }
        catch (err) {
            console.log(err)
        }
    };





    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeletePricesDialog(true);
    };

    const deleteSelectedPrices = async() => {
        let _price = prices.filter((val) => selectedPrices.includes(val));
        console.log(_price,"sssssss")
        try {
            const promises = _price.map(_price => deletedPrice(_price._id).unwrap());
            await Promise.all(promises);
           setPrices(prev=>prev.filter(item => !_price.includes(item))) ;
        } catch (error) {
            console.error("Error deleting objects:", error);
        }
        setDeletePricesDialog(false);
        setSelectedPrices(null);
    };



    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedPrices || !selectedPrices.length} />
            </div>
        );
    };
    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editPrice(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeletePrice(rowData)} />
            </React.Fragment>
        );
    };
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">{"prices"}</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );

    const deletePriceDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePriceDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deletePrice} />
        </React.Fragment>
    );
    const deletePricesDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeletePricesDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedPrices} />
        </React.Fragment>
    );
    return (
        <div className="   mb-3 md:mb-0" style={{ flex: 1 }}>
            <Toast ref={toast} />
            <div className="card ">
                <Toolbar className="mb-4" start={leftToolbarTemplate} end={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={prices} selection={selectedPrices} onSelectionChange={(e) => {
                    setSelectedPrices(e.value)
                }}
                    dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} price" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="product" header="Product" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="price" header="Price" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="store" header="Store" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>



            <Dialog visible={deletePriceDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePriceDialogFooter} onHide={hideDeletePriceDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {price && (
                        <span>
                            Are you sure you want to delete <b>{price.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deletePricesDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deletePricesDialogFooter} onHide={hideDeletePricesDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {price && <span>Are you sure you want to delete the selected price?</span>}
                </div>
            </Dialog>
            {priceDialog ? <AddPrice setPrices={setPrices} prices={prices} setHide={setHide} edit={edit} setEdit={setEdit} /> : <></>}
        </div>
    )

}
export default AllPrices;