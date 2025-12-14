import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route (Only restricts access if strictly needed)
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="min-h-screen font-sans bg-brand-50 text-gray-800">
                    <Navbar />
                    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Dashboard is now PUBLIC (No ProtectedRoute) */}
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;