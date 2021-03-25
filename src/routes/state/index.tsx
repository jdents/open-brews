import * as React from "react";
import { useParams } from "react-router";
import Breweries from "../../components/breweries";
import { getBreweriesByState } from "../../services";

interface IBreweriesResponse {
  name: string;
  id: number;
}

interface IBrews {
  status: "idle" | "pending" | "resolved" | "failed";
  breweries: IBreweriesResponse[];
}

function getBrews(
  dispatch: React.Dispatch<React.SetStateAction<IBrews>>,
  city: string
) {
  dispatch({ status: "pending", breweries: [] });
  return getBreweriesByState(city).subscribe({
    next: (res) => {
      dispatch({ status: "resolved", breweries: res });
    },
    error: (err) => {
      console.error(err);
    },
  });
}

const INITIAL_STATE: IBrews = {
  status: "idle",
  breweries: [],
};

function State() {
  const { state } = useParams<{ state: string }>();

  const [{ status, breweries }, setBrews] = React.useState<IBrews>(
    INITIAL_STATE
  );

  React.useEffect(() => {
    const subscription = getBrews(setBrews, state);
    return () => subscription.unsubscribe();
  }, [state]);

  return (
    <div>
      <h1>{state}</h1>
      <Breweries breweries={breweries} status={status} />
    </div>
  );
}

export default State;
