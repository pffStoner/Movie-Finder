import React from 'react';
import PropTypes from 'prop-types';

import './app-header.css';

const AppHeader = props => (
    <header className="app-header">
        <h2>{props.text}</h2>
    </header>
);

AppHeader.propTypes = {
    text: PropTypes.string.isRequired,
}

export default AppHeader;