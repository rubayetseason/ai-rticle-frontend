import GoBackButton from "@/components/shared/others/GoBackButton";
import SearchForm from "./_components/SearchForm";

const ExplorePage = () => {
  return (
    <div className="min-h-screen font-raleway">
      {/* Header */}
      <div className="px-5 py-5 flex items-center gap-4 border-b border-input">
        <GoBackButton />
        <h1 className="text-2xl font-semibold">Explore</h1>
      </div>

      {/* Search Bar */}
      <SearchForm></SearchForm>
    </div>
  );
};

export default ExplorePage;
