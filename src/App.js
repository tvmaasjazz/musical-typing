import React, { Component } from 'react';
import * as Tone from 'tone';
import InstrumentLibrary from './instrument-library/InstrumentLibrary';
import './App.css';
import MapForm from './MapForm';
import Play from './Play';
import Nav from './Nav';
import NoteMapping from './NoteMapping';
import EnableSound from './EnableSound';
import LoadingIndicator from './LoadingIndicator';

class App extends Component {
    constructor(props) {
        super(props);

        // TODO:
        // look at ways to have length of sound in Tone.js
        // update the form and char mapping situation to play the sampler notes
        // -- DEPLOY THIS VERSION TELL YVETTE --
        // try figuring out s3 permissions... probably just wait until next phase
        // add component for selecting instruments to load when you get to the page
        // have instruments that were loaded saved in local storage so they load on arriving
        // change form to select instrument first (then only give options based off that)
        // once get it where it was but with loaded instruments, stop
        // make so can enter multiple notes for a char
        // make so can map to special keys like ENTER
        // change so user can have multiple maps

        // maybe set something in local storage and check for that to clear info or not?
        if (!localStorage.getItem('version') || localStorage.getItem('version') !== '.2') {
            localStorage.clear();
        }
        localStorage.setItem('version', '.2');

        this.instrumentLibrary = new InstrumentLibrary();
        this.state = {
            isSoundEnabled: false,
            isLoading: false,
            mode: localStorage.getItem('mode') || 'MAP',
            charMapping: localStorage.getItem('charMapping') ? JSON.parse(localStorage.getItem('charMapping')) : {},
            loadedInstruments: localStorage.getItem('loadedInstruments') ? JSON.parse(localStorage.getItem('loadedInstruments')) : Object.keys(this.instrumentLibrary.instruments)
        };

        this.setMode = this.setMode.bind(this);
        this.updateCharMapping = this.updateCharMapping.bind(this);
        this.resetMapping = this.resetMapping.bind(this);
        this.enableSound = this.enableSound.bind(this);
    }

    async componentDidMount() {
        // load instruments if any were in local storage
        if (Array.isArray(this.state.loadedInstruments) && this.state.loadedInstruments.length > 0) {
            await this.loadInstruments(this.state.loadedInstruments);
        }
        else {
            // TODO: prompt user to select instruments to load
        }
    }

    async loadInstruments(instruments) {
        this.setState({ isLoading: true });
        try {
            await this.instrumentLibrary.load(instruments);
            // update the state with the new loaded instruments
            this.updateLoadedInstruments();
            this.setState({ isLoading: false });
        }
        catch (error) {
            alert('There was an error loading the instruments');
            console.log('error loading instruments: ', error);
            this.setState({ isLoading: false });
        }
    }

    updateLoadedInstruments() {
        const loadedInstruments = this.instrumentLibrary.getLoadedInstruments().map(instrument => instrument.name);
        this.setState({ loadedInstruments }, () => localStorage.setItem('loadedInstruments', JSON.stringify(loadedInstruments)));
    }

    enableSound() {
        // do tone stuff
        Tone.Transport.start();

        this.setState({ isSoundEnabled: true });
    }

    setMode(mode) {
        this.setState({ mode }, () => localStorage.setItem('mode', this.state.mode));
    }

    updateCharMapping(char, {
        note,
        duration,
        velocity,
        instrument
    }) {
        this.setState(pst => ({
            // TODO: mapping should have properties at top level for instruments and other settings, then the 
            // mapping itself at a lower level
            charMapping: {
                ...pst.charMapping,
                [char]: {
                    notes: [note],
                    duration,
                    velocity,
                    instrument
                }
            }
        }), () => localStorage.setItem('charMapping', JSON.stringify(this.state.charMapping)));
    }

    resetMapping() {
        this.setState({ charMapping: {} }, () => localStorage.setItem('charMapping', '{}'));
    }

    render() {
        return (
            <div className='app'>
                {
                    this.state.isLoading ? <LoadingIndicator /> : null
                }
                {
                    this.state.isSoundEnabled ? null : <EnableSound enableSound={this.enableSound} />
                }
                <Nav
                    mode={this.state.mode}
                    setMode={this.setMode}
                />
                <NoteMapping charMapping={this.state.charMapping} />
                {
                    this.state.mode === 'MAP' ?
                        <MapForm 
                            updateCharMapping={this.updateCharMapping}
                            resetMapping={this.resetMapping}
                            instruments={this.state.loadedInstruments}
                        /> :
                        <Play
                            charMapping={this.state.charMapping}
                            instrumentLibrary={this.instrumentLibrary}    
                        />
                }
            </div>
        );
  }
}

export default App;
