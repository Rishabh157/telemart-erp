import React from 'react';
import './App.css';
import { default as Routes } from './_Routes';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  return (
    <>
      <Provider store={store} >
        <Routes />
      </Provider>
    </>
  );
}

export default App;