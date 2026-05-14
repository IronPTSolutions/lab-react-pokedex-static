import TypeBadge from "./TypeBadge";
import pokemons from "../data";

function TypeFilter({ type, setType }) {
  const types = pokemons.reduce((acc, el) => {
    el.types.forEach((type) => {
      if (!acc.includes(type)) {
        acc.push(type);
      }
    });

    return acc;
  }, []);

  return (
    <div>
      {types.map((t) => (
        <span
          className="me-2"
          onClick={() => {
            setType(type === t ? "all" : t);
          }}
        >
          <TypeBadge type={t} selected={type === t} />
        </span>
      ))}
    </div>
  );
}

export default TypeFilter;
