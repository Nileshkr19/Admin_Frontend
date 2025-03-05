import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';

const NewCategory = ({ onClose }) => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        image: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle category submission
        console.log('Category data:', category);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-[50vw]  bg-white p-6 rounded-lg absolute -left-40 -top-40"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-800">New Category</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category Name
                    </label>
                    <input
                        type="text"
                        value={category.name}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                        placeholder="e.g., Cupcakes, Wedding Cakes"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        value={category.description}
                        onChange={(e) => setCategory({ ...category, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 h-24 resize-none"
                        placeholder="Describe this category..."
                    />
                </div>


                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                        Create Category
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

export default NewCategory;