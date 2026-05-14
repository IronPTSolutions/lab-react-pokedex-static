function SearchBar({ search, setSearch }) {
  return (
    <input
      className="form-control mb-2"
      style={{ width: "400px" }}
      placeholder="Search"
      value={search}
      onInput={(event) => {
        setSearch(event.target.value);
      }}
    />
  );
}

export default SearchBar;
