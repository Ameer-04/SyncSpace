import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaGithub,
    FaGlobe,
    FaLinkedin,
    FaLocationDot,
    FaTwitter,
} from 'react-icons/fa6';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const fallbackProfile = {
    avatar: '',
    name: 'Avery Brooks',
    role: 'Full Stack Developer',
    location: 'San Francisco, CA',
    bio: 'Building reliable products with React, Node.js, and clean user experiences.',
    experienceLevel: 'Intermediate',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
    socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        portfolio: 'https://portfolio.example.com',
        twitter: 'https://x.com',
    },
    collaborationStatus: 'Open',
};

const emptyForm = {
    name: '',
    role: '',
    location: '',
    bio: '',
    avatar: '',
    experienceLevel: 'Beginner',
    collaborationStatus: 'Open',
    skills: '',
    github: '',
    linkedin: '',
    portfolio: '',
    twitter: '',
};

const statusStyles = {
    Open: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    Busy: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    'Looking for Team': 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
};

const experienceStyles = {
    Beginner: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
    Intermediate: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
    Advanced: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
    Professional: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
};


function Profile() {
    const navigate = useNavigate();
    const { token, logout, login } = useAuth();
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        let isMounted = true;

        const loadProfile = async () => {
            // setIsLoading(true);
            setError('');

            try {
                const response = await api.get('/profile', {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });

                if (!isMounted) {
                    return;
                }

                const loadedProfile = {
                    ...fallbackProfile,
                    ...response.data,
                    socialLinks: {
                        ...fallbackProfile.socialLinks,
                        ...(response.data?.socialLinks || {}),
                    },
                };

                setProfile(loadedProfile);
                setFormData({
                    name: loadedProfile.name || '',
                    role: loadedProfile.role || '',
                    location: loadedProfile.location || '',
                    bio: loadedProfile.bio || '',
                    avatar: loadedProfile.avatar || '',
                    experienceLevel: loadedProfile.experienceLevel || 'Beginner',
                    collaborationStatus: loadedProfile.collaborationStatus || 'Open',
                    skills: Array.isArray(loadedProfile.skills) ? loadedProfile.skills.join(', ') : '',
                    github: loadedProfile.socialLinks?.github || '',
                    linkedin: loadedProfile.socialLinks?.linkedin || '',
                    portfolio: loadedProfile.socialLinks?.portfolio || '',
                    twitter: loadedProfile.socialLinks?.twitter || '',
                });
            } catch (requestError) {
                if (isMounted) {
                    setError(
                        requestError.response?.data?.message ||
                        'Unable to load your profile right now. Showing the default preview instead.'
                    );
                    setProfile(fallbackProfile);
                    setFormData({
                        name: fallbackProfile.name,
                        role: fallbackProfile.role,
                        location: fallbackProfile.location,
                        bio: fallbackProfile.bio,
                        avatar: fallbackProfile.avatar,
                        experienceLevel: fallbackProfile.experienceLevel,
                        collaborationStatus: fallbackProfile.collaborationStatus,
                        skills: fallbackProfile.skills.join(', '),
                        github: fallbackProfile.socialLinks.github,
                        linkedin: fallbackProfile.socialLinks.linkedin,
                        portfolio: fallbackProfile.socialLinks.portfolio,
                        twitter: fallbackProfile.socialLinks.twitter,
                    });
                }
            } finally {
                if (isMounted) {
                    // setIsLoading(false);
                }
            }
        };

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, [token]);

    const displayProfile = useMemo(() => profile || fallbackProfile, [profile]);
    const skillList = Array.isArray(displayProfile.skills) ? displayProfile.skills.filter(Boolean) : [];
    const socialLinks = displayProfile.socialLinks || fallbackProfile.socialLinks;
    const avatarInitials = displayProfile.name
        ? displayProfile.name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('')
        : 'U';

    const socialCards = [
        { key: 'github', label: 'GitHub', href: socialLinks.github, icon: FaGithub },
        { key: 'linkedin', label: 'LinkedIn', href: socialLinks.linkedin, icon: FaLinkedin },
        { key: 'portfolio', label: 'Portfolio', href: socialLinks.portfolio, icon: FaGlobe },
        { key: 'twitter', label: 'Twitter', href: socialLinks.twitter, icon: FaTwitter },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previousState) => ({
            ...previousState,
            [name]: value,
        }));
    };

    const handleEditStart = () => {
        setIsEditing(true);
        setError('');
        setSuccess('');
    };

    const handleEditCancel = () => {
        setFormData({
            name: displayProfile.name || '',
            role: displayProfile.role || '',
            location: displayProfile.location || '',
            bio: displayProfile.bio || '',
            avatar: displayProfile.avatar || '',
            experienceLevel: displayProfile.experienceLevel || 'Beginner',
            collaborationStatus: displayProfile.collaborationStatus || 'Open',
            skills: skillList.join(', '),
            github: socialLinks.github || '',
            linkedin: socialLinks.linkedin || '',
            portfolio: socialLinks.portfolio || '',
            twitter: socialLinks.twitter || '',
        });
        setIsEditing(false);
        setSuccess('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setError('');
        setSuccess('');

        const payload = {
            name: formData.name.trim(),
            role: formData.role.trim(),
            location: formData.location.trim(),
            bio: formData.bio.trim(),
            avatar: formData.avatar.trim(),
            experienceLevel: formData.experienceLevel,
            collaborationStatus: formData.collaborationStatus,
            skills: formData.skills
                ? formData.skills.split(',').map((skill) => skill.trim()).filter(Boolean)
                : [],
            socialLinks: {
                github: formData.github.trim(),
                linkedin: formData.linkedin.trim(),
                portfolio: formData.portfolio.trim(),
                twitter: formData.twitter.trim(),
            },
        };

        try {
            const response = await api.put('/profile', payload, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            const updatedProfile = {
                ...fallbackProfile,
                ...response.data,
                socialLinks: {
                    ...fallbackProfile.socialLinks,
                    ...(response.data?.socialLinks || {}),
                },
            };

            setProfile(updatedProfile);
            setSuccess('Profile updated successfully.');
            setIsEditing(false);

            if (token) {
                login(
                    {
                        id: updatedProfile._id || updatedProfile.id,
                        name: updatedProfile.name,
                        email: updatedProfile.email,
                    },
                    token
                );
            }
        } catch (requestError) {
            setError(
                requestError.response?.data?.message ||
                'Unable to save your profile right now. Please try again.'
            );
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                {error ? (
                    <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">
                        {error}
                    </div>
                ) : null}

                {success ? (
                    <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">
                        {success}
                    </div>
                ) : null}

                <main className="space-y-6">
                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
                        <div className="bg-gradient-to-r from-sky-50 via-white to-slate-50 px-5 py-6 sm:px-8 sm:py-8">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                    <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-4xl font-bold text-white shadow-xl shadow-blue-600/20 sm:h-36 sm:w-36">
                                        {displayProfile.avatar ? (
                                            <img
                                                src={displayProfile.avatar}
                                                alt={displayProfile.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            avatarInitials
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                                                {displayProfile.name}
                                            </h2>
                                            <p className="mt-2 text-lg font-medium text-slate-600">
                                                {displayProfile.role}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:flex-wrap sm:items-center">
                                            <span className="inline-flex items-center gap-2">
                                                <FaLocationDot className="text-blue-600" />
                                                {displayProfile.location}
                                            </span>
                                            <span
                                                className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[displayProfile.collaborationStatus] || statusStyles.Open}`}
                                            >
                                                {displayProfile.collaborationStatus}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
                                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Experience</p>
                                        <div className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${experienceStyles[displayProfile.experienceLevel] || experienceStyles.Beginner}`}>
                                            {displayProfile.experienceLevel}
                                        </div>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
                                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Contact</p>
                                        <p className="mt-3 text-sm leading-6 text-slate-700">
                                            Available for partnerships, product builds, and collaborative engineering work.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-6 lg:grid-cols-2">
                        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">About</p>
                            <h3 className="mt-2 text-xl font-semibold text-slate-900">Summary</h3>
                            <p className="mt-4 leading-7 text-slate-600">
                                {displayProfile.bio || 'This user has not added a bio yet.'}
                            </p>
                        </article>

                        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Experience Level</p>
                            <h3 className="mt-2 text-xl font-semibold text-slate-900">Current level</h3>
                            <div className="mt-5 inline-flex rounded-2xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
                                {displayProfile.experienceLevel}
                            </div>
                        </article>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Skills</p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900">Stack and strengths</h3>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {skillList.length} total
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {skillList.length > 0 ? (
                                skillList.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500">No skills listed yet.</p>
                            )}
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
                        <div className="mb-5 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Social Links</p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900">Connect across platforms</h3>
                            </div>
                            <p className="text-sm text-slate-500">Opens in a new tab</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {socialCards.map(({ key, label, href, icon: Icon }) => {
                                const hasLink = Boolean(href);

                                return hasLink ? (
                                    <a
                                        key={key}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
                                    >
                                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm ring-1 ring-slate-200 transition group-hover:scale-105">
                                            <Icon />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{label}</p>
                                            <p className="mt-1 max-w-[180px] truncate text-xs text-slate-500">{href}</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div
                                        key={key}
                                        className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 opacity-70"
                                    >
                                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
                                            <Icon />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700">{label}</p>
                                            <p className="mt-1 text-xs text-slate-500">Not set</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-col gap-3 sm:flex-row lg:ml-auto">
                                {!isEditing ? (
                                    <button
                                        type="button"
                                        onClick={handleEditStart}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={handleEditCancel}
                                            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            form="profile-edit-form"
                                            disabled={isSaving}
                                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                        >

                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {isEditing ? (
                            <form id="profile-edit-form" onSubmit={handleSubmit} className="mt-6 space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <Field label="Full name" name="name" value={formData.name} onChange={handleChange} />
                                    <Field label="Role" name="role" value={formData.role} onChange={handleChange} />
                                    <Field label="Location" name="location" value={formData.location} onChange={handleChange} />
                                    <Field label="Avatar URL" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="https://..." />
                                    <SelectField
                                        label="Experience level"
                                        name="experienceLevel"
                                        value={formData.experienceLevel}
                                        onChange={handleChange}
                                        options={['Beginner', 'Intermediate', 'Advanced', 'Professional']}
                                    />
                                    <SelectField
                                        label="Collaboration status"
                                        name="collaborationStatus"
                                        value={formData.collaborationStatus}
                                        onChange={handleChange}
                                        options={['Open', 'Busy', 'Looking for Team']}
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="bio">
                                        Bio
                                    </label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        rows="5"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="skills">
                                        Skills
                                    </label>
                                    <input
                                        id="skills"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="React, Node.js, MongoDB"
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                    <Field label="GitHub" name="github" value={formData.github} onChange={handleChange} />
                                    <Field label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                                    <Field label="Portfolio" name="portfolio" value={formData.portfolio} onChange={handleChange} />
                                    <Field label="Twitter" name="twitter" value={formData.twitter} onChange={handleChange} />
                                </div>
                            </form>
                        ) : null}
                    </section>

                    <div className="flex flex-col gap-3 border-t border-slate-200 pt-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
                    >
                        Sign out
                    </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function Field({ label, name, value, onChange, placeholder }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor={name}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
        </div>
    );
}

function SelectField({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor={name}>
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Profile;
