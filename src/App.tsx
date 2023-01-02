import React from 'react';
import './App.css';
import { default as PageRoutes } from './PageRoutes';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <>
      <Provider store={store} >
        <PageRoutes />
      </Provider>
    </>
  );
}

export default App;
