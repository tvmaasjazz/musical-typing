import React, { Component } from 'react';
import './MapForm.css';

class MapForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chars: '',
            note: 'C',
            octave: '3',
            duration: 2000,
            velocity: 100,
            channel: 1
        };

        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChanges(event) {
        const target = event.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // TODO: check that char is only one long and throw alert if not

        // TODO: check if it is a valid char value... for now just block duplicate char, later
        // could have it be an option to use this input and clear other note

        // or should the it just be you press a char then assign it to a note... might be best
        // since then multiple chars to same note
        // I think ideally you even could assign an array of notes to be triggered on a key press
        // but can add that later with duration as well

        for (const char of this.state.chars) {
            this.props.updateCharToNote(char, {
                note: this.state.note + this.state.octave,
                duration: Number(this.state.duration),
                velocity: Number(this.state.velocity) / 127.0,
                channel: Number(this.state.channel)
            });
        }
    }

    render() {
        return (
            <div className="map-form-container">
                <form className="map-form" onSubmit={this.handleSubmit}>
                    <div className="map-form__chars">
                        <label htmlFor="chars">Char(s): </label>
                        <input name="chars" type="text" onChange={this.handleInputChanges} />
                    </div>
                    <div className="map-form__note">
                        <label htmlFor="note">Note: </label>
                        <select name="note" value={this.state.note} onChange={this.handleInputChanges}>
                            <option value="C">C</option>
                            <option value="C#">C#</option>
                            <option value="D">D</option>
                            <option value="D#">D#/Eb</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="F#">F#/Gb</option>
                            <option value="G">G</option>
                            <option value="G#">G#/Ab</option>
                            <option value="A">A</option>
                            <option value="A#">A#/Bb</option>
                            <option value="B">B</option>
                        </select>
                    </div>
                    <div className="map-form__octave">
                        <label htmlFor="octave">Octave: </label>
                        <select name="octave" value={this.state.octave} onChange={this.handleInputChanges}>
                            {Array(11).fill().map((_, index) => (<option value={index - 1} key={index - 1} >{index - 1}</option>))}
                        </select>
                    </div>
                    {/* TODO: ADD channel (instrument), duration, velocity */}
                    <div className="map-form__duration">
                        <label htmlFor="duration">Duration(ms): </label>
                        <input name="duration" type="text" value={this.state.duration} onChange={this.handleInputChanges} />
                    </div>
                    <div className="map-form__velocity">
                        <label htmlFor="velocity">Velocity: </label>
                        <select name="velocity" value={this.state.velocity} onChange={this.handleInputChanges}>
                            {Array(128).fill().map((_, index) => (<option value={index} key={index} >{index}</option>))}
                        </select>
                    </div>
                    <div className="map-form__channel">
                        <label htmlFor="channel">Channel: </label>
                        <select name="channel" value={this.state.channel} onChange={this.handleInputChanges}>
                            {Array(16).fill().map((_, index) => (<option value={index + 1} key={index + 1} >{index + 1}</option>))}
                        </select>
                    </div>
                    <input type="submit" value="Submit" />
                </form>

                <button className="map-form__reset" onClick={this.props.resetMapping} >Reset Mapping</button>
            </div>
        );
    }
}

export default MapForm;