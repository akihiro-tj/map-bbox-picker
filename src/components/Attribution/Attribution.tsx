import { FC } from 'react';

export type Contributor = {
  name: string;
  url: string;
  prefix?: string;
  suffix?: string;
};

import style from './Attribution.module.scss';

export type Attribution = {
  contributors: Contributor[];
};

const Attribution: FC<Attribution> = ({ contributors }) => {
  return (
    <div className={style.attribution}>
      <span className={style.copyright}>&copy;</span>
      <span className={style.contributors}>
        {contributors.map(contributor => (
          <span key={contributor.name} className={style.contributor}>
            {contributor.prefix && <span>{contributor.prefix}</span>}
            <a href={contributor.url} target="_blank" rel="noreferrer">
              {contributor.name}
            </a>
            {contributor.suffix && <span>{contributor.suffix}</span>}
          </span>
        ))}
      </span>
    </div>
  );
};

export default Attribution;
