import GoBackButton from "@/components/shared/others/GoBackButton";
import { type Metadata } from "next";
import SearchForm from "../_components/SearchForm";
import PostResult from "./_components/PostResult";
import HashtagResult from "./_components/HashtagResult";

export const metadata: Metadata = {
  title: "Search Result",
  description: "View the search result",
};

// ✅ Fix: Both params and searchParams must be Promise types
type Props = {
  params: Promise<{ searchTerm: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const SearchResultPage = async ({ params, searchParams }: Props) => {
  const { searchTerm } = await params;
  const search = await searchParams;
  console.log(searchTerm, search);

  return (
    <div className="font-raleway">
      <div className="px-5 py-5 flex items-center gap-4 border-b border-input">
        <GoBackButton></GoBackButton> Search Results
      </div>
      <SearchForm></SearchForm>
      <PostResult></PostResult>
      <HashtagResult></HashtagResult>
    </div>
  );
};

export default SearchResultPage;
