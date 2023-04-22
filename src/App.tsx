import { FC, MouseEventHandler, useContext } from 'react';

import Attribution from './components/Attribution/Attribution';
import Container from './components/Container/Container';
import Panel from './components/Panel/Panel';
import Toggle from './components/Toggle/Toggle';
import { basemap } from './constants';
import Map from './containers/Map/Map';
import './styles/index.scss';
import { AppContext, AppUpdateContext } from './providers/AppContext';
import { updateDragEnabled } from './providers/reducer';

const App: FC = () => {
  const { dragEnabled, bbox } = useContext(AppContext);
  const dispatch = useContext(AppUpdateContext);

  const handleToggleChange: MouseEventHandler<HTMLButtonElement> = () => {
    if (!dispatch) return;
    dispatch(updateDragEnabled(!dragEnabled));
  };

  return (
    <Container>
      <Map />
      <Attribution contributors={basemap.contributors} />
      <Panel bbox={bbox}>
        <Toggle
          toggleOn={dragEnabled}
          onChange={handleToggleChange}
          label={`Area selection: ${dragEnabled ? 'On' : 'Off'}`}
        />
      </Panel>
    </Container>
  );
};

export default App;
