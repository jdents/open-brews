import * as React from "react";
import { useParams } from "react-router";
import Breweries from "../../components/breweries";
import { getBreweriesByCity } from "../../services";

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
  return getBreweriesByCity(city).subscribe({
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

function City() {
  const { city } = useParams<{ city: string }>();
  const [{ status, breweries }, setBrews] = React.useState<IBrews>(
    INITIAL_STATE
  );

  React.useEffect(() => {
    const subscription = getBrews(setBrews, city);
    return () => subscription.unsubscribe();
  }, [city]);

  return (
    <div>
      <h1>{city}</h1>
      <Breweries breweries={breweries} status={status} />
    </div>
  );
}

export default City;
