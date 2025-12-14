import { useState, useEffect } from 'react';
import { X, Candy, Save } from 'lucide-react';

const SweetFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: ''
    });

    // If editing, fill the form with the sweet's current data
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                category: initialData.category,
                price: initialData.price,
                quantity: initialData.quantity
            });
        } else {
            // Reset if adding new
            setFormData({ name: '', category: '', price: '', quantity: '' });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border-2 border-brand-100">
                <div className="bg-brand-500 px-6 py-4 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Candy size={24} /> 
                        {initialData ? 'Update Sweet' : 'Add New Sweet'}
                    </h2>
                    <button onClick={onClose} className="hover:bg-brand-600 p-1 rounded-full transition cursor-pointer">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" required className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <input type="text" required className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="number" step="0.01" required className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                        </div>
                    </div>
                    
                    {/* Only show Quantity field if Adding new (Backend usually handles restock separately) */}
                    {!initialData && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Initial Quantity</label>
                            <input type="number" required className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-brand-500"
                                value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
                        </div>
                    )}

                    <button type="submit" className="w-full bg-brand-600 text-white font-bold py-2 rounded-lg hover:bg-brand-700 transition flex justify-center gap-2 cursor-pointer">
                       <Save size={20} /> {initialData ? 'Save Changes' : 'Create Sweet'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SweetFormModal;