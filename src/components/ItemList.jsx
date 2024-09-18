import React, { useState } from 'react';
import { Button } from 'reactstrap';

export const ItemList = ({ data, handleCart, success }) => {
    const [selectedSize, setSelectedSize] = useState(null);

    const handleSelectSize = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = (item) => {
        handleCart(item, selectedSize);
    };

    return (
        <div className='container mt-3 pb-5'>
        {success&&<p style={{color:"green", backgroundColor:"white"}} >{success}</p>}
            <div className='row gx-4 gy-4'>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <div key={index} className='col-lg-3 col-md-4 col-sm-6'>
                            <div className='item card mb-3 border border-1 rounded border-dark bg-secondary-subtle overflow-hidden h-100'>
                                <div className='col-md-12 d-flex justify-content-center' style={{backgroundColor:"Background"}}>
                                    <img src={item.image} className='img-fluid rounded-start' alt={item.name} style={{height:"250px", width:"170px", objectFit:"scale-down"}}/>
                                </div>
                                <div className='col-md-12 text-dark h-100' style={{backgroundColor:"#4c7"}}>
                                    <div className='card-body d-flex flex-column'>
                                        <h5 className='card-title' style={{fontWeight:"bolder"}}>{item.name}</h5>
                                        <p className='card-text' style={{fontSize:"14px", fontStyle:"normal", fontWeight:"normal"}}>{item.description}</p>
                                        <p className='card-text'><small className='text-muted'>Price: ${item.price}</small></p>
                                        <p className='card-text d-flex flex-wrap mb-4'>
                                            Sizes:<br/>
                                            {item.sizes.length > 0 ? (
                                                item.sizes.map((size, i) => (
                                                    <button
                                                        className='sizebutton'
                                                        key={i}
                                                        onClick={() => handleSelectSize(size)}
                                                    >
                                                        <p style={{textAlign: "center"}}>{size}</p>
                                                    </button>
                                                ))
                                            ) : (
                                                   <p>Nil</p>
                                            )}
                                        </p>
                                        <button onClick={() => handleAddToCart(item)} className='addtocart'>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </div>
        </div>
    );
};
