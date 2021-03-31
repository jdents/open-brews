import * as React from "react";
import { Redirect, useHistory } from "react-router";
import Breweries from "../../components/breweries";
import SimpleSearchInput from "../../components/simple-search-input";
import useQuery from "../../hooks/useQuery";
import {
  useBreweryDispatchContext,
  useBreweryStateContext,
} from "../../stores/breweries";
import { fetchBrews } from "../../stores/breweries/actions";

function Home() {
  const query = useQuery();
  const state = query.get("state");
  const search = query.get("search");
  const history = useHistory();
  const breweries = useBreweryStateContext();
  const dispatch = useBreweryDispatchContext();

  console.log({ breweries });

  React.useEffect(() => {
    if (search) {
      const subscription = fetchBrews(dispatch, search);
      return () => subscription.unsubscribe();
    }
  }, [search, dispatch]);

  function handleSearch(query: string) {
    history.push({ search: `?search=${query}` });
  }

  if (state) {
    return <Redirect to={`/state/${state}`} />;
  }

  return (
    <div>
      <h1>Lets drink find something to drink</h1>
      <SimpleSearchInput
        initialQuery={search || ""}
        placeholder="Search for a brewery"
        handleSubmit={handleSearch}
      />
      <h2>{search}</h2>
      {/* {search && <Breweries status={status} breweries={breweries} />} */}
    </div>
  );
}

export default Home;
