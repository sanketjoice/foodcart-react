import axios from 'axios';

const BASE_URL = 'https://world.openfoodfacts.org';
 
export const fetchProducts = async (page = 1, category = '', searchQuery = '', barcode = '') => {
    let url = `${BASE_URL}/products.json?page=${page}`;

    if (category) {
        url = `${BASE_URL}/category/${category}.json?page=${page}`;
    }
    if (searchQuery) {
        url = `${BASE_URL}/cgi/search.pl?search_terms=${searchQuery}&search_simple=1&action=process&json=true`;
    }
    if (barcode) {
        url = `${BASE_URL}/api/v0/product/${barcode}.json`;
    }

    try{ 
        const response = await axios.get(url);
        return response.data;
    }catch(error){
    console.error('Error fetching products:', error);
        throw error;
    }
};


export const fetchCategories = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/categories.json`);
        return response.data.tags;
    }catch(error){
        console.error('Error fetching categories:', error);
        throw error;
    }
};
