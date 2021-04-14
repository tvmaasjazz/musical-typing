import React, { Component } from 'react';
import WebMidi from 'webmidi';
import './App.css';
import MapForm from './MapForm';
import Play from './Play';
import Nav from './Nav';
import NoteMapping from './NoteMapping';

class App extends Component {
    constructor(props) {
        super(props);

        // TODO:
        // do cleanup stuff... move webmidi to on mount, and then tear down make sure all midi notes have been sent off command
        // deploy
        // change it to prompt user to select midi output device
        // make so can enter multiple notes for a char
        // make so can map to special keys like ENTER
        // change so user can have multiple maps

        this.state = {
            mode: localStorage.getItem('mode') || 'MAP',
            // mode: 'MAP',
            charToNote: localStorage.getItem('charToNote') ? JSON.parse(localStorage.getItem('charToNote')) : {},
            midiOutput: null
        };

        this.setMode = this.setMode.bind(this);
        this.updateCharToNote = this.updateCharToNote.bind(this);
        this.resetMapping = this.resetMapping.bind(this);
    }

    componentDidMount() {
        // enable midi
        WebMidi.enable((error) => {
            if (error) {
                console.log('WEB MIDI ERROR: ', error);
                return;
            }

            console.log('--OUTPUTS--');
            console.log(WebMidi.outputs);

            // TODO: prompt user to select midi output to use
            this.setState({ midiOutput: WebMidi.outputs[0] });
        });
    }

    setMode(mode) {
        this.setState({ mode }, () => localStorage.setItem('mode', this.state.mode));
    }

    updateCharToNote(char, {
        note,
        duration,
        velocity,
        channel
    }) {
        this.setState(pst => ({
            charToNote: {
                ...pst.charToNote,
                [char]: {
                    notes: [note],
                    duration,
                    velocity,
                    channel
                }
            }
        }), () => [localStorage.setItem('charToNote', JSON.stringify(this.state.charToNote)), console.log(this.state.charToNote)]);
    }

    resetMapping() {
        this.setState({ charToNote: {} }, () => localStorage.setItem('charToNote', '{}'));
    }

    render() {
        // map mode and instrument mode
        // so there should be a global map of string to midi number
        // you click map and you can see the current mappings below
        // amnd at the top there is a form where you type the char
        // hit tab, and then put int the number 0 - 127
        //c when suibm,itted it updates that value which
        // should rerender the display below
        
        // then you can go back to instrument mode and on that page
        // listen for keyboard events and then send midi info based on
        // the mapping
        // instrument mode will also display what you are typing below 

        // return nav bar whioch gets passed func to change the mode

        return (
            <div className='app'>
                <Nav
                    mode={this.state.mode}
                    setMode={this.setMode}
                />
                <NoteMapping charToNote={this.state.charToNote} />
                {
                    this.state.mode === 'MAP' ?
                        <MapForm updateCharToNote={this.updateCharToNote} resetMapping={this.resetMapping} /> :
                        <Play charToNote={this.state.charToNote} midiOutput={this.state.midiOutput} />
                }
            </div>
        );
  }
}

export default App;
