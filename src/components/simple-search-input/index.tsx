import * as React from "react";

interface SimpleSearchInputProps {
  initialQuery?: string;
  placeholder?: string;
  handleSubmit: (query: string) => void;
}

function SimpleSearchInput({
  initialQuery,
  handleSubmit,
  placeholder,
}: SimpleSearchInputProps) {
  const [query, setQuery] = React.useState(initialQuery || "");
  return (
    <span>
      <input
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => handleSubmit(query)}>Submit</button>
    </span>
  );
}

export default SimpleSearchInput;
