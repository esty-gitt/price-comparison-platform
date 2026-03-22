import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';

import { classNames } from 'primereact/utils';
import { useLocation } from 'react-router-dom';
const StoreResult = () => {
    const location = useLocation();
    const { resultData } = location.state || [];
    const [storeImages, setStoreImages] = useState({});
    const [products, setProducts] = useState([]);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const sortOptions = [
        { label: 'Price High to Low', value: '!total' },
        { label: 'Price Low to High', value: 'total' }
    ];
    const  imagePool = [
        '/photos/image1.jpg',
       '/photos/image2.jpg',
        '/photos/image3.jpg',
        '/photos/image4.jpg',
        '/photos/image5.jpg',
        '/photos/image6.jpg',
      ];
    useEffect(() => {       
    console.log("resultData", resultData);
      setProducts(resultData)
      const imageMap = {};
      resultData?.forEach(product => {
          if (!imageMap[product.storeName._id]) {
              const randIndex = Math.floor(Math.random() * imagePool.length);
              imageMap[product.storeName._id] = imagePool[randIndex];
          }
      });

      setStoreImages(imageMap);
        console.log(products)
    }, []);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const header = () => {
        return <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />;
    };

    const itemTemplate = (product, index) => {
        const storeImage = storeImages[product.storeName._id] || imagePool[0];
            // const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
        return (
            
            <div className="col-12" key={product.id}>
    
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"  src={storeImage}
          alt="store" />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.storeName}</div>
                            {/* <Rating value={product.rating} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    {/* <span className="font-semibold">{product.category}</span> */}
                                </span>
                                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.total}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;

        let list = items.map((product, index) => {
            return itemTemplate(product, index);
        });

        return <div className="grid grid-nogutter">{list}</div>;
    };
    return(<>
     <div className="card">
            <DataView value={products} listTemplate={listTemplate} header={header()} sortField={sortField} sortOrder={sortOrder} />
        </div></>)
}
export default StoreResult;