import { bindActionCreators } from "@reduxjs/toolkit";
import _ from "lodash";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

const useActions = (actions: any, deps?: any) => {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (_.isArray(actions)) {
        return _.map(actions, (action) => bindActionCreators(action, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch]
  );
};

export default useActions;
