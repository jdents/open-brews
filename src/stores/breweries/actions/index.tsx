import React from "react";
import {
  getBrewery,
  IBreweriesResponse,
  queryBreweries,
} from "../../../services";

export enum Types {
  requestBreweries = "requestBreweries",
  breweriesSucceed = "breweriesSucceed",
  breweriesFailed = "breweriesFailed",
  requestBrewery = "requestBrewery",
  breweryResolved = "breweryResolved",
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

interface RequestBrewery {
  type: Types.requestBrewery;
}

interface BreweryResolved {
  type: Types.breweryResolved;
  payload: IBreweriesResponse;
}

interface BreweryFailed {
  type: Types.failedBrewery;
  payload: string;
}

export type Actions =
  | RequestBreweries
  | BreweriesSucceed
  | BreweriesFailed
  | RequestBrewery
  | BreweryResolved
  | BreweryFailed;

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

export function fetchBrew(dispatch: React.Dispatch<Actions>, id: string) {
  dispatch({ type: Types.requestBrewery });
  return getBrewery(id).subscribe({
    next: (payload) => {
      dispatch({ type: Types.breweryResolved, payload });
    },
    error: (err) => {
      dispatch({ type: Types.failedBrewery, payload: "You failed" });
    },
  });
}
