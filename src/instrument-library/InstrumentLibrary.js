import * as Tone from 'tone';
import startingInstruments from './startingInstruments';

class InstrumentLibrary {
    constructor() {
        // this.baseUrl = 'https://instrument-samples.s3.amazonaws.com';
        this.baseUrl = `${process.env.PUBLIC_URL}/instruments`;
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

            promises.push(new Promise((res, rej) => {
                const toneSampler = new Tone.Sampler({
                    baseUrl: `${this.baseUrl}/${instrument.name}/`,
                    urls: instrument.noteToFile,
                    onload: () => {
                        instrument.sampler = toneSampler;
                        instrument.isLoaded = true;
                        res();
                    },
                    onerror: (err) => {
                        rej(err);
                    }
                });

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