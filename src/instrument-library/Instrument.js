
class Instrument {
    constructor({
        name,
        noteToFile
    }) {
        this.name = name;
        this.noteToFile = noteToFile;
        this.isLoaded = false;
        this.sampler = null;
    }
}

export default Instrument;