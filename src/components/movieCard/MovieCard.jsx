import React from 'react';

import './movieCard.scss';
import Button from '../button/Button';

import apiConfig from '../../api/apiConfig';


const MovieCard = props => {
    const item = props.item;
    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    return (
        <div>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <Button>
                    
                        Add List
                  
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
        </div>

    )
}

export default MovieCard;