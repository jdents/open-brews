import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

export function getBreweries(city: string = "new york") {
  return ajax(
    `https://api.openbrewerydb.org/breweries?by_city=${encodeURI(city)}`
  ).pipe(map((res) => res.response));
}
