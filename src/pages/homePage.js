import React, {useState, useEffect} from 'react';
import ProductCard from '../components/productCard';
import {fetchProducts} from '../utils/api';
import {fetchCategories} from '../utils/api';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [barcode, setBarcode] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
             const loadProducts = async () => {
            const data = await fetchProducts(page, selectedCategory, searchQuery, barcode);
            if (data.products) {
                setProducts((prev) => [...prev, ...data.products]);
            } else if (data.product) {
                setProducts([data.product]); 
            }
        };
        loadProducts();
    }, [page, selectedCategory, searchQuery, barcode]);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } });
    };
    
    const handleSearch = (e) => {
        e.preventDefault();
        setProducts([]);
        setPage(1);
        setBarcode('');
    };

    const handleBarcodeSearch = (e) => {
        e.preventDefault();
        setProducts([]);
        setPage(1);
        setSearchQuery('');
    };

    return (
        <div className="p-4">
            <h1 className=" text-emerald-950 text-center text-2xl font-bold mb-4">Food Products</h1>
                <div className="flex">
              <form onSubmit={handleSearch} className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded-md mb-2 p-2"/>
                <button type="submit" className="bg-blue-900 mr-80   text-white px-4 py-2 rounded-md">
                    Search
                </button>
            </form>

            <form onSubmit={handleBarcodeSearch} className=" flex mb-4">
                <input
                    type="text"
                    placeholder="Search by barcode  "
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="border rounded-md mb-2 p-2"
                />
                <button type="submit" className=" bg-purple-500 text-white px-4 py-2 rounded-md mr-80">
                    Search
                </button>
            </form>

            <select
                className="border p-2 rounded-md w-full mb-4"
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setProducts([]);
                    setPage(1);
                }}
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <ProductCard key={index} product={product}  onClick={() => handleProductClick(product)} />
                ))}
            </div>

            <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-gray-800 text-white px-4 py-2 rounded-md mt-4">Load More</button>
        </div>
    );
};

export default HomePage;
