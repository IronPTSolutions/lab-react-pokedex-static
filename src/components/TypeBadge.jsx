// TODO Iteration 6: define TypeBadge
// - Receives a `type` string as a prop (e.g. "Fire", "Water")
// - Renders a <span> with className "type-badge type-<type>"
// - The text inside the span is the type itself

function TypeBadge({ type, selected }) {
  return (
    <span
      className={`type-badge type-${type} ${selected ? "type-selected" : ""}`}
    >
      {type}
    </span>
  );
}

export default TypeBadge;
