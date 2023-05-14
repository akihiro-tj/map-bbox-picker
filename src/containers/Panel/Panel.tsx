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
        label="Area selection"
      />
      {bbox && (
        <p className={style.bbox}>
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
        </p>
      )}
    </div>
  );
};

export default Panel;
