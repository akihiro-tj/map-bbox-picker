import { FC, MouseEventHandler, useContext } from 'react';

import { AppContext, AppUpdateContext } from '../../providers/app/AppContext';
import { updateDragEnabled } from '../../providers/app/appReducer';
import { round } from '../../util';
import Toggle from '../Toggle/Toggle';

import style from './Panel.module.scss';

const Panel: FC = () => {
  const { dragEnabled, bbox } = useContext(AppContext);
  const dispatch = useContext(AppUpdateContext);

  const handleToggleChange: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(updateDragEnabled(!dragEnabled));
  };

  return (
    <div className={style.panel}>
      <Toggle
        toggleOn={dragEnabled}
        onChange={handleToggleChange}
        label="Area selection"
      />
      {bbox && (
        <div className={style.bbox}>
          <div>{'{'}</div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;{`"minLon": "${round(bbox.minLon, 2)}",`}
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;{`"minLat": "${round(bbox.minLat, 2)}",`}
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;{`"maxLon": "${round(bbox.maxLon, 2)}",`}
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;{`"maxLat": "${round(bbox.maxLat, 2)}"`}
          </div>
          <div>{'}'}</div>
        </div>
      )}
    </div>
  );
};

export default Panel;
