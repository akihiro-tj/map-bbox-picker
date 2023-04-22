import { WebMercatorViewport } from '@deck.gl/core';
import { RefObject, useCallback, useContext } from 'react';

import { AppUpdateContext } from '../providers/AppContext';
import { updateViewState } from '../providers/reducer';

import useResize from './useResize';

const useFitBounds = (
  ref: RefObject<HTMLDivElement>,
  bbox: number[],
  padding = 20,
) => {
  const dispatch = useContext(AppUpdateContext);

  const updateViewport = useCallback(() => {
    if (!ref.current || !dispatch) return;

    const width = ref.current.offsetWidth;
    const height = ref.current.offsetHeight;

    const viewport = new WebMercatorViewport().fitBounds(
      [[...bbox.slice(0, 2)], [...bbox.slice(2, 4)]],
      {
        width,
        height,
        padding,
      },
    );
    const { longitude, latitude, zoom } = viewport as any;

    dispatch(
      updateViewState(prev => ({
        ...prev,
        longitude,
        latitude,
        zoom,
      })),
    );
  }, [bbox, ref, padding, dispatch]);

  useResize(updateViewport);
};

export default useFitBounds;
