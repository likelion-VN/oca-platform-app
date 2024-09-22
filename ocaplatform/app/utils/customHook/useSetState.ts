/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";
import { useCallback, useState } from "react";

export const useSetState = (initialState: any) => {
  const [state, set] = useState(initialState);
  const setState = useCallback((patch: any) => {
    set((prevState: any) => {
      if (_.isFunction(patch)) {
        const data = patch(prevState);
        if (_.isNil(data)) {
          return prevState;
        }
        return _.assign({}, prevState, data);
      }
      return _.assign({}, prevState, patch);
    });
  }, []);
  return [state, setState];
};
