import * as React from "react";
import { IBreweriesResponse } from "../../services";
import { IStatus } from "../../types";
import { Types, Actions } from "./actions";

type IBreweryList = { [query: string]: number[] };

interface IBreweryStateContext {
  status: IStatus;
  byId: { [id: string]: IBreweriesResponse };
  list: IBreweryList;
  error: string | null;
}

type IBreweryDispatchContext = React.Dispatch<Actions>;

const INITIAL_STATE: IBreweryStateContext = {
  status: IStatus.idle,
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
