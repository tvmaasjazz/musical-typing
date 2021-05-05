import * as Tone from 'tone';
import startingInstruments from './startingInstruments';

class InstrumentLibrary {
    constructor() {
        // this.baseUrl = 'https://instrument-samples.s3.amazonaws.com';
        this.baseUrl = './instruments';
        // available instruments to be loaded
        this.instruments = startingInstruments;
    }

    async load(instrumentNames) {
        const instruments = instrumentNames.map(instrumentName => this.instruments[instrumentName]);
        const promises = [];
    
        for (const instrument of instruments) {
            if (instrument.isLoaded) {
                continue;
            }

            promises.push(new Promise(res => {
                const toneSampler = new Tone.Sampler({
                    baseUrl: `${this.baseUrl}/${instrument.name}/`,
                    urls: instrument.noteToFile,
                    onload: () => {
                        instrument.sampler = toneSampler;
                        instrument.isLoaded = true;
                        res();
                    },
                    onerror: (err) => {
                        console.log(err);
                    }
                });
                // TODO: does ths work here or have to be after load?
                toneSampler.toDestination();
            }));
        }

        return await Promise.all(promises);
    }

    getInstrument(instrumentName) {
        return this.instruments[instrumentName];
    }

    getLoadedInstruments() {
        return Object.values(this.instruments).filter(instrument => instrument.isLoaded);
    }
}

export default InstrumentLibrary;