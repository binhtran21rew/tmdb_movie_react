import React from 'react';
import { useParams } from 'react-router-dom';


import './movieGrid.scss';
import Add from './components/add/Add';
import WatchList from './components/watchList/WatchList';

const MovieGrid = props => {
    // const {category} = useParams();

    const renderPage = (cate) => {
        switch(cate){
            case 'watchList':
                return (
                    <WatchList category='watchList'/>
                )
            case 'watched':
                return (
                    <>3</>
                )
            default: return (
                <Add category='addList'/>
            )
        } 
    }
    return (
        <div className="container">
            {renderPage(props.category)}
        </div>
    )
}

export default MovieGrid;