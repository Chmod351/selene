import React, { useState } from "react";
import { useIsQuerySearch } from "@/hooks/useIsQuerySearch";
import SlidingPane from "react-sliding-pane";

function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const { data, error, isLoading } = useIsQuerySearch(query);

  let fakeQuery: string = "";
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    fakeQuery = e.target.value;
  };

  const handleClickWithQuery = (e) => {
    e.preventDefault();
    setQuery(fakeQuery);
  };

  return (
    <>
      <div className="flex md:space-x-4 space-x-8 items-center ">
        <form className="md:block px-4 py-2 rounded-3xl bg-white hidden w-[400px]">
          <input
            type="text"
            placeholder="Search"
            className="outline-none"
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => handleClickWithQuery(e)}
          />
        </form>
        <button
          className="w-8 h-8 bg-red-400 md:hidden"
          onClick={
            isSearchOpen
              ? () => setIsSearchOpen(false)
              : () => setIsSearchOpen(true)
          }
        >
          Search
        </button>
      </div>
      <SlidingPane
        closeIcon={<div>X</div>}
        isOpen={isSearchOpen}
        title="What are you looking for?."
        onRequestClose={() => setIsSearchOpen(false)}
        width="100%"
      >
        <form className="flex px-4 h-16 items-center rounded-3xl border-2 border-gray-300 justify-between">
          <input
            type="text"
            placeholder="Search"
            className="w-full"
            onChange={(e) => handleSearch(e)} // Maneja el cambio aquí
          />
          <button type="button">Search</button>
        </form>
      </SlidingPane>
    </>
  );
}

export default SearchBar;
