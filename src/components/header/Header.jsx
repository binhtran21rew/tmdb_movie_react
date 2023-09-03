import React, {useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/logo/tmovie.png';
import './header.scss';

const headerNav =[
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Add',
        path: '/addList/Page'
    },
    {
        display: 'Watch List',
        path: '/watchList/page'
    },
    {
        display: 'Watched',
        path: '/watched/Page'
    },
]
const Header = () => {
    const {pathname} = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                headerRef.current.classList.add('shrink');
            }else{
                headerRef.current.classList.remove('shrink');
            }
        }

        window.addEventListener('scroll', shrinkHeader);
        return () => {
            window.removeEventListener('scroll', shrinkHeader);
        }
    }, []);
    return (
        <div ref={headerRef} className="header">
            <div className="header__warp container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to='/'>Movies</Link>
                </div>
                <div className="header__nav">
                    {
                        headerNav.map((e,i) => (
                            <li key={i} className= {`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>

                            </li>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;