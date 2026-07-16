import projects from "./mockProjects";

const RecentProjects = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-slate-900">Recent Projects</h1>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
        </a>
      </div>

      <div className="mt-6 divide-y divide-slate-200">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-6"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-white ${project.iconBg}`}
              >
                {project.icon}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-slate-900">
                  {project.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{project.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:gap-6">
              <div className="flex shrink-0 items-center -space-x-2">
                {project.members.map((member) => (
                  <div
                    key={`${project.id}-${member}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-200 text-xs font-semibold text-slate-600 shadow-sm"
                    title={member}
                  >
                    {member
                      .split("/")
                      .pop()
                      ?.replace(/\.[^.]+$/, "")
                      .toUpperCase()}
                  </div>
                ))}
                {project.extraMembers ? (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-slate-300 text-xs font-semibold text-slate-700 shadow-sm">
                    +{project.extraMembers}
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="w-[120px] overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-2 rounded-full ${project.progressColor}`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="min-w-10 text-sm font-medium text-slate-600">
                  {project.progress}%
                </span>
              </div>

              <div className="flex shrink-0 flex-col text-left text-xs leading-tight text-slate-500">
                <span className="font-medium uppercase tracking-wide text-slate-400">
                  Updated
                </span>
                <span className="mt-1 text-sm font-medium text-slate-600">
                  {project.updatedAt}
                </span>
              </div>

              <button
                type="button"
                className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow-md cursor-pointer"
              >
                Open
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;