const noteToMidi = () => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G','G#', 'A', 'A#', 'B'];
    const map = {};
    let octave = -1;
    for (let i = 0; i < 128; i++) {
        map[notes[i % notes.length] + octave] = i;

        if (i % notes.length === notes.length - 1) {
            octave++;
        }
    }
    return map;
};

export default noteToMidi();