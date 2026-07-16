import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Register() {
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
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data?.errors?.[0]?.msg ||
                'Registration failed. Please check your details and try again.';
            console.error(error);
            setFeedback({ type: 'error', text: message });
        }
    };

    return (
        <div className="min-h-screen overflow-hidden bg-slate-950 text-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)]" />
            <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <div className="mb-8 text-center">
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Create your account</h1>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                            Join the workspace, keep your progress in sync, and get started in a few quick steps.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                        {feedback.text ? (
                            <div
                                className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${feedback.type === 'success'
                                    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                                    : 'border-rose-400/30 bg-rose-400/10 text-rose-200'
                                }`}
                            >
                                {feedback.text}
                            </div>
                        ) : null}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-200">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 shadow-inner outline-none transition duration-200 focus:border-sky-400/60 focus:ring-4 focus:ring-sky-400/15"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@company.com"
                                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 shadow-inner outline-none transition duration-200 focus:border-sky-400/60 focus:ring-4 focus:ring-sky-400/15"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 shadow-inner outline-none transition duration-200 focus:border-sky-400/60 focus:ring-4 focus:ring-sky-400/15"
                                />
                            </div>

                            <button
                                type="submit"
                                className="group inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition duration-200 hover:scale-[1.01] hover:shadow-sky-500/35 focus:outline-none focus:ring-4 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                Register
                                <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-300">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-sky-300 transition hover:text-sky-200">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;