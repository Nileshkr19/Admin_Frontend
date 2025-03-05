import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, DollarSign } from 'lucide-react';

const NewProduct = ({ onClose }) => {
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        ingredients: '',
        image: '',
        allergens: '',
        isAvailable: true
    });

    const categories = ['Cupcakes', 'Wedding Cakes', 'Birthday Cakes', 'Custom Cakes', 'Seasonal Specials'];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle product submission

        console.log('Product data:', product);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-[50vw] -left-40 -top-48  bg-white p-6 rounded-lg max-h-[90vh] overflow-y-auto absolute"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-800">New Product</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={product.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                            placeholder="e.g., Chocolate Dream Cupcake"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            value={product.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Availability
                        </label>
                        <select
                            value={product.isAvailable}
                            onChange={(e) => setProduct({ ...product, isAvailable: e.target.value === 'true' })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                        >
                            <option value="true">Available</option>
                            <option value="false">Out of Stock</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 h-24 resize-none"
                        placeholder="Describe your product..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ingredients
                    </label>
                    <textarea
                        value={product.ingredients}
                        onChange={(e) => setProduct({ ...product, ingredients: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 h-20 resize-none"
                        placeholder="List main ingredients..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Allergens
                    </label>
                    <input
                        type="text"
                        value={product.allergens}
                        onChange={(e) => setProduct({ ...product, allergens: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                        placeholder="e.g., Contains nuts, dairy, eggs"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                                <label className="relative cursor-pointer rounded-md font-medium text-center text-gray-600 hover:text-gray-700">
                                    <span className='pl-5'>Upload a file</span>
                                    <input
                                        type="file"
                                        className="sr-only"
                                        accept="image/*"
                                        onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
                                    />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                        Create Product
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default NewProduct;