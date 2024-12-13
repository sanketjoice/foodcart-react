import React from 'react';

const ProductCard = ({ product, onClick }) => (
    <div className=" hover:cursor-pointer bg-white shadow-md rounded-lg p-4" onClick={onClick}>
        <img src={product.image_front_url || 'https://via.placeholder.com/150'}
            alt={product.product_name}
            className="w-full h-48 object-cover rounded-md mb-4"/>
        <h2 className="text-lg font-bold">{product.product_name}</h2>
        <p className="text-sm">Category: {product.categories}</p>
        <p className="text-sm">Nutrition Grade: {product.nutrition_grades || 'N/A'}</p>
    </div>
);

export default ProductCard;
