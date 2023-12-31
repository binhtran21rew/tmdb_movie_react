import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {MovieCardList} from '../../../movieCard/MovieCard';
import {GlobalContext} from '../../../../context/GlobalState';

import apiConfig from '../../../../api/apiConfig';
import tmdbApi from '../../../../api/tmdbApi';

import './watchList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

const WatchList = props => {   
    const {watchlist} = useContext(GlobalContext);

    return (
        <div className="watchList">
            {
               watchlist.length > 0 ? (
                watchlist.map((item, i) => (
                    <MovieCardList item={item} key={i}> 
                        <ActionList movie={item} /> 
                    </MovieCardList>

                ))
               ) : (
                <h2 className='watchList__none'>No movies in your list.
                    <Link to='/addList/Page' className='watchList__link'>Make your list movie?</Link>
                </h2>
               )
            }
        </div>
    )
}

const ActionList = (props) => {
    const movie = props.movie;
    const {removeMovieFromWatchList, addMovieToWatched} = useContext(GlobalContext);
    

    const handleRemove = () => {
        removeMovieFromWatchList(movie.id)
    }
    const handleWatched = () => {
        addMovieToWatched(movie);
    }
    
    return (
        <div className="watchList__poster__image__icon">
            <FontAwesomeIcon 
                icon={faEye} 
                onClick={handleWatched}
            />
            <FontAwesomeIcon 
                icon={faXmarkSquare}
                onClick={handleRemove}
            />
        </div>
    )
}

export default WatchList;