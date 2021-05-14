import React from 'react';
import './NoteMapping.css';
import NoteMappingItem from './NoteMappingItem';

const NoteMapping = ({
    charMap
}) => {
    // set charMap to sorted array
    const charMappingArray = Object.entries(charMap.mapping).map(entry => {
        return {
            char: entry[0],
            values: entry[1]
        }
    }).sort((a, b) => {
        return b < a ? b : a;
    });

    return (
        <div>
            <div>{charMap.name}</div>            
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
        </div>
    );
}


export default NoteMapping;