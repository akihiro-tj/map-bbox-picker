import { GeoJsonLayer } from '@deck.gl/layers';
import { PickInfo } from 'deck.gl';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { AppContext, AppUpdateContext } from '../providers/app/AppContext';
import { updateBBox } from '../providers/App/appReducer';

type TmpBBox = {
  initialLon?: number;
  initialLat?: number;
  currentLon?: number;
  currentLat?: number;
};

const initialTmpBBox: TmpBBox = {
  initialLon: undefined,
  initialLat: undefined,
  currentLon: undefined,
  currentLat: undefined,
};

const useBBoxLayer = (layerID: string) => {
  const { dragEnabled, bbox } = useContext(AppContext);
  const dispatch = useContext(AppUpdateContext);

  const [tmpBBox, setTmpBBox] = useState<TmpBBox>(initialTmpBBox);

  useEffect(() => {
    if (!dragEnabled) {
      setTmpBBox(initialTmpBBox);
    }
  }, [dragEnabled]);

  useEffect(() => {
    if (
      tmpBBox.initialLon === undefined ||
      tmpBBox.currentLon === undefined ||
      tmpBBox.initialLat === undefined ||
      tmpBBox.currentLat === undefined
    ) {
      dispatch(updateBBox(undefined));
    } else {
      dispatch(
        updateBBox({
          minLon: Math.min(tmpBBox.initialLon, tmpBBox.currentLon),
          minLat: Math.min(tmpBBox.initialLat, tmpBBox.currentLat),
          maxLon: Math.max(tmpBBox.initialLon, tmpBBox.currentLon),
          maxLat: Math.max(tmpBBox.initialLat, tmpBBox.currentLat),
        }),
      );
    }
  }, [tmpBBox, dispatch, dragEnabled]);

  const handleDragStart = useCallback(
    (info: PickInfo<any>) => {
      if (!dragEnabled || !info.coordinate) return;
      const [lon, lat] = info.coordinate;
      setTmpBBox({
        initialLon: lon,
        initialLat: lat,
      });
    },
    [dragEnabled],
  );

  const handleDrag = useCallback(
    (info: PickInfo<any>) => {
      if (!dragEnabled || !info.coordinate) return;
      const [lon, lat] = info.coordinate;
      setTmpBBox(prev => ({
        ...prev,
        currentLon: lon,
        currentLat: lat,
      }));
    },
    [dragEnabled],
  );

  const handleDragEnd = useCallback(
    (info: PickInfo<any>) => {
      if (!dragEnabled || !info.coordinate) return;
      const [lon, lat] = info.coordinate;
      setTmpBBox(prev => ({
        ...prev,
        currentLon: lon,
        currentLat: lat,
      }));
    },
    [dragEnabled],
  );

  const layer = useMemo(() => {
    if (!bbox) return;

    const data = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [bbox.minLon, bbox.maxLat],
            [bbox.maxLon, bbox.maxLat],
            [bbox.maxLon, bbox.minLat],
            [bbox.minLon, bbox.minLat],
            [bbox.minLon, bbox.maxLat],
          ],
        ],
      },
    };

    return new GeoJsonLayer<typeof data>({
      id: layerID,
      data,
      filled: true,
      getFillColor: [255, 100, 100, 255 * 0.7],
    });
  }, [layerID, bbox]);

  return [layer, handleDragStart, handleDrag, handleDragEnd] as [
    typeof layer,
    typeof handleDragStart,
    typeof handleDrag,
    typeof handleDragEnd,
  ];
};

export default useBBoxLayer;
