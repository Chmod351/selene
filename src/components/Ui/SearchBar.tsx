import React, { useState } from "react";
import { useIsQuerySearch } from "@/hooks/useIsQuerySearch";
import SlidingPane from "react-sliding-pane";
import { FaSearch } from "react-icons/fa";

function SearchBarComponent({
  handleSearch,
  handleClickWithQuery,
  query,
}: {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickWithQuery: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  query: string | null;
}) {
  return (
    <form className="flex px-4 py-2 rounded-3xl bg-white md:w-[400px] w-full border-2 flex-row">
      <FaSearch className="w-6 h-6 text-[#999999] mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="outline-none"
        value={query || ""}
        onChange={handleSearch}
        onKeyDown={handleClickWithQuery}
      />
    </form>
  );
}

function SlidingPaneSearch({
  setIsSearchOpen,
  isSearchOpen,
  handleSearch,
  handleClickWithQuery,
  query,
}: {
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchOpen: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickWithQuery: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  query: string | null;
}) {
  return (
    <SlidingPane
      closeIcon={<div>X</div>}
      isOpen={isSearchOpen}
      title="What are you looking for?."
      onRequestClose={() => setIsSearchOpen(false)}
      width="100%"
    >
      <SearchBarComponent
        handleSearch={handleSearch}
        handleClickWithQuery={handleClickWithQuery}
        query={query}
      />
    </SlidingPane>
  );
}

function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const { data, error, isLoading } = useIsQuerySearch(query);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClickWithQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("Search query:", query);
    }
  };

  return (
    <>
      <div className="flex md:space-x-4 space-x-8 items-center ">
        <div className="hidden md:block">
          <SearchBarComponent
            handleSearch={handleSearch}
            handleClickWithQuery={handleClickWithQuery}
            query={query}
          />
        </div>
        <button
          className="w-8 h-8 md:hidden"
          onClick={
            isSearchOpen
              ? () => setIsSearchOpen(false)
              : () => setIsSearchOpen(true)
          }
        >
          <FaSearch className="w-full h-full text-[#999999]" />
        </button>
      </div>

      <SlidingPaneSearch
        setIsSearchOpen={setIsSearchOpen}
        isSearchOpen={isSearchOpen}
        handleSearch={handleSearch}
        handleClickWithQuery={handleClickWithQuery}
        query={query}
      />
    </>
  );
}

export default SearchBar;
