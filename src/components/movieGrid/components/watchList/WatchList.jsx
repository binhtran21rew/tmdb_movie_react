import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import MovieCard from '../../../movieCard/MovieCard';
import {GlobalContext} from '../../../../context/GlobalState';
import Button from '../../../button/Button';

import apiConfig from '../../../../api/apiConfig';
import tmdbApi from '../../../../api/tmdbApi';

import './watchList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

const WatchList = props => {   
    const {watchlist} = useContext(GlobalContext);
    const click = () => {
        console.log(1);
    }
    return (
        <div className="watchList">
            {
               watchlist.length > 0 ? (
                watchlist.map((item, i) => (
                    <div className="container watchList__item" key={i}>
                        <div className="watchList__poster">
                            <img 
                                className='watchList__poster__image'
                                src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} alt="" />
                            <div className="watchList__poster__image__icon">
                                <FontAwesomeIcon icon={faEye} onClick={click}/>
                                <FontAwesomeIcon icon={faXmarkSquare}/>

                            </div>

                            
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

export default WatchList;