import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

export interface IBreweriesResponse {
  name: string;
  id: number;
  brewery_type: string | null;
  street: string | null;
  address_2: string | null;
  address_3: string | null;
  city: string | null;
  state: string | null;
  county_province: string | null;
  postal_code: string | null;
  country: string | null;
  longitude: string | null;
  latitude: string | null;
  phone: string | null;
  website_url: string | null;
  updated_at: string | null;
  created_at: string | null;
}

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
