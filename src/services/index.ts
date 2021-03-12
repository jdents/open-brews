import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

export function getBreweriesByCity(city: string = "new york") {
  return ajax(
    `https://api.openbrewerydb.org/breweries?by_city=${encodeURI(city)}`
  ).pipe(map((res) => res.response));
}

export function getBreweriesByState(state: string = "new york") {
  return ajax(
    `https://api.openbrewerydb.org/breweries?by_state=${encodeURI(state)}`
  ).pipe(map((res) => res.response));
}

export function getBrewery(id: string) {
  return ajax(`https://api.openbrewerydb.org/breweries/${id}`).pipe(
    map((res) => res.response)
  );
}

// https://api.openbrewerydb.org/breweries/search?query=dog

export function queryBreweries(query: string) {
  return ajax(
    `https://api.openbrewerydb.org/breweries/search?query=${query}`
  ).pipe(map((res) => res.response));
}
