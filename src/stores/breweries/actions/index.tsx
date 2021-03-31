import React from "react";
import { IBreweriesResponse, queryBreweries } from "../../../services";

export enum Types {
  requestBreweries = "requestBreweries",
  breweriesSucceed = "breweriesSucceed",
  breweriesFailed = "breweriesFailed",
  requestBrewery = "requestBrewery",
  succeededBrewery = "succeededBrewery",
  failedBrewery = "failedBrewery",
}

interface RequestBreweries {
  type: Types.requestBreweries;
}

interface BreweriesSucceed {
  type: Types.breweriesSucceed;
  payload: {
    breweries: IBreweriesResponse[];
    query: string;
  };
}

interface BreweriesFailed {
  type: Types.breweriesFailed;
  payload: string;
}

export type Actions = RequestBreweries | BreweriesSucceed | BreweriesFailed;

export function fetchBrews(dispatch: React.Dispatch<Actions>, query: string) {
  dispatch({ type: Types.requestBreweries });
  return queryBreweries(query).subscribe({
    next: (res) =>
      dispatch({
        type: Types.breweriesSucceed,
        payload: { breweries: res, query },
      }),
    error: (err) =>
      dispatch({ type: Types.breweriesFailed, payload: "You messed up" }),
  });
}
