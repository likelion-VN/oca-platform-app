/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { useState } from 'react';

export default function useMergeState(initialState: any) {
  const [state, setState] = useState(initialState);
  const setMergedState = (newState: any) => setState((prevState: any) => {
    const expectedState = _.assign(prevState, newState);
    return { ...expectedState };
  });
  return [state, setMergedState];
}