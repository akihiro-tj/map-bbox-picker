import { FC, ReactNode } from 'react';

import { BBox } from '../../types';
import { round } from '../../util';

import style from './Panel.module.scss';

type Panel = {
  children?: ReactNode;
  bbox?: BBox;
};

const Panel: FC<Panel> = ({ children, bbox }) => {
  return (
    <div className={style.panel}>
      {children}
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
