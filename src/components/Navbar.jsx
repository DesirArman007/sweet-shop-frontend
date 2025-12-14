import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Candy, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2 font-bold text-2xl">
                        <Candy className="w-8 h-8" />
                        <span>SweetShop</span>
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="flex items-center space-x-1 text-brand-100">
                                    <User size={18} />
                                    <span>{user.username} {user.isAdmin && '(Admin)'}</span>
                                </span>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-sm transition"
                                >
                                    <LogOut size={18} />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="hover:text-brand-100 font-medium">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;