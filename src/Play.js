import React, { Component } from 'react';

class Play extends Component {
    constructor(props) {
        super(props);

        this.onKeyPress = this.onKeyPress.bind(this);
    }

    onKeyPress(event) {
        // check which key is pressed, use map (passed in props) to output a midi ON and trigger a midi OFF for some delay
        const charCode = event.which;
        const char = String.fromCharCode(charCode);
        
        // if the char has a mapping set
        if (this.props.charToNote[char]) {
            const charMap = this.props.charToNote[char];
            this.props.midiOutput.playNote(charMap.notes, charMap.channel, {
                duration: charMap.duration,
                velocity: charMap.velocity
            });
        }
    }

    render() {
        return (
            <textarea name="text" id="" cols="30" rows="10" onKeyPress={this.onKeyPress}></textarea>
        );
    }
}

export default Play;