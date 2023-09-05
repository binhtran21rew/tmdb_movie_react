import React, {useContext} from 'react';

import './movieCard.scss';
import Button from '../button/Button';


import { GlobalContext } from '../../context/GlobalState';
import apiConfig from '../../api/apiConfig';


const MovieCard = props => {
    const item = props.item;

    const { addMovieToWatchList, watchlist, watched } = useContext(GlobalContext)
    
    let storeMovie = watchlist.find( o => o.id === item.id )
    let storeMovieWatched = watched.find( o => o.id === item.id)
    const watchlistDisabled = (storeMovie || storeMovieWatched) ? true: false;
    
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    return (
        <div>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                {storeMovieWatched ? (
                    <Button
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchList(item)}
                    >
                        Watched
                    </Button>
                ) : (
                    <Button
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchList(item)}
                    >
                    Add List 
                    </Button>
                )}
            </div>
            <h3>{item.title || item.name}</h3>
        </div>

    )
}


export const MovieCardList = props => {
    const item = props.item;

    return (
        <div className="watchList__item">
            <div className="watchList__poster">
                <img 
                    className='watchList__poster__image'
                    src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} alt="" />
                    {props.children}
            </div>
            <div className="watchList__content  mb-3">
                <h1 className="name">
                    {item.name || item.title}
                </h1>
                <p className='overview'>
                    {item.overview}
                </p>
                <span className='rated'>
                    <div className="rated__item"><span>Release:</span> {item.release_date} </div>
                    <div className="rated__item"><span>Rated:</span> {item.popularity} </div>
                    <div className="rated__item"><span>Vote average:</span> {item.vote_average} </div>
                </span>
            </div>
        </div>
    )
}

export default MovieCard;