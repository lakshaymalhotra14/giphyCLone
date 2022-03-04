/**
 * @format
 */
 import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import Search from './src/components/Search';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import configureStore from './store';

const store=configureStore;
const MyGiphyClone=()=>{
   return( <Provider store={store}>
        <App/>
    </Provider>)
}
AppRegistry.registerComponent(appName, () => MyGiphyClone);
