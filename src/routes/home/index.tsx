import { useAtom } from "jotai";
import { queryAtoms } from "../../atoms";
import SimpleSearchInput from "../../components/simple-search-input";
import * as React from "react";
import { Link } from "react-router-dom";

const { queryAtom, breweriesAtom } = queryAtoms();

function Home() {
  const [query, setQuery] = useAtom(queryAtom);
  const [breweries] = useAtom(breweriesAtom);

  return (
    <div>
      <SimpleSearchInput
        initialQuery={query}
        placeholder="search"
        handleSubmit={setQuery}
      />
      <ul>
        {breweries &&
          breweries.map((brewery) => (
            <li key={brewery.id}>
              <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Home;

export function HomeFallback() {
  const [query] = useAtom(queryAtom);
  return (
    <div>
      <SimpleSearchInput
        initialQuery={query}
        placeholder="search"
        handleSubmit={() => {}}
      />
      <div>Fetching...</div>
    </div>
  );
}
