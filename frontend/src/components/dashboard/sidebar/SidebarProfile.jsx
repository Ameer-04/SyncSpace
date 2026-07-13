const SidebarProfile = () => {
  return (
    <div className="border-t border-slate-800 pt-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500 text-white font-semibold">
          A
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            Ameer Ali
          </h3>

          <p className="text-xs text-slate-400">
            Backend Developer
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;