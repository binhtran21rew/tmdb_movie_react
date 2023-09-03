import React, {createContext, useReducer, useEffect} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    watchlist: [],
    watched: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);


    useEffect(() => {
        
    }, []);
    const addMovieToWatchList = (movie) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: movie});
    }

    return (
        <GlobalContext.Provider value={{
            watchlist: state.watchlist, 
            watched: state.watched,
            addMovieToWatchList
        }}>
            {props.children}
        </GlobalContext.Provider>
    )

}