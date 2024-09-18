import { useState, useEffect } from 'react';
import axios from 'axios';
import { ItemList } from '../components/ItemList';

export const CategoryItems = ({ category, size, handleCart, success, productName}) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/products');
            const res = response.data;

            
            const filteredByCategory = category ? res.filter(item => item.category.toLowerCase() === category.toLowerCase()) : res;
            
            const filteredBySize = size ? filteredByCategory.filter(item => item.sizes.includes(size)) : filteredByCategory;
            
            const filteredByName = productName ? res.filter(item => item.name.toLowerCase().includes(productName)):filteredBySize;

            setData(filteredByName);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category, size, productName]);
    return (
        <div>
            {success && <div className="success-message">{success}</div>}
            <ItemList data={data} size={size} handleCart={handleCart} />
        </div>
    );
};
