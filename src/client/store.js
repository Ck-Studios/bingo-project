import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "client/reducers";
import rootSaga from "client/rootSaga";

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export default function configureStore(preloadedState={}, { isServer, req = null }) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducers,
        preloadedState,
        bindMiddleware([sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
}
