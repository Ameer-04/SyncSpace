const UserMenu = () => {
  return (
    <button className="flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
        A
      </div>

      <div className="text-left">
        <p className="text-sm font-semibold text-slate-800">
          Ameer Ali
        </p>

        <p className="text-xs text-slate-500">
          View Profile
        </p>
      </div>
    </button>
  );
};

export default UserMenu;