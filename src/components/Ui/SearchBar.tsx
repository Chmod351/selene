import React, { useState } from "react";
import { useIsQuerySearch } from "@/hooks/useIsQuerySearch";
import SlidingPane from "react-sliding-pane";
import { FaSearch } from "react-icons/fa";
import { IProduct } from "@/components/ProductComponents/types";
import Image from "next/image";

function SearchResultsLogic({
  data,
  error,
  isLoading,
}: {
  data: IProduct[] | undefined;
  error: Error | null;
  isLoading: boolean;
}) {
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }

  if (data && data.length === 0) {
    return <p className="text-center">No results found</p>;
  }

  return (
    <div className="w-full flex flex-row flex-wrap justify-center gap-5">
      {isLoading && !data
        ? [...Array(4)].map((_, index) => (
            <div
              key={index}
              className="item flex flex-row z-[-3] w-full gap-4 bg-white"
            >
              <div className="w-[100px] h-[100px] flex-shrink-0 rounded-lg bg-gray-300 animate-pulse" />
              <div className="flex flex-col gap-4 ml-4">
                <div className="w-36 h-4  rounded-lg bg-gray-300 animate-pulse " />

                <div className="w-20 h-4  rounded-lg bg-gray-600 animate-pulse " />
              </div>
            </div>
          ))
        : data?.map((product: IProduct) => (
            <div key={product._id}>
              <div className="flex flex-row max-w-full gap-4 overflow-x-auto">
                <div className="w-[100px] h-[100px] flex-shrink-0 rounded-lg">
                  <Image
                    className="hover cursor-pointer h-full w-full object-cover rounded-lg"
                    src={product.image_url[0]}
                    alt={product.name_es}
                    width={100}
                    height={100}
                  />
                </div>
                <aside>
                  <p>{product.name_es}</p>
                  <strong>${product.price_es}</strong>
                </aside>
              </div>
            </div>
          ))}
    </div>
  );
}

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
        className="outline-none w-full"
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
  children,
}: {
  setIsSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchOpen: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickWithQuery: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  query: string | null;
  children: React.ReactNode;
}) {
  return (
    <SlidingPane
      closeIcon={<div>X</div>}
      isOpen={isSearchOpen}
      title="What are you looking for?."
      onRequestClose={() => setIsSearchOpen(false)}
      width="100%"
    >
      <div className="mb-4">
        <SearchBarComponent
          handleSearch={handleSearch}
          handleClickWithQuery={handleClickWithQuery}
          query={query}
        />
      </div>
      {children}
    </SlidingPane>
  );
}

function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const { data, error, isLoading } = useIsQuerySearch(query);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setQuery(null);
    }
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
          {data?.data?.length > 0 || isLoading ? (
            <div className="w-[400px] rounded-lg fixed max-h-80 h-full bg-white overflow-auto">
              <SearchResultsLogic
                data={data?.data}
                error={error}
                isLoading={isLoading}
              />
            </div>
          ) : null}
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
      >
        <SearchResultsLogic
          data={data?.data}
          error={error}
          isLoading={isLoading}
        />
      </SlidingPaneSearch>
    </>
  );
}

export default SearchBar;
