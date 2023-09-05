import React, { useCallback, useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router';

import './add.scss';
import {InputDefault as Input} from '../../../input/Input';
import Button from '../../../button/Button';
import MovieCard from '../../../movieCard/MovieCard';

import tmdbApi from '../../../../api/tmdbApi';
const Add = props => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const {keyword} = useParams();
    useEffect(() => {
        const getList = async () => {

            const params = {
                query: keyword
            }
            const res = await tmdbApi.search({params});
            setItems(res.results);
        }
        
        getList();

    }, [props.category, keyword]);


    return (
        <div className="add">
            <div className="container">
                <div className="add__content section mb-3">
                    <MovieSearch category={props.category} keyword={keyword}/>
                </div>
                <div className="add-grid">
                {   
                    items.length  > 0 ?
                    items.map((item,i) => 
                        <MovieCard category={props.category} item={item} key={i} />
                    )
                    : 
                        <span> No Record</span>
                }
                </div>
            </div>
        </div>
    )
}


const MovieSearch = props => {
    const history = useNavigate();
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");


    const handleSearch = useCallback(
        () => {
            if(keyword.trim().length > 0){
                history(`/${props.category}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
    );
    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if(e.keyCode === 13) {
                handleSearch();
            }
        } 
        document.addEventListener('keyup', enterEvent);

        return() => {
            document.removeEventListener('keyup', enterEvent);
        }
    }, [keyword, handleSearch]);
    return (
        <div className="input__wrapper">
            <Input 
                type="text"
                placeholder="Search movie..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            
            <Button className="small" onClick={handleSearch}>Search</Button>
        </div>
    )
}
export default Add;