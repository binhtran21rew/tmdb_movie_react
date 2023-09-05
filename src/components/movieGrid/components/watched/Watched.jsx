import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {MovieCardList} from '../../../movieCard/MovieCard';
import {GlobalContext} from '../../../../context/GlobalState';

import apiConfig from '../../../../api/apiConfig';
import tmdbApi from '../../../../api/tmdbApi';

import './watched.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

const Watched = props => {   
    const {watched} = useContext(GlobalContext);

    return (
        <div className="watchList">
            {
               watched.length > 0 ? (
                watched.map((item, i) => (
                    <MovieCardList item={item} key={i}>
                        <ActionList movie={item} />
                    </MovieCardList> 
                ))
               ) : (
                <h2 className='watchList__none'>You don't watched any movies.
                    <Link to='/addList/Page' className='watchList__link'>Make your list movie?</Link>
                </h2>
               )
            }
        </div>
    )
}

const ActionList = (props) => {
    const movie = props.movie;
    const {removeFromWatched, movieToWatchList} = useContext(GlobalContext);
    

    const handleRemove = () => {
        removeFromWatched(movie.id)
    }
    const handleWatched = () => {
        movieToWatchList(movie);
    }
    
    return (
        <div className="watchList__poster__image__icon">
            <FontAwesomeIcon 
                icon={faEyeSlash} 
                onClick={handleWatched}
            />
            <FontAwesomeIcon 
                icon={faXmarkSquare}
                onClick={handleRemove}
            />
        </div>

    )
}

export default Watched;