import { createContext, useContext } from "react";

export const originContext = createContext({});

export function useOrigin() {
  return useContext(originContext);
}
