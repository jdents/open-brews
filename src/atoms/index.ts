import axios from "axios";
import { atom } from "jotai";

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

export function queryAtoms() {
  const queryAtom = atom("dog");
  const urlAtom = atom(
    (get) =>
      `https://api.openbrewerydb.org/breweries/search?query=${get(queryAtom)}`
  );

  const breweriesAtom = atom(async (get) => {
    const response = await axios.get<IBreweriesResponse[]>(get(urlAtom));
    return response.data;
  });

  return {
    breweriesAtom,
    queryAtom,
  };
}

export function breweryAtoms() {
  const idAtom = atom<string>("8865");
  const breweryAtom = atom(async (get) => {
    const response = await axios.get<IBreweriesResponse>(
      `https://api.openbrewerydb.org/breweries/${get(idAtom)}`
    );
    return response.data;
  });
  return { idAtom, breweryAtom };
}
