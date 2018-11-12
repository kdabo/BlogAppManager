import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import  ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

// React Router looks into entire URL when deciding which components to render on the screen
// Route object is react Component that can be rendered inside any other custom react component that I put together inside my application
// The purpose is to provide a configuration that will say if URL looks like that, than I want to render this component
// Route component always comes with two mandatory props: path and component
// path pairs with certain components and shows/hides child components depending on URL
// Route components provide some amount of config to react router
// the name of the path does not need to match component name
// by putting semicolon and some number(id) :$`{x}`, react is said to be a wild card
// url is very critical piece of  application's state
// whenever URL changes we want to update the state inside of our application

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
          <div>
              <Switch>
                  <Route path="/posts/new" component={PostsNew} />
                  <Route path="/posts/:id" component={PostsShow} />
                  <Route path="/" component={PostsIndex}/>
              </Switch>
          </div>
      </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));