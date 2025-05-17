import { useRef } from 'react';

export const useIsFirstRender = (): boolean => {
  const isFirstRender = useRef<boolean>(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;

    return true;
  }

  return isFirstRender.current;
};
