import { createContext, Dispatch, FC, ReactNode, useReducer } from 'react';

import { Action, AppState, initialState, reducer } from './reducer';

type AppContextProvider = {
  children: ReactNode;
};

export const AppContext = createContext<AppState>(initialState);
export const AppUpdateContext = createContext<Dispatch<Action> | undefined>(
  undefined,
);

const AppContextProvider: FC<AppContextProvider> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={state}>
      <AppUpdateContext.Provider value={dispatch}>
        {children}
      </AppUpdateContext.Provider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
