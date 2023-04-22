import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import { useMemo } from 'react';

const useTileLayer = (layerID: string, tileURL: string, opacity = 1) => {
  const layer = useMemo(
    () =>
      new TileLayer({
        id: layerID,
        data: tileURL,
        opacity,

        renderSubLayers: props => {
          const {
            bbox: { west, south, east, north },
          } = props.tile;

          return new BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [west, south, east, north],
          });
        },
      }),
    [layerID, tileURL, opacity],
  );

  return layer;
};

export default useTileLayer;
