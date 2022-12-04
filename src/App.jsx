import { Weather } from 'features/weather';

import './App.css';

export const App = () => {
  return (
    <>
      <div id="modal"></div>
      <div className="app">
        <Weather />
      </div>
    </>
  );
};

export default App;
