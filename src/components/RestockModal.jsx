import { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

const RestockModal = ({ isOpen, onClose, onConfirm, sweetName }) => {
    const [qty, setQty] = useState(10);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(qty);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 border-t-4 border-green-500">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Restock Inventory</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={24}/></button>
                </div>
                <p className="text-gray-600 mb-4">Adding stock for: <strong>{sweetName}</strong></p>
                
                <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Add</label>
                    <input 
                        type="number" min="1" required 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 outline-none mb-4"
                        value={qty} onChange={e => setQty(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition flex justify-center gap-2 cursor-pointer">
                        <PlusCircle size={20} /> Confirm Restock
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RestockModal;