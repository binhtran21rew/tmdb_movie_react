import React from 'react';

import './pageHeader.scss';
import bg from '../../assets/logo/footer-bg.jpg';
const PageHeader = props => {
    return (
        <div className="page-header" style={{backgroundImage: `url(${bg})`}}>
            <h2>
                {props.children}
            </h2>
        </div>
    )
}

export default PageHeader;