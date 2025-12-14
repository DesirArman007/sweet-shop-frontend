import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
    // UPDATED: State now matches RegisterRequestDTO (name, email, password)
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        password: '' 
    });
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            toast.success("Registration successful! Please login.");
            navigate('/login');
        } catch (error) {
            console.error(error);
            // Show backend validation message if available (e.g., "Email invalid")
            const msg = error.response?.data?.message || "Registration failed. Email might be taken.";
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-brand-500">
                <h2 className="text-2xl font-bold text-center text-brand-900 mb-6">Create an Account</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* NAME FIELD */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input 
                            type="text"
                            required
                            placeholder="John Doe"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 outline-none"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    {/* EMAIL FIELD */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email"
                            required
                            placeholder="john@example.com"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 outline-none"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    
                    {/* PASSWORD FIELD */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password"
                            required
                            placeholder="Min 8 characters"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 outline-none"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                        />
                        <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-brand-600 text-white py-2 rounded-lg font-bold hover:bg-brand-700 transition cursor-pointer"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-brand-600 font-bold hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;