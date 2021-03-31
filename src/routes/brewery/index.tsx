import * as React from "react";

import { useParams } from "react-router-dom";
import { useBrewery, useBreweryDispatchContext } from "../../stores/breweries";
import { fetchBrew } from "../../stores/breweries/actions";
import { IStatus } from "../../types";

function Brewery() {
  const { id } = useParams<{ id: string }>();
  const { brewery, status } = useBrewery(parseInt(id, 10));
  const dispatch = useBreweryDispatchContext();

  React.useEffect(() => {
    if (!brewery) {
      fetchBrew(dispatch, id);
    }
  }, [brewery, id, dispatch]);

  if (status === IStatus.pending) {
    return <div>Getting beers...</div>;
  }
  if (status === IStatus.failed) {
    return <div>Failed to get you beers...</div>;
  }

  if (status === IStatus.succeeded) {
    return (
      <div>
        <h1>{brewery?.name}</h1>
        <pre>{JSON.stringify(brewery, null, 2)}</pre>
      </div>
    );
  }

  return <div>Getting beers...</div>;
}

export default Brewery;
