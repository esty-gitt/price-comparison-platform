import React, { use, useEffect, useRef, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Controller, useForm } from "react-hook-form"
import { Dialog } from 'primereact/dialog';
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useGetStoresQuery } from "../../../slices/stores/storeApiSlice";
import { useAddPriceMutation, useUpdataPriceMutation } from "../../../slices/prices/priceApiSlice";
import { useGetProductQuery } from "../../../slices/products/productApiSlice";
const AddPrice = ({ setPrices, prices, setHide, edit, setEdit }) => {
    const { data: dataProduct, isSuccess: successProducts } = useGetProductQuery()
    const { data: dataStore, isSuccess: successStore } = useGetStoresQuery()
    const [addPrice, { data: addedPrice, isSuccess: isSuccessAdd, isError: addError, status }] = useAddPriceMutation();
    const [updatePrice, { data: updatedPrice, isSuccess: isSuccessUpdate, isError: updateError }] = useUpdataPriceMutation();

    const [itemsProduct, setItemsProduct] = useState([]);
    const [itemsStore, setItemsStore] = useState([]);
    const toast = useRef(null);
    const userId = useSelector((state => state.user.userInfo._id))
    useEffect(() => {
        if (successProducts) {
            setItemsProduct(dataProduct.map(product => (product.name)));
        }
        if (successStore) {
            setItemsStore(dataStore.map(store => store.name))
        }
        if (isSuccessAdd) {
            setPrices(prev => [...prev, { _id: addedPrice._id, product: addedPrice.productId.name, store: addedPrice.storeId.name, price: addedPrice.price }])
            setHide(true)
        }
        if (isSuccessUpdate) {
            setPrices(updatedPrice.map((price) => {
                return {
                    _id: price._id,
                    price: price.price,
                    product: price.productId.name,
                    store: price.storeId.name
                }

            }))
            setHide(true)
        }
        // if (updataError) {
        //     toast.current.show(
        //         { severity: 'error', summary: 'Error', detail: status, life: 3150 })
        // }
    }, [dataProduct, isSuccessAdd, addError, isSuccessUpdate])
    const searchProduct = (event) => {
        if (dataProduct) {
            const _newDataProduct = dataProduct.filter(item => item.name.includes(event.query))
            setItemsProduct(_newDataProduct.map(product => (product.name)))
        }
    }
    const searchStore = (event) => {
        if (dataStore) {
            const _newDataStore = dataStore.filter(item => item.name.includes(event.query))
            setItemsStore(_newDataStore.map(product => (product.name)))
        }
    }
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            product: edit?.product || "",
            store: edit?.store || "",
            price: edit?.price || 0

        }
    })

    const onSubmit = (data) => {
        console.log("onsubmit", data.product)
        try {
            const newData = dataProduct?.find((prod) => prod.name === data.product)
            const _newDataStore = dataStore?.find((store) => store.name === data.store)
            if (newData && _newDataStore) {
                if (!edit) {
                    addPrice({ price: data.price, storeId: _newDataStore._id, productId: newData._id })
                }
                else {

                    console.log("hiiiiii")
                    setEdit(null)
                    updatePrice({ _id: edit._id, price: data.price, storeId: _newDataStore._id, productId: newData._id })
                }
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
                        Product
                    </label>
                </div>
                <div className="card flex justify-content-center">
                    <Controller
                        name="product"
                        control={control}
                          rules={{ required: true }}
                        render={({ field }) => (
                            <AutoComplete
                                {...field}
                                value={field.value.label || field.value}
                                suggestions={itemsProduct}
                                completeMethod={searchProduct}
                                onChange={(e) => {
                                    field.onChange(e.value)
                                }}

                                dropdown

                            />
                        )}
                    />
                </div>
                <div className="formgrid grid">
                    <label htmlFor="quantity" className="font-bold">
                        store
                    </label>
                </div>
                <div className="card flex justify-content-center">
                    <Controller
                        name="store"
                        control={control}
                          rules={{ required: true }}
                        render={({ field }) => (
                            <AutoComplete
                                {...field}
                                value={field.value.label || field.value}
                                suggestions={itemsStore}
                                completeMethod={searchStore}
                                onChange={(e) => {
                                    field.onChange(e.value)
                                }}

                                dropdown

                            />
                        )}
                    />
                </div>

                <div className="formgrid grid">
                    <label htmlFor="quantity" className="font-bold">
                        price
                    </label>
                </div >
                <div className="card flex justify-content-center">
                    <Controller
                        name="price"
                        control={control}
                          rules={{ required: true }}
                        render={({ field }) => (
                            <InputText
                                type="number"
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
export default AddPrice;