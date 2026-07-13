import { Plus } from "lucide-react";

const NewProjectButton = () => {
  return (
    <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700">
      <Plus size={18} />

      New Project
    </button>
  );
};

export default NewProjectButton;