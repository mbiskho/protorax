import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <div>
      <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">
          <i class="fas fa-search"></i>
        </span>
        <input
          onChange={onSearch}
          type="text"
          class="form-control"
          placeholder="Cari berdasarkan nama"
          aria-label="Username"
          aria-describedby="addon-wrapping"
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
