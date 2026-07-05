import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Register() {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/auth/register', formData);
            setFeedback({
                type: 'success',
                text: 'Registration successful. You can now sign in.',
            });
            setFormData({ name: '', email: '', password: '' });
            setTimeout(() => {
                navigate('/login');
            }, 1200);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                'Unable to connect to the server. Please try again.';
            setFeedback({ type: 'error', text: message });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create your account</h1>
                {feedback.text ? (
                    <div
                        className={`mb-4 rounded-md px-4 py-3 text-sm ${feedback.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                    >
                        {feedback.text}
                    </div>
                ) : null}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="At least 8 characters"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="text-xs text-center text-gray-500 mt-4">By creating an account you agree to our Terms and Privacy Policy.</p>
            </div>
        </div>
    );
}

export default Register;