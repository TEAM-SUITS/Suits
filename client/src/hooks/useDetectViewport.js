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

    window.addEventListener('resize', _.throttle(detectionViewport, 500));

    return () => { // clean up function
      window.removeEventListener('resize', _.throttle(detectionViewport, 500));
    }
  }, [dispatch, lg, sm]);

  return state;
}
