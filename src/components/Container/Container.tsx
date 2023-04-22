import { FC, ReactNode } from 'react';

import style from './Container.module.scss';

type Container = {
  children?: ReactNode;
};

const Container: FC<Container> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Container;
