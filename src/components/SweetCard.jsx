import { useAuth } from '../context/AuthContext';
import { Trash2, PlusCircle, ShoppingBag, Edit } from 'lucide-react';

const SweetCard = ({ sweet, onPurchase, onRestock, onDelete, onEdit }) => {
    const { user } = useAuth();
    const isOutOfStock = sweet.quantity <= 0;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-brand-200 flex flex-col h-full">
            <div className="h-32 bg-brand-50 flex items-center justify-center border-b border-brand-100">
                <span className="text-5xl">🍬</span>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{sweet.name}</h3>
                    <span className="bg-brand-100 text-brand-600 text-xs font-bold px-2 py-1 rounded-full uppercase whitespace-nowrap">
                        {sweet.category}
                    </span>
                </div>
                
                <p className="mt-2 text-2xl font-bold text-brand-600">${sweet.price}</p>
                
                <div className="mt-1 flex items-center justify-between">
                    <p className={`text-sm ${isOutOfStock ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                        Stock: {sweet.quantity}
                    </p>
                </div>

                <div className="mt-auto pt-4 flex flex-col gap-2">
                    {/* User Action */}
                    <button
                        onClick={() => onPurchase(sweet.id)}
                        disabled={isOutOfStock}
                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white font-semibold transition cursor-pointer
                            ${isOutOfStock 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-brand-500 hover:bg-brand-600 active:scale-95'}`}
                    >
                        <ShoppingBag size={18} />
                        {isOutOfStock ? 'Sold Out' : 'Purchase'}
                    </button>

                    {/* Admin Actions */}
                    {user?.isAdmin && (
                        <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-gray-100">
                             <button onClick={() => onEdit(sweet)} className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-1.5 rounded text-sm cursor-pointer" title="Edit">
                                <Edit size={16} />
                            </button>
                            <button onClick={() => onRestock(sweet)} className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm cursor-pointer" title="Restock">
                                <PlusCircle size={16} />
                            </button>
                            <button onClick={() => onDelete(sweet.id)} className="flex items-center justify-center bg-brand-700 hover:bg-brand-900 text-white py-1.5 rounded text-sm cursor-pointer" title="Delete">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SweetCard;