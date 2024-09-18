import { Navbar, Nav, NavItem, Button, DropdownItem, DropdownMenu, Dropdown, DropdownToggle } from 'reactstrap';
import { useEffect, useState } from 'react';
import { CategoryItems } from '../components/CategoryItems';
import { Cart } from '../components/Cart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
    const [value, setValue] = useState('');
    const [active, setActive] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [success, setSuccess] = useState('')

    const fetchCart = async () => {
        try {
                const response = await axios.get('http://localhost:3001/carts');
                setCart(response.data);
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };
    useEffect(() => {
        fetchCart();
    }, []);

    const clickCategory = (category) => {
        setActive(active === category ? null : category);
    };
    
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    
    const handleSizeFilter = (size) => {
        setSelectedSize(size);
    };
    
    const handleSearch = (e) =>{
        const searchTerm = e.target.value.toLowerCase();
        setValue(searchTerm)
    }
    const nav = useNavigate()
    const handleLogout = () =>{
        nav('/')
    }
    const handleAddToCart = async (item, selectedSize) => {
        if (!selectedSize) {
            alert("Please select a size before adding to the cart.");
            return;
        }
    
        try {

            const response = await axios.get('http://localhost:3001/carts');
            const existingCartItems = response.data;
    
            const findItem = existingCartItems.find(data => data.id === item.id && data.size === selectedSize);
    
            if (findItem) {
                const updatedItem = { ...findItem, quantity: findItem.quantity + 1 };
                await axios.put(`http://localhost:3001/carts/${findItem.id}`, updatedItem);
            } else {
                const newItem = { ...item, size: selectedSize, quantity: 1 };
                await axios.post('http://localhost:3001/carts', newItem);
            }
    
            const updatedCartResponse = await axios.get('http://localhost:3001/carts');
            setCart(updatedCartResponse.data);
            setSuccess("Item added to cart successfully!")
            setTimeout(() => {
                setSuccess('')
            }, 3000);
        } catch (error) {
            console.error("Failed to add item to cart:", error);
        }
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    return (
        <div className='main' style={{minHeight: "100vh", maxHeight: "fit-content"}}>
            <div>
                <Navbar style={{backgroundColor: "#4c7"}}>
                    <div className='d-flex'>
                        <h2 style={{color: "white", textShadow: "1px 1px black"}} className="ms-md-5 me-md-3 mx-sm-auto mx-auto mx-md-0 fs-2 pt-1">SHOPCART</h2>
                        <div className='d-flex ms-5 my-auto'>
                            <input className='searchbar' type='search' name='name' value={value}  placeholder='Search' onChange={handleSearch} />
                            <Button className='search' ><i className='bi bi-search'></i></Button>
                        </div>
                    </div>
                    <Nav navbar>
                        <NavItem className='me-md-5 mx-sm-auto mx-auto d-flex'>
                            {/* Toggle cart visibility when the cart button is clicked */}
                            <Button color='light' className='cart ms-auto me-md-5' title='Your cart' onClick={toggleCart}>
                                <i className="bi bi-cart fs-3"></i>
                            </Button>
                        <Button onClick={handleLogout} className='logout' title='Logout' color='light' ><i class="bi bi-box-arrow-right fs-3"></i></Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>

            {!showCart && (
                <div className='container my-3 categorybox flex-wrap'>
                    <div className="category" style={{backgroundImage: `url("https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1lbiUyMGZhc2hpb24lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D")`}} onClick={() => clickCategory('men')}>
                        <div className='category-title'>Men's Fashion</div>
                        <Button className='viewmore'>
                            <i>View more Collection </i>
                            <i className='text-secondary-subtle'>&gt;</i>
                        </Button>
                    </div>
                    <div className='category' style={{backgroundImage: `url("https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tZW4lMjBmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D")`}} onClick={() => clickCategory('women')}>
                        <div className='category-title'>Women's Fashion</div>
                        <Button className='viewmore'>
                            <i>View more Collection </i>
                            <i className='text-secondary-subtle'>&gt;</i>
                        </Button>
                    </div>

                    <div className='category' style={{backgroundImage: `url("https://images.unsplash.com/photo-1440288736878-766bd5839edb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHx8")`}} onClick={() => clickCategory('child')}>
                        <div className='category-title'>Child Fashion</div>
                        <Button className='viewmore'>
                            <i>View more Collection </i>
                            <i className='text-secondary-subtle'>&gt;</i>
                        </Button>
                    </div>
                </div>
            )}

            {!showCart && <div className='container mb-0 mx-auto'>
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle caret className='filter'>
                        {selectedSize ? `Filter Applied` : 'Filter'}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className='dropitem' onClick={() => handleSizeFilter(null)}>All Sizes</DropdownItem>
                        <DropdownItem className='dropitem' onClick={() => handleSizeFilter('XS')}>XS</DropdownItem>
                        <DropdownItem className='dropitem' onClick={() => handleSizeFilter('S')}>S</DropdownItem>
                        <DropdownItem className='dropitem' onClick={() => handleSizeFilter('M')}>M</DropdownItem>
                        <DropdownItem className='dropitem' onClick={() => handleSizeFilter('L')}>L</DropdownItem>
                        <DropdownItem className='dropitem' onClick={() => handleSizeFilter('XL')}>XL</DropdownItem>
                        <DropdownItem className='dropitem' onClick={() => handleSizeFilter('XXL')}>XXL</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>}

            {!showCart && <CategoryItems category={active} size={selectedSize} productName={value} handleCart={handleAddToCart} success={success}/>}
            {showCart && <Cart cart={cart} setCart={setCart}/>}
        </div>
    );
};
