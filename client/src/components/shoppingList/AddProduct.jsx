import React, { use, useEffect, useRef, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Controller, useForm } from "react-hook-form"
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useGetProductQuery } from "../../slices/products/productApiSlice";
import { useUpdataShoppingListMutation } from "../../slices/shoppingList/shoppingListApiSlice";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
const AddProduct = ({ setDetailList, detailList, setHide, edit, setEdit }) => {
    const { data: dataProduct, isSuccess: successProducts } = useGetProductQuery()
    const [updadataShoppingList, { data: updatedShoppingList, isSuccess: isSuccessUpdate, isError: updataError, status }] = useUpdataShoppingListMutation();
    const [itemsProduct, setItemsProduct] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const toast = useRef(null);
    const userId = useSelector((state => state.user.userInfo._id))
    useEffect(() => {
        if (successProducts) {
            setItemsProduct(dataProduct.map(product => (product.name)));
        }
        if (isSuccessUpdate) {
            setDetailList(updatedShoppingList)
            console.log(updatedShoppingList)
            setHide(true)
        }
        if (updataError) {
            toast.current.show(
                { severity: 'error', summary: 'Error', detail: status, life: 3150 })
        }
    }, [dataProduct, isSuccessUpdate, updataError])
    const search = (event) => {
        if (dataProduct) {
            const _newDataProduct = dataProduct.filter(item => item.name.includes(event.query))
            setItemsProduct(_newDataProduct.map(product => (product.name)))
        }
    }
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            product: edit?.product.name || "",
            Quantity: edit?.quantity || 1
        }
    })

    const onSubmit = (data) => {
        console.log("onsubmit", data.product)
        try {
            const newData = dataProduct?.find((prod) => prod.name === data.product)
            if (newData) {
                const product = { product: newData._id, quantity: data.Quantity }
                if (!edit) {
                    updadataShoppingList({ _id: detailList._id, nameList: detailList.nameList, productsList: [...detailList?.productsList, product], userId })
                }
                else {
                    const updateList = detailList.productsList.map((prod) => {
                        if (prod._id === edit._id)
                            return { ...product, _id: prod._id }
                        return prod
                    })
                    console.log(updateList)
                    setEdit(null)
                    updadataShoppingList({ _id: detailList._id, nameList: detailList.nameList, productsList: updateList, userId })
                }
            }
            else{
                alert("the product doesnt exist ")
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={() => { setEdit(null); setHide(true) }} />
            <Button label="Save" icon="pi pi-check" onClick={handleSubmit(onSubmit)} />
        </React.Fragment>
    );
    return (

        <Dialog visible={true} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={() => { setHide(true) }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />} */}
                <div className="formgrid grid">
                    <label htmlFor="quantity" className="font-bold">
                        Product
                    </label>
                </div>
                <div className="card flex justify-content-center">
                    <Controller
                        name="product"
                        control={control}
                        render={({ field }) => (
                            <AutoComplete
                                {...field}
                                value={field.value.label || field.value}
                                suggestions={itemsProduct}
                                completeMethod={search}
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
                        Quantity
                    </label>
                </div >
                <div className="card flex justify-content-center">
                    <Controller
                        name="Quantity"
                        control={control}
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
export default AddProduct;