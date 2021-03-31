import * as React from "react";
import { useParams } from "react-router";
import Breweries from "../../components/breweries";
import { getBreweriesByState } from "../../services";
import { IStatus } from "../../types";

interface IBreweriesResponse {
  name: string;
  id: number;
}

interface IBrews {
  status: IStatus;
  breweries: IBreweriesResponse[];
}

function getBrews(
  dispatch: React.Dispatch<React.SetStateAction<IBrews>>,
  city: string
) {
  dispatch({ status: IStatus.pending, breweries: [] });
  return getBreweriesByState(city).subscribe({
    next: (res) => {
      dispatch({ status: IStatus.succeeded, breweries: res });
    },
    error: (err) => {
      console.error(err);
    },
  });
}

const INITIAL_STATE: IBrews = {
  status: IStatus.idle,
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
