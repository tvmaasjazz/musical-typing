const getNotes = () => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G','G#', 'A', 'A#', 'B'];
    const array = [];
    let octave = -1;
    for (let i = 0; i < 128; i++) {
        array.push(notes[i % notes.length] + octave);

        if (i % notes.length === notes.length - 1) {
            octave++;
        }
    }
    return array;
};

export default getNotes();