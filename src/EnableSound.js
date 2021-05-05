import React from 'react';
import './EnableSound.css';

const EnableSound = ({ enableSound }) => (
    <div className="enable-sound">
        <button className="enable-sound__button" onClick={enableSound} >Click Here To Enable Sound</button>
    </div>
);
export default EnableSound;