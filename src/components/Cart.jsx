import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "reactstrap";

export const Cart = ({ cart, setCart }) => {
    const [deleteError, setDeleteError] = useState("");

    const del = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/carts/${id}`);
            setCart(prevCart => prevCart.filter(item => item.id !== id));
        } catch (error) {
            console.error("Failed to delete item:", error);
            setDeleteError("Failed to delete item. Please try again.");
        }
    };

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:3001/carts');
                setCart(response.data);
            } catch (error) {
                console.error("Failed to fetch cart data:", error);
            }
        };

        fetchCart();
    }, [setCart]);

    return (
        <div className=" container cart-container">
            <h3 className="my-4 text-secondary">Cart items</h3>
            {deleteError && <div className="error-message">{deleteError}</div>}
            {cart.length > 0 ? (
                <ul className="row p-0 g-4  mx-sm-auto mx-auto d-flex flex-wrap">
                    {cart.map((item) => (
                        <div key={item.id} className=' cartul col-lg-3 ps-0 col-md-4 col-sm-6'>
                            <div className='card mb-3 border border-1 rounded border-dark bg-secondary-subtle overflow-hidden h-100'>
                                <div className='col-md-12 d-flex justify-content-center' style={{ backgroundColor: "Background" }}>
                                    <img src={item.image} className='img-fluid rounded-start' alt={item.name} style={{ height: "250px", width: "170px", objectFit: "scale-down" }} />
                                </div>
                                <div className='col-md-12 text-dark h-100' style={{ backgroundColor: "#4c7" }}>
                                    <div className='card-body d-flex flex-column'>
                                        <h5 className='card-title' style={{ fontWeight: "bolder" }}>{item.name}</h5>
                                        <p className='card-text' style={{ fontSize: "14px", fontStyle: "normal", fontWeight: "normal" }}>{item.description}</p>
                                        <p className='card-text'><small className='text-muted'>Total Price: ${item.price * item.quantity}</small></p>
                                        <p className='card-text'>Size: {item.size} - {item.quantity} No's</p>
                                        <button className="addtocart deletefromcart" onClick={() => del(item.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};
