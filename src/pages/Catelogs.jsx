import React from 'react';
import { useParams } from 'react-router-dom';


import PageHeader from '../components/pageHeader/PageHeader';
import MovieGrid from '../components/movieGrid/MovieGrid';
const Catelogs = () => {
    const {category, page} = useParams();
    return (
        <div>
            <PageHeader>
                My {category}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category= {category} page={page}/>
                </div>
            </div>
        </div>

    )
}

export default Catelogs;