const WelcomeBanner = ({ user }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm shadow-slate-200/70 md:px-8 md:py-8">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[2rem]">
          Good evening, {user?.name || "there"}! 
        </h1>
        <p className="mt-3 text-base text-slate-500 md:text-lg">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden md:block">
        <div className="absolute right-6 top-8 h-32 w-32 rounded-full bg-indigo-100/50 blur-2xl" />
        <div className="absolute bottom-3 right-10 h-24 w-24 rounded-full bg-slate-200/70 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.08),transparent_45%),linear-gradient(135deg,transparent_35%,rgba(148,163,184,0.08)_36%,transparent_56%)]" />
        <svg viewBox="0 0 420 180" className="absolute right-0 top-1/2 h-44 w-auto -translate-y-1/2 text-indigo-200/80">
          <path
            d="M12 150L84 86l36 34 34-54 58 72 42-44 40 56h114"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M73 122l16-22 21 20 17-29 18 31"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
};

export default WelcomeBanner;