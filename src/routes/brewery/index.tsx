import * as React from "react";

import { getBrewery } from "../../services";
import { useParams } from "react-router-dom";

function getBrews(
  dispatch: React.Dispatch<React.SetStateAction<IBrews>>,
  id: string
) {
  dispatch((prev) => ({ ...prev, status: "pending" }));
  return getBrewery(id).subscribe({
    next: (res) => {
      dispatch({ status: "resolved", brewery: res });
    },
    error: (err) => {
      console.error(err);
    },
    complete: () => {
      console.log("complete");
    },
  });
}

interface IBreweryResponse {
  name: string;
  id: number;
}

interface IBrews {
  status: "idle" | "pending" | "resolved" | "failed";
  brewery: IBreweryResponse | null;
}

const INITIAL_STATE: IBrews = {
  status: "idle",
  brewery: null,
};

function Brewery() {
  const { id } = useParams<{ id: string }>();
  const [{ status, brewery }, setBrews] = React.useState<IBrews>(INITIAL_STATE);

  React.useEffect(() => {
    const subscription = getBrews(setBrews, id);
    return () => subscription.unsubscribe();
  }, [id]);

  if (status === "pending" || status === "idle") {
    return <div>Getting beers...</div>;
  }
  if (status === "failed") {
    return <div>Failed to get you beers...</div>;
  }

  return (
    <div>
      <h1>{brewery?.name}</h1>
      <pre>{JSON.stringify(brewery, null, 2)}</pre>
    </div>
  );
}

export default Brewery;
