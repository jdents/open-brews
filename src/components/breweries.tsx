import * as React from "react";
import { getBreweries } from "../services";

interface IBreweriesResponse {
  name: string;
  id: number;
}

interface IBrews {
  status: "idle" | "pending" | "resolved" | "failed";
  breweries: IBreweriesResponse[];
}

function getBrews(dispatch: React.Dispatch<React.SetStateAction<IBrews>>) {
  dispatch({ status: "pending", breweries: [] });
  return getBreweries("brooklyn").subscribe({
    next: (res) => {
      dispatch({ status: "resolved", breweries: res });
    },
    error: (err) => {
      console.error(err);
    },
    complete: () => {
      console.log("complete");
    },
  });
}

const INITIAL_STATE: IBrews = {
  status: "idle",
  breweries: [],
};

function State() {
  const [{ status, breweries }, setBrews] = React.useState<IBrews>(
    INITIAL_STATE
  );

  console.log({ breweries });

  React.useEffect(() => {
    const subscription = getBrews(setBrews);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h1>Breweries</h1>
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.id}>{brewery.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default State;
