import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import MainReducer from './module/reducer/MainReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { persistStore, autoRehydrate } from 'redux-persist';
import crosstabSync from 'redux-persist-crosstab';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
	keyPrefix: 'root2',
};

const finalCreateStore = compose(autoRehydrate({ log: process.env.NODE_ENV !== 'production' }))(createStore);

const store = finalCreateStore(
	MainReducer,
	composeEnhancers(
		applyMiddleware(thunkMiddleware)
	)
);

const persistor = persistStore(store, persistConfig, () => { });

crosstabSync(persistor, persistConfig);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
