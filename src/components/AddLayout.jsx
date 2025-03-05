import React, { useState } from 'react';
import { Plus, Package, FolderPlus } from 'lucide-react';
import NewCategory from './NewCategory';
import NewProduct from './NewProduct';

const AddLayout = ({ setAdd, setActiveTab }) => {
    const [openCategory, setOpenCategory] = useState(false);
    const [openProduct, setOpenProduct] = useState(false);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setAdd(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-10"
            onClick={handleBackdropClick}
        >
            <div className="w-[320px] bg-white p-6 rounded-lg shadow-sm transform transition-all duration-200 ease-in-out">
                <div className="space-y-3">
                    <button
                        onClick={() => setOpenCategory(!openCategory)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors hover:translate-x-1 duration-200 cursor-pointer"
                    >
                        <FolderPlus size={18} />
                        <span className="text-sm font-medium">New Category</span>
                        <Plus size={16} className="ml-auto" />
                    </button>
                    {openCategory && <NewCategory onClose={() => setOpenCategory(false)} />}

                    <button
                        onClick={() => setOpenProduct(!openProduct)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors hover:translate-x-1 duration-200 cursor-pointer"
                    >
                        <Package size={18} />
                        <span className="text-sm font-medium">New Product</span>
                        <Plus size={16} className="ml-auto" />
                    </button>
                    {openProduct && <NewProduct onClose={() => setOpenProduct(false)} />}

                    <button
                        onClick={() => setAdd(false)}
                        className="w-full mt-2 py-3 text-xs text-gray-500 hover:bg-gray-100 transition-opacity rounded-md duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddLayout;