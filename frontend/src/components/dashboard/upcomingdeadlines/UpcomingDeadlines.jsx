const deadlines = [
  {
    id: 1,
    title: "API Integration",
    project: "CodeSync",
    dueLabel: "Tomorrow",
    dueTone: "bg-rose-50 text-rose-600 ring-rose-100",
    iconBg: "bg-rose-50 text-rose-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Landing Page Design",
    project: "Pulse Analytics",
    dueLabel: "3 Days",
    dueTone: "bg-amber-50 text-amber-600 ring-amber-100",
    iconBg: "bg-amber-50 text-amber-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Dashboard QA Review",
    project: "Brand Vault",
    dueLabel: "Next Week",
    dueTone: "bg-sky-50 text-sky-600 ring-sky-100",
    iconBg: "bg-sky-50 text-sky-500",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4" />
      </svg>
    ),
  },
];

const UpcomingDeadlines = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Upcoming Deadlines
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
        </a>
      </div>

      <div className="mt-6 space-y-4">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:bg-slate-50"
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${deadline.iconBg}`}>
              {deadline.icon}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {deadline.title}
              </p>
              <p className="truncate text-sm text-slate-500">{deadline.project}</p>
            </div>

            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${deadline.dueTone}`}
            >
              {deadline.dueLabel}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingDeadlines;
