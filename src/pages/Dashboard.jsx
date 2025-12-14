import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import SweetCard from '../components/SweetCard';
import SweetFormModal from '../components/SweetFormModal';
import RestockModal from '../components/RestockModal';
import { Search, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [sweets, setSweets] = useState([]);
    const [search, setSearch] = useState('');
    
    // Modal States
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isRestockOpen, setIsRestockOpen] = useState(false);
    const [selectedSweet, setSelectedSweet] = useState(null); // Used for Edit & Restock

    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchSweets = async (query = '') => {
        try {
            const url = query ? `/api/sweets/search?name=${query}` : '/api/sweets';
            const res = await api.get(url);
            setSweets(res.data);
        } catch (error) {
            console.error("Failed to fetch", error);
        }
    };

    useEffect(() => { fetchSweets(search); }, [search]);

    // --- Actions ---

    const handlePurchase = async (id) => {
        if (!user) {
            toast.error("Please login to purchase!");
            navigate('/login');
            return;
        }
        try {
            await api.post(`/api/sweets/${id}/purchase?quantity=1`);
            toast.success("Sweet purchased!");
            fetchSweets(search);
        } catch (error) {
            toast.error("Purchase failed.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this sweet?")) return;
        try {
            await api.delete(`/api/sweets/${id}`);
            toast.success("Sweet deleted.");
            fetchSweets(search);
        } catch (error) {
            toast.error("Delete failed.");
        }
    };

    // --- Modal Handlers ---

    // 1. ADD / UPDATE SWEET
    const handleFormSubmit = async (formData) => {
        try {
            if (selectedSweet) {
                // UPDATE Logic
                await api.put(`/api/sweets/${selectedSweet.id}`, formData);
                toast.success("Sweet updated!");
            } else {
                // ADD Logic
                await api.post('/api/sweets', formData);
                toast.success("Sweet created!");
            }
            setIsFormOpen(false);
            setSelectedSweet(null);
            fetchSweets(search);
        } catch (error) {
            toast.error("Operation failed. Check inputs.");
        }
    };

    const openAddModal = () => {
        setSelectedSweet(null); // Clear selection -> Add Mode
        setIsFormOpen(true);
    };

    const openEditModal = (sweet) => {
        setSelectedSweet(sweet); // Set selection -> Edit Mode
        setIsFormOpen(true);
    };

    // 2. RESTOCK SWEET
    const openRestockModal = (sweet) => {
        setSelectedSweet(sweet);
        setIsRestockOpen(true);
    };

    const handleRestockSubmit = async (qty) => {
        try {
            await api.post(`/api/sweets/${selectedSweet.id}/restock?quantity=${qty}`);
            toast.success("Stock updated!");
            setIsRestockOpen(false);
            setSelectedSweet(null);
            fetchSweets(search);
        } catch (error) {
            toast.error("Restock failed.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold text-brand-900">Sweet Inventory</h1>
                    {/* ADD BUTTON (Admin Only) */}
                    {user?.isAdmin && (
                        <button onClick={openAddModal} className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg transition transform hover:scale-105 cursor-pointer">
                            <Plus size={20} /> Add Sweet
                        </button>
                    )}
                </div>
                
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 text-brand-200" size={20} />
                    <input 
                        type="text" placeholder="Search sweets..."
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white shadow-sm"
                        value={search} onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sweets.map(sweet => (
                    <SweetCard 
                        key={sweet.id} 
                        sweet={sweet}
                        onPurchase={handlePurchase}
                        onRestock={openRestockModal}
                        onDelete={handleDelete}
                        onEdit={openEditModal}
                    />
                ))}
            </div>

            {sweets.length === 0 && <div className="text-center text-gray-500 mt-10">No sweets found.</div>}

            {/* MODALS */}
            <SweetFormModal 
                isOpen={isFormOpen} 
                onClose={() => setIsFormOpen(false)} 
                onSubmit={handleFormSubmit}
                initialData={selectedSweet}
            />
            
            <RestockModal
                isOpen={isRestockOpen}
                onClose={() => setIsRestockOpen(false)}
                onConfirm={handleRestockSubmit}
                sweetName={selectedSweet?.name}
            />
        </div>
    );
};

export default Dashboard;