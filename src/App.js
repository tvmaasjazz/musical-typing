import React, { Component } from 'react';
import * as Tone from 'tone';
import * as uuid from 'uuid';
import InstrumentLibrary from './instrument-library/InstrumentLibrary';
import './App.css';
import Map from './Map';
import Play from './Play';
import Nav from './Nav';
import NoteMapping from './NoteMapping';
import EnableSound from './EnableSound';
import LoadingIndicator from './LoadingIndicator';

class App extends Component {
    constructor(props) {
        super(props);

        // TODO:
        // -- DEPLOY THIS VERSION TELL YVETTE --
        // try figuring out s3 permissions... probably just wait until next phase
        // add component for selecting instruments to load when you get to the page
        // have instruments that were loaded saved in local storage so they load on arriving
        // change form to select instrument first (then only give options based off that)
        // once get it where it was but with loaded instruments, stop
        // make so can enter multiple notes for a char
        // make so can map to special keys like ENTER
        // change so user can have multiple maps

        // const exampleCharMap = {
        //     identity: 'ty73738he',
        //     name: 'My First Mapping',
        //     instruments: ['piano', 'cello'],
        //     mapping: {

        //     }
        // };

        // maybe set something in local storage and check for that to clear info or not?
        // TODO: make a version nchanghe and havee it look for 'charMapping' and then save that
        // as activeCharMap and in the charMaps object in local storage
        if (!localStorage.getItem('version') || localStorage.getItem('version') !== '.3') {
            const identity = uuid.v4();
            localStorage.setItem('activeCharMapIdentity', identity);
            const firstCharMaps = {
                [identity]: {
                    identity,
                    name: 'First Mapping',
                    instruments: ['piano', 'cello'],
                    mapping: localStorage.getItem('charMapping') ? JSON.parse(localStorage.getItem('charMapping')) : {}
                }
            };
            localStorage.setItem('charMaps', JSON.stringify(firstCharMaps));

            localStorage.removeItem('charMapping');
            localStorage.removeItem('loadedInstruments');
        }
        localStorage.setItem('version', '.3');

        this.instrumentLibrary = new InstrumentLibrary();
        this.state = {
            isSoundEnabled: false,
            isLoading: false,
            mode: localStorage.getItem('mode') || 'MAP',
            activeCharMapIdentity: localStorage.getItem('activeCharMapIdentity'),
            charMaps: localStorage.getItem('charMaps') ? JSON.parse(localStorage.getItem('charMaps')) : {}
        };

        this.setMode = this.setMode.bind(this);
        this.updateCharMapping = this.updateCharMapping.bind(this);
        this.resetMapping = this.resetMapping.bind(this);
        this.enableSound = this.enableSound.bind(this);
        this.createMapping = this.createMapping.bind(this);
        this.useMapping = this.useMapping.bind(this);
    }

    async componentDidMount() {
        // TODO: check for instruments on the active char map and load those
        // load instruments if any were in local storage
        const { charMaps, activeCharMapIdentity } = this.state;
        if (charMaps && charMaps[activeCharMapIdentity] && charMaps[activeCharMapIdentity].instruments) {
            await this.loadInstruments(charMaps[activeCharMapIdentity].instruments);
        }
        else {
            // TODO: prompt user to select instruments to load
        }
    }

    async loadInstruments(instruments) {
        this.setState({ isLoading: true });
        try {
            await this.instrumentLibrary.load(instruments);
            this.setState({ isLoading: false });
        }
        catch (error) {
            alert('There was an error loading the instruments');
            console.log('error loading instruments: ', error);
            this.setState({ isLoading: false });
        }
    }

    enableSound() {
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
            charMaps: {
                ...pst.charMaps,
                [pst.activeCharMapIdentity]: {
                    ...pst.charMaps[pst.activeCharMapIdentity],
                    mapping: {
                        ...pst.charMaps[pst.activeCharMapIdentity].mapping,
                        [char]: {
                            notes: [note],
                            duration,
                            velocity,
                            instrument
                        }
                    }
                }
            }
        }), () => localStorage.setItem('charMaps', JSON.stringify(this.state.charMaps)));
    }

    createMapping(name) {
        const identity = uuid.v4();
        const newMapping = {
            identity,
            name,
            instruments: ['piano', 'cello'],
            mapping: {}
        };

        // update the state and the local storage
        this.setState(pst => ({
            activeCharMapIdentity: identity,
            charMaps: {
                ...pst.charMaps,
                [identity]: newMapping
            }
        }), () => {
            localStorage.setItem('charMaps', JSON.stringify(this.state.charMaps));
            localStorage.setItem('activeCharMapIdentity', this.state.activeCharMapIdentity);
        });
    }

    useMapping(identity) {
        this.setState({ activeCharMapIdentity: identity }, () => localStorage.setItem('activeCharMapIdentity', this.state.activeCharMapIdentity));
    }

    resetMapping() {
        this.setState(pst => ({
            charMaps: {
                ...pst.charMaps,
                [pst.activeCharMapIdentity]: {
                    ...pst.charMaps[pst.activeCharMapIdentity],
                    // TODO: in future reset instruments and/or other attributes
                    mapping: {}
                }
            }
        }), () => localStorage.setItem('charMaps', JSON.stringify(this.state.charMaps)));
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
                <NoteMapping charMap={this.state.charMaps[this.state.activeCharMapIdentity]} />
                {
                    this.state.mode === 'MAP' ?
                    // TODO: make a higher level Map component, then inside that have the MapForm
                    // and the section to either start new map or change active map with list of avaialeable
                        <Map
                            updateCharMapping={this.updateCharMapping}
                            resetMapping={this.resetMapping}
                            charMaps={this.state.charMaps}
                            activeCharMapIdentity={this.state.activeCharMapIdentity}
                            createMapping={this.createMapping}
                            useMapping={this.useMapping}
                        /> :
                        <Play
                            charMapping={this.state.charMaps[this.state.activeCharMapIdentity].mapping}
                            instrumentLibrary={this.instrumentLibrary}    
                        />
                }
            </div>
        );
  }
}

export default App;
