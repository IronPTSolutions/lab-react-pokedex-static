import SearchBar from "./SearchBar";
import TypeFilter from "./TypeFilter";

function Filters({ search, type, setSearch, setType }) {
  return (
    <div className="border secondary p-3 mb-3">
      <SearchBar search={search} setSearch={setSearch} />
      <TypeFilter type={type} setType={setType} />
    </div>
  );
}

export default Filters;
