import clsx from 'clsx';
import { FC, MouseEventHandler } from 'react';

import style from './Toggle.module.scss';

type Toggle = {
  toggleOn: boolean;
  onChange: MouseEventHandler<HTMLButtonElement>;
  label: string;
};

const Toggle: FC<Toggle> = ({ toggleOn, onChange, label }) => {
  return (
    <button className={style.toggle} onClick={onChange}>
      <span className={style.label}>{label}</span>
      <div
        className={clsx(style.button, {
          [style.on]: toggleOn,
        })}
      ></div>
    </button>
  );
};

export default Toggle;
