import React, {useContext} from 'react';

import './movieCard.scss';
import Button from '../button/Button';


import { GlobalContext } from '../../context/GlobalState';
import apiConfig from '../../api/apiConfig';


const MovieCard = props => {
    const item = props.item;

    const { addMovieToWatchList, watchlist } = useContext(GlobalContext)
    
    let storeMovie = watchlist.find( o => o.id === item.id )

    const watchlistDisabled = storeMovie ? true: false;
    
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    return (
        <div>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <Button
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchList(item)}
                >
                    
                    Add List
                  
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </div>

    )
}

export default MovieCard;