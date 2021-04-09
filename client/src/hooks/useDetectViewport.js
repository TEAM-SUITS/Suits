import { useReducer, useEffect } from 'react'
import _ from 'lodash';

/* -------------------------------------------------------------------------- */

export const initialViewports = {
  sm: 480,
  lg: 1024,
};

const initialState = {
  type: '',
  isMobile: false,
  isDesktop: false,
};

// 리듀서
const reducer = (state, action) => {
  if (action.type === 'update') {
    return action.payload
  }
  return state
};

// 액션 객체 생성 함수
const updateAction = (newState) => ({
  type: 'update',
  payload: newState,
});

/* -------------------------------------------------------------------------- */

export default function useDetectViewport(viewports = initialViewports) {
  const { sm, lg } = viewports;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;

    const updateState = (newState) => dispatch(updateAction(newState));

    const detectionViewport = () => {
      const { innerWidth } = window;

      if (innerWidth < sm) {
        updateState({
          type: 'xs',
          isMobile: true,
          isDesktop: false,
        });
      }

      if (innerWidth >= sm) {
        updateState({
          type: 'lg',
          isMobile: false,
          isDesktop: true,
        });
      }
    };

    const throttledDetection = _.throttle(detectionViewport, 500);

    if (mounted) {
      window.addEventListener('resize', throttledDetection);
    }

    return () => { // clean up function
      mounted = false;
      window.removeEventListener('resize', throttledDetection);
    }
  }, [dispatch, sm, lg]);

  return state;
}
