import * as React from "react";
import { IBreweriesResponse } from "../../services";
import { IStatus } from "../../types";
import { Types, Actions } from "./actions";

type IBreweryList = { [query: string]: number[] };

interface IBreweryStateContext {
  status: IStatus;
  getBreweryStatus: IStatus;
  byId: { [id: string]: IBreweriesResponse };
  list: IBreweryList;
  error: string | null;
}

type IBreweryDispatchContext = React.Dispatch<Actions>;

const INITIAL_STATE: IBreweryStateContext = {
  status: IStatus.idle,
  getBreweryStatus: IStatus.idle,
  byId: {},
  list: {},
  error: null,
};

const BreweriesStateContext = React.createContext(
  (null as unknown) as IBreweryStateContext
);
BreweriesStateContext.displayName = "BreweriesStateContext";
const BreweriesDispatchContext = React.createContext(
  (null as unknown) as IBreweryDispatchContext
);
BreweriesDispatchContext.displayName = "BreweriesDispatchContext";

function reducer(
  state: IBreweryStateContext,
  action: Actions
): IBreweryStateContext {
  switch (action.type) {
    case Types.requestBreweries:
      return {
        ...state,
        status: IStatus.pending,
      };
    case Types.breweriesFailed:
      return {
        ...state,
        status: IStatus.failed,
      };
    case Types.breweriesSucceed:
      const byId = action.payload.breweries.reduce(
        (breweries, brewery) => {
          breweries[brewery.id] = brewery;
          return breweries;
        },
        { ...state.byId }
      );
      return {
        ...state,
        status: IStatus.succeeded,
        list: {
          ...state.list,
          [action.payload.query]: action.payload.breweries.map((b) => b.id),
        },
        byId,
      };
    case Types.requestBrewery:
      return {
        ...state,
        getBreweryStatus: IStatus.pending,
      };
    case Types.breweryResolved:
      return {
        ...state,
        getBreweryStatus: IStatus.succeeded,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    case Types.failedBrewery:
      return {
        ...state,
        getBreweryStatus: IStatus.failed,
      };
    default:
      return state;
  }
}

export default function BreweryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

  console.log("Breweries State:", state);

  return (
    <BreweriesDispatchContext.Provider value={dispatch}>
      <BreweriesStateContext.Provider value={state}>
        {children}
      </BreweriesStateContext.Provider>
    </BreweriesDispatchContext.Provider>
  );
}

export function useBreweryStateContext() {
  const state = React.useContext(BreweriesStateContext);
  if (!state) {
    throw new Error("Bonk");
  }
  return state;
}

export function useBreweryDispatchContext() {
  const dispatch = React.useContext(BreweriesDispatchContext);
  if (!dispatch) {
    throw new Error("Bonk");
  }
  return dispatch;
}

export function useListIds(query: string): number[] | undefined {
  const { list } = useBreweryStateContext();
  return list[query];
}

interface IUserBrewery {
  status: IStatus;
  brewery: IBreweriesResponse | undefined;
}
export function useBrewery(id: number): IUserBrewery {
  const { byId, getBreweryStatus } = useBreweryStateContext();
  return {
    status: getBreweryStatus,
    brewery: byId[id],
  };
}

export function useBreweryList(
  query: string
): IBreweriesResponse[] | undefined {
  const ids = useListIds(query);
  const { byId } = useBreweryStateContext();
  return ids?.map((id) => byId[id]);
}
