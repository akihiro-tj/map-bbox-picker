import { FC } from 'react';

import Attribution from './components/Attribution/Attribution';
import Container from './components/Container/Container';
import { basemap } from './constants';
import Map from './containers/Map/Map';
import Panel from './containers/Panel/Panel';
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
