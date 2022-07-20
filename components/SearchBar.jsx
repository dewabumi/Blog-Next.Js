import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.node.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="relative h-24 w-full z-50">
      <div className="mb-3 w-full absolute inset-x-0 top-0">
      <div class="input-group relative flex flex-row items-stretch w-full mb-4">
      <input className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        font-semibold
        rounded-full
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
            />
            <span class="input-group-text flex-auto items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
            {filteredData.length === 0 ? (
                <SearchIcon className="text-white"/>
            ) : (
                <CloseIcon className="text-white" id="clearBtn" onClick={clearInput} />
            )}
            </span>
      </div>
      {filteredData.length != 0 && (
        <div className="bg-white p-3 font-semibold rounded-lg">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a href={`/post/${value.node.slug}`} target="_blank">
                <p className="hover:bg-gray-200 mb-2">{value.node.title}</p>
              </a>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}

export default SearchBar;