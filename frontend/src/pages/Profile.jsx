import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen overflow-hidden bg-slate-950 text-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.35),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.18),_transparent_30%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)]" />
            <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

            <div className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
                    <div className="mb-8 text-center">
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Your profile</h1>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                            Manage your signed-in session and review the account details stored in the app.
                        </p>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 text-sm text-slate-200">
                        <div>
                            <p className="text-slate-400">Name</p>
                            <p className="mt-1 text-base font-medium text-white">{user?.name || 'Unknown user'}</p>
                        </div>
                        <div>
                            <p className="text-slate-400">Email</p>
                            <p className="mt-1 text-base font-medium text-white">{user?.email || 'No email available'}</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="group inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition duration-200 hover:scale-[1.01] hover:shadow-sky-500/35 focus:outline-none focus:ring-4 focus:ring-sky-400/20"
                        >
                            Sign out
                            <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
                        </button>

                        <p className="text-center text-sm text-slate-300">
                            Back to{' '}
                            <Link to="/" className="font-semibold text-sky-300 transition hover:text-sky-200">
                                home
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;