import React, { use, useEffect, useRef, useState } from 'react';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { useAddShoppingListMutation, useDeleteShoppingListMutation, useGetShoppingListByUserIdQuery } from '../../slices/shoppingList/shoppingListApiSlice';
import ShoppingList from './ShoppingList';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";

const MenuSide = () => {
    const toast = useRef(null);
    const [ListShopping, setListShopping] = useState([])
    const [detailList, setDetailList] = useState({});
    const [visibleAdd, setVisibleAdd] = useState(false);
    const [visibleRemove, setVisibleRemove] = useState(false);
    const [nameList, setNameList] = useState("");
    const [valueRemove, setValueRemove] = useState("");
    const [itemsRemove, setItemsRemove] = useState([]);
    const [nameListsShopping,setNameListShopping]=useState([])
    const [shoppingListtoRemove, setShoppingListToRemove] = useState(null);
    const userId = useSelector((state) => state.user.userInfo._id);
    const { data, isLoading } = useGetShoppingListByUserIdQuery(userId)
    const [addShppingList, { data: addedShoppingLis, isSuccess: isSuccessAddList }] = useAddShoppingListMutation();
    const [removeShoppingList, { isSuccess: isSuccessRemove,data:datadeleted}] = useDeleteShoppingListMutation();
    useEffect(() => {
        if (ListShopping.length > 0) {
            setShoppingListToRemove(ListShopping.find(list => list.nameList === valueRemove));
            setItemsRemove(prev=>prev.filter(item=>item===shoppingListtoRemove?.nameList))
            //setShoppingListToRemove?setValueRemove("")
        }
    }, [valueRemove])
    useEffect(() => {
            setItemsRemove(ListShopping?.map(list => list.nameList))
            setNameListShopping(ListShopping?.map(list => list.nameList))
             if (ListShopping.length > 0) {
        setDetailList(ListShopping[0])};
    }, [ListShopping])
    
    useEffect(() => {
        if (!isLoading && data) {
            console.log("data",)
            setListShopping(data)
        }
       
    }, [isLoading, data])
    useEffect(()=>{
 if (isSuccessAddList) {
            console.log(addedShoppingLis.nameList)
            setListShopping(prevList => [...prevList, addedShoppingLis]);
        }
    },[isSuccessAddList])
    useEffect(()=>{
        console.log("hiiiiiiiiiii",datadeleted)
        if(isSuccessRemove)
        {
            console.log("hiiiiiiiiiii",datadeleted)
            setListShopping(datadeleted)

        }
    },[isSuccessRemove])
    const footerContentAdd = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisibleAdd(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { setVisibleAdd(false); addNewList() }} autoFocus />
        </div>
    );
    const footerContentRemove = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisibleRemove(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => { setVisibleRemove(false); removeList() }} autoFocus />
        </div>
    );
    const addNewList = () => {
        try {
            addShppingList({ nameList, productsList: []/*detailList.productsList*/, userId })
            setNameList("")
        }
        catch (error) {
            console.log(error)
        }
    }
    const removeList = () => {
        try {
            if (shoppingListtoRemove) {
                console.log(shoppingListtoRemove._id)
                removeShoppingList(shoppingListtoRemove._id)
                setValueRemove("");
            }
            else{
               alert("the list not found")
            }
           
        }
        catch (error) {
            console.log(error)
        }

    }

    const search = (event) => {
        setItemsRemove(nameListsShopping.filter(item => item.includes(event.query)))         
    }


    const items = [
        {
            label: 'History',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-plus',
                    command: () => {
                        setVisibleAdd(true)
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: () => {
                        setVisibleRemove(true)
                    }
                }
            ]
        },
        {
            label: 'My Lists',
            items: ListShopping.map((list) => ({
                label: list.nameList, command: () => {
                    setDetailList(list)
                }
            }))
        }
    ];

    return (
        <>
            <div className="card flex justify-content-center">
                <div className="  flex flex-column md:flex-row justify-content-between my-5">
                    <ShoppingList detailList={detailList} setDetailList={setDetailList} visibleAdd={visibleAdd} />
                </div>
                <div className=" p-button-secondary mb-3 md:mb-0" >
                    <Toast ref={toast} />
                    <Menu model={items} />
                </div>
            </div>
            <div className="card flex justify-content-center">
                <Dialog header="Add a list?" visible={visibleAdd} style={{ width: 'auto', height: 'auto' }} onHide={() => { if (!visibleAdd) return; setVisibleAdd(false); }} footer={footerContentAdd}  >
                    <p className="m-0">
                        <span className="font-bold">Name of the list:</span>
                    </p>
                    <div className="card flex justify-content-center">
                        <InputText value={nameList} onChange={(e) => setNameList(e.target.value)} />
                    </div>
                </Dialog>
            </div>
            <div className="card flex justify-content-center">
                <Dialog header="removeList?" visible={visibleRemove} style={{ width: 'auto', height: 'auto' }} onHide={() => { if (!visibleRemove) return; setVisibleRemove(false); }} footer={footerContentRemove}  >
                    <p className="m-0">
                        <span className="font-bold">are you shure?</span>
                    </p>
                    <div className="card flex justify-content-center">
                        <AutoComplete value={valueRemove} suggestions={itemsRemove} completeMethod={search} onChange={(e) => setValueRemove(e.value)} />
                         
                    </div>
                </Dialog>
            </div>
        </>

    )
}
export default MenuSide;