import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import Table from './components/Table';
import Form from './components/Form';

const App = () => (
  <Provider store={store}>
    <div>
      <Form/>
      <Table/>
    </div>
  </Provider>
);

export default App;
