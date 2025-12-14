import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.username, formData.password);
            toast.success("Welcome back!");
            navigate('/');
        } catch (error) {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-brand-500">
                <h2 className="text-2xl font-bold text-center text-brand-900 mb-6">Sweet Shop Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                            onChange={e => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-brand-600 text-white py-2 rounded-lg font-bold hover:bg-brand-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-brand-600 font-bold">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;