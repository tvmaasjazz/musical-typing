import React, { Component } from 'react';
import './MapForm.css';

class MapForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newMapName: '',
        };

        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.useMapping = this.useMapping.bind(this);
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

        // create a new mapping and set it as the activeMapping
        this.props.createMapping(this.state.newMapName);
        this.setState({ newMapName: '' });
    }

    useMapping(event) {
        event.preventDefault();
        this.props.useMapping(event.target.getAttribute('href'));
    }

    render() {
        return (
            <div className="map-menu-container">
                {/* create form with name and a button to submit */}
                <br/>
                <div>Create New Mapping</div>
                <form className="map-create-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="newMapName">Map Name: </label>
                    <input name="newMapName" type="text" onChange={this.handleInputChanges} />
                    <input type="submit" value="Create" />
                </form>
                {/* list of links of Object.values of the charMaps */}

                <br/>
                {this.props.orderedCharMaps.map((charMap, index) => (<a onClick={this.useMapping} href={charMap.identity} key={index} style={{ display: 'block' }}>{charMap.name}</a>))}
            </div>
        );
    }
}

export default MapForm;