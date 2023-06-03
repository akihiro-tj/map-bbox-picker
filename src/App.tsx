import { FC } from 'react';

import Attribution from './components/Attribution/Attribution';
import Container from './components/Container/Container';
import Map from './components/Map/Map';
import Panel from './components/Panel/Panel';
import { basemap } from './constant';
import './styles/index.scss';

const App: FC = () => {
  return (
    <Container>
      <Map />
      <Attribution contributors={basemap.contributors} />
      <Panel />
    </Container>
  );
};

export default App;
