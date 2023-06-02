import { WebMercatorViewport } from '@deck.gl/core';
import { RefObject, useCallback, useContext, useEffect, useState } from 'react';

import { AppUpdateContext } from '../providers/AppContext';
import { updateViewState } from '../providers/reducer';

import useResize from './useResize';

const useFitBounds = (
  ref: RefObject<HTMLDivElement>,
  bbox?: number[],
  padding = 20,
) => {
  const dispatch = useContext(AppUpdateContext);
  const [viewport, setViewport] = useState<WebMercatorViewport>();

  const updateViewport = useCallback(() => {
    if (!ref.current || !bbox) return;

    const width = ref.current.offsetWidth;
    const height = ref.current.offsetHeight;

    const newViewport = new WebMercatorViewport().fitBounds(
      [[...bbox.slice(0, 2)], [...bbox.slice(2, 4)]],
      {
        width,
        height,
        padding,
      },
    );
    setViewport(newViewport);

    return newViewport;
  }, [bbox, ref, padding]);

  useEffect(() => {
    const intervalID = window.setInterval(() => {
      const initialViewport = updateViewport();
      if (initialViewport) {
        window.clearInterval(intervalID);
      }
    }, 100);

    return () => {
      window.clearInterval(intervalID);
    };
  }, [updateViewport]);

  useEffect(() => {
    if (!viewport) return;

    const { longitude, latitude, zoom } = viewport as {
      longitude: number;
      latitude: number;
    } & WebMercatorViewport;

    dispatch(
      updateViewState(prev => ({
        ...prev,
        longitude,
        latitude,
        zoom,
      })),
    );
  }, [dispatch, viewport]);

  useResize(updateViewport);
};

export default useFitBounds;
