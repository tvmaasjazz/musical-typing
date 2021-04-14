import React from 'react';
import './NoteMapping.css';
import NoteMappingItem from './NoteMappingItem';

const NoteMapping = ({
    charToNote
}) => {
    // set charToNote to sorted array
    const charToNoteArray = Object.entries(charToNote).map(entry => {
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
                charToNoteArray.map(charToNoteItem => (
                    <NoteMappingItem
                        key={charToNoteItem.char}
                        note={charToNoteItem.values.notes[0]}
                        char={charToNoteItem.char}
                    />
                ))
            }
        </div>
    );
}


export default NoteMapping;