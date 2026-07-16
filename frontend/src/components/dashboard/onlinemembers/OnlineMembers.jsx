const members = [
  {
    id: 1,
    name: "Ahmed Raza",
    role: "Full Stack Developer",
    status: "online",
    avatarBg: "bg-slate-900",
  },
  {
    id: 2,
    name: "Sarah Khan",
    role: "UI/UX Designer",
    status: "online",
    avatarBg: "bg-emerald-600",
  },
  {
    id: 3,
    name: "John Doe",
    role: "Backend Developer",
    status: "online",
    avatarBg: "bg-sky-600",
  },
  {
    id: 4,
    name: "Maria Ahmed",
    role: "Product Manager",
    status: "online",
    avatarBg: "bg-rose-600",
  },
  {
    id: 5,
    name: "Bilal Ahmad",
    role: "DevOps Engineer",
    status: "online",
    avatarBg: "bg-indigo-600",
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const OnlineMembers = () => {
  const onlineMembers = members.filter((member) => member.status === "online");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          Online Members
        </h2>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
        </a>
      </div>

      <div className="mt-6 space-y-5">
        {onlineMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white ${member.avatarBg} text-sm font-semibold text-white shadow-sm ring-1 ring-slate-200`}
                aria-hidden="true"
              >
                {getInitials(member.name)}
              </div>
              <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {member.name}
              </p>
              <p className="truncate text-sm text-slate-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OnlineMembers;
