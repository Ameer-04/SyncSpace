import SearchBar from "./Searchbar";
import NotificationButton from "./NotificationButton";
import UserMenu from "./UserMenu";
import NewProjectButton from "./NewProjectButton";

const Topbar = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <SearchBar />
      <div className="flex items-center gap-4">
        <NewProjectButton />
        <NotificationButton />
        <UserMenu />
      </div>
    </header>
  );
};

export default Topbar;