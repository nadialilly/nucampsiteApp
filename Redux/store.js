import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { campsitesReducer } from '../features/campsites/campsitesSlice';
import { commentsReducer } from '../features/comments/commentsSlice';
import { partnersReducer } from '../features/partners/partnersSlice';
import { promotionsReducer } from '../features/promotions/promotionsSlice';
import {favoritesReducer} from '../features/favorites/favoritesSlice';
import {
    persistStore,
    persistCombinReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PURGE,
    REGISTER,
    PERSIST

} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
};


export const store = configureStore({
    reducer: persistCombineReducers (config, {
        campsites: campsitesReducer,
        comments: commentsReducer,
        partners: partnersReducer,
        promotions: promotionsReducer,
        favorites: favoritesReducer
    }),
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ]
        }
    })
});

export const persistor = persistStore(store);