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
    <div className={style.toggle}>
      <span className={style.label}>{label}</span>
      <button
        className={clsx(style.button, {
          [style.on]: toggleOn,
        })}
        onClick={onChange}
      />
    </div>
  );
};

export default Toggle;
