import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useUpdateEffect(
  effect: EffectCallback,
  dependencies: DependencyList = [],
  cleanup?: () => void
) {
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      effect();
    }
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
