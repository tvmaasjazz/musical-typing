import React from 'react';
import './NoteMappingItem.css';

const NoteMappingItem = ({
    note,
    char
}) => (
    <div className='note-mapping__item'>
        {`${char} - ${note}`}
    </div>
);


export default NoteMappingItem;