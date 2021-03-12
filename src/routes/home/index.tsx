import * as React from "react";
import { Redirect } from "react-router";
import Breweries from "../../components/breweries";
import useQuery from "../../hooks/useQuery";
import { queryBreweries } from "../../services";

interface IBreweriesResponse {
  name: string;
  id: number;
}

interface IBrews {
  status: "idle" | "pending" | "resolved" | "failed";
  breweries: IBreweriesResponse[];
}

const INITIAL_STATE: IBrews = {
  status: "idle",
  breweries: [],
};

function Home() {
  const query = useQuery();
  const state = query.get("state");
  const search = query.get("search");
  const [{ status, breweries }, setBrews] = React.useState<IBrews>(
    INITIAL_STATE
  );

  React.useEffect(() => {
    if (search) {
      setBrews((prevBrews) => ({ ...prevBrews, status: "pending" }));
      const subscription = queryBreweries(search).subscribe({
        next: (res) =>
          setBrews({
            status: "resolved",
            breweries: res,
          }),
      });
      return () => subscription.unsubscribe();
    }
  }, [search]);

  if (state) {
    return <Redirect to={`/state/${state}`} />;
  }

  return (
    <div>
      <h1>Lets drink find something to drink</h1>
      <h2>{search}</h2>
      {search && <Breweries status={status} breweries={breweries} />}
    </div>
  );
}

export default Home;
