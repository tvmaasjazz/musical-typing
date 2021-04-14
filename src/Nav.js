import React from 'react';
import NavItem from './NavItem';
import './Nav.css';

const Nav = ({ mode, setMode }) => (
    <nav className='nav'>
        <NavItem
            text='Map'
            active={mode === 'MAP'}
            setMode={() => setMode('MAP')}
        />
        <NavItem
            text='Play'
            active={mode === 'PLAY'}
            setMode={() => setMode('PLAY')}
        />
    </nav>
);
export default Nav;