import React from 'react';
import './NoteMapping.css';
import NoteMappingItem from './NoteMappingItem';

const NoteMapping = ({
    charMapping
}) => {
    // set charMapping to sorted array
    const charMappingArray = Object.entries(charMapping).map(entry => {
        return {
            char: entry[0],
            values: entry[1]
        }
    }).sort((a, b) => {
        return b < a ? b : a;
    });

    return (
        <div className='note-mapping'>
            {
                charMappingArray.map(charMappingItem => (
                    <NoteMappingItem
                        key={charMappingItem.char}
                        note={charMappingItem.values.notes[0]}
                        char={charMappingItem.char}
                    />
                ))
            }
        </div>
    );
}


export default NoteMapping;