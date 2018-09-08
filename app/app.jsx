const React = require('react');
const { render } = require('react-dom');

// router
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;

// redux
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const votes = require('./reducers');

/*
original setup
Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={MainApp}/>
        <Route path="/about" component={About}/>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));
*/


let store = createStore(votes);

/* Import Components */
const MainApp = require('./components/MainApp');
const EditPage = require('./components/EditPage');

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={EditPage}/>
        <Route path="/timer" component={MainApp}/>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('main'));