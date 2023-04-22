import { FC, MouseEventHandler, useContext } from 'react';

import Toggle from '../../components/Toggle/Toggle';
import { AppContext, AppUpdateContext } from '../../providers/AppContext';
import { updateDragEnabled } from '../../providers/reducer';
import { round } from '../../util';

import style from './Panel.module.scss';

const Panel: FC = () => {
  const { dragEnabled, bbox } = useContext(AppContext);
  const dispatch = useContext(AppUpdateContext);

  const handleToggleChange: MouseEventHandler<HTMLButtonElement> = () => {
    if (!dispatch) return;
    dispatch(updateDragEnabled(!dragEnabled));
  };

  return (
    <div className={style.panel}>
      <Toggle
        toggleOn={dragEnabled}
        onChange={handleToggleChange}
        label={`Area selection: ${dragEnabled ? 'On' : 'Off'}`}
      />
      {bbox && (
        <p className={style.value}>
          {[bbox.minLon, bbox.minLat, bbox.maxLon, bbox.maxLat]
            .map(value => round(value, 2))
            .join(', ')}
        </p>
      )}
    </div>
  );
};

export default Panel;
