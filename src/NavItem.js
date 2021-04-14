import React from 'react';
import classNames from 'classnames';
import './NavItem.css';

const NavItem = ({
    text,
    active,
    setMode
}) => (
    <button
        className={classNames('nav__item', {
            'nav__item--active': active
        })}
        onClick={setMode}
    >
        {text}
    </button>
);

export default NavItem;