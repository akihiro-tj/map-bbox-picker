import { ViewStateProps } from '@deck.gl/core/lib/deck';
import clsx from 'clsx';
import DeckGL from 'deck.gl';
import { FC, useContext, useRef } from 'react';

import { basemap, japanBBox } from '../../constant';
import useBBoxLayer from '../../hooks/useBBoxLayer';
import useFitBounds from '../../hooks/useFitBounds';
import useTileLayer from '../../hooks/useTileLayer';
import { AppContext, AppUpdateContext } from '../../providers/App/AppContext';
import { updateViewState } from '../../providers/App/appReducer';

import style from './Map.module.scss';

const Map: FC = () => {
  const { viewState, dragEnabled } = useContext(AppContext);
  const dispatch = useContext(AppUpdateContext);
  const ref = useRef<HTMLDivElement>(null);

  const basemapLayer = useTileLayer(
    'basemap',
    basemap.url,
    dragEnabled ? 0.7 : 1,
  );

  const [bboxLayer, handleDragStart, handleDrag, handleDragEnd] =
    useBBoxLayer('bbox');

  useFitBounds(ref, japanBBox);

  const handleViewStateChange = ({
    viewState,
  }: {
    viewState: ViewStateProps;
  }) => {
    dispatch(updateViewState(viewState));
  };

  return (
    <div
      ref={ref}
      className={clsx(style.map, {
        [style.dragEnabled]: dragEnabled,
      })}
    >
      <DeckGL
        viewState={viewState}
        onViewStateChange={handleViewStateChange}
        layers={[basemapLayer, bboxLayer]}
        controller={!dragEnabled}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
};

export default Map;
