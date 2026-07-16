const stats = [
  {
    label: "Active Projects",
    value: "projects",
    accent: "text-indigo-600",
    background: "bg-indigo-50",
    delta: "↑ 2 this month",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7.5A2.5 2.5 0 0 1 6.5 5h3.8c.66 0 1.3.26 1.77.73l.94.94c.47.47 1.11.73 1.77.73h2.7A2.5 2.5 0 0 1 19.5 9.9v6.6A2.5 2.5 0 0 1 17 19H6.5A2.5 2.5 0 0 1 4 16.5z" />
      </svg>
    ),
  },
  {
    label: "Tasks To Do",
    value: "tasks",
    accent: "text-emerald-600",
    background: "bg-emerald-50",
    delta: "↑ 5 today",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l2 2 4-4" />
        <rect x="4.5" y="5" width="15" height="14" rx="3" />
      </svg>
    ),
  },
  {
    label: "Team Members",
    value: "messages",
    accent: "text-orange-500",
    background: "bg-orange-50",
    delta: "↑ 3 new",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 14.5a4 4 0 1 1 8 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.5a3 3 0 1 0-3-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18a5.5 5.5 0 0 1 11 0" />
      </svg>
    ),
  },
  {
    label: "Unread Messages",
    value: "members",
    accent: "text-sky-600",
    background: "bg-sky-50",
    delta: "↓ 4 from yesterday",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.5h12A2.5 2.5 0 0 1 20.5 8v6A2.5 2.5 0 0 1 18 16.5H12l-4.5 3v-3H6A2.5 2.5 0 0 1 3.5 14V8A2.5 2.5 0 0 1 6 5.5Z" />
      </svg>
    ),
  },
];

const StatsCard = ({ projects = 0, tasks = 0, messages = 0, members = 0 }) => {
  const values = { projects, tasks, messages, members };

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.background} ${stat.accent}`}>
              {stat.icon}
            </div>

            <div className="min-w-0">
              <p className={`text-3xl font-semibold tracking-tight ${stat.accent}`}>
                {values[stat.value]}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
              <p className="mt-3 text-sm font-medium text-slate-500">{stat.delta}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default StatsCard;