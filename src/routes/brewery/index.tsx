import * as React from "react";
import { useUpdateAtom } from "jotai/utils";

import { useParams } from "react-router-dom";
import { breweryAtoms } from "../../atoms";
import { useAtom } from "jotai";

const { idAtom, breweryAtom } = breweryAtoms();

function Brewery() {
  const { id } = useParams<{ id: string }>();
  const setId = useUpdateAtom(idAtom);
  const [brewery] = useAtom(breweryAtom);

  React.useEffect(() => {
    setId(id);
  }, [id, setId]);

  return (
    <div>
      <h1>{brewery?.name}</h1>
      <pre>{JSON.stringify(brewery, null, 2)}</pre>
    </div>
  );
}

export default Brewery;

export function BreweryFallback() {
  return (
    <div>
      <h1>Fetching Brewery</h1>
    </div>
  );
}
