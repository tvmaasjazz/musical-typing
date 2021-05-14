import React, { Component } from 'react';
import MapForm from './MapForm';
import MapMenu from './MapMenu';

class Map extends Component {
    sortCharMaps(charMaps) {
        return Object.values(charMaps).sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }

            if (a.name > b.name) {
                return 1;
            }

            return 0;
        });
    }

    render() {
        return (
            <div className="map-container">
                <MapForm 
                    updateCharMapping={this.props.updateCharMapping}
                    resetMapping={this.props.resetMapping}
                    instruments={this.props.charMaps[this.props.activeCharMapIdentity].instruments}
                />
                <MapMenu
                    createMapping={this.props.createMapping}
                    orderedCharMaps={this.sortCharMaps(this.props.charMaps)}
                    useMapping={this.props.useMapping}
                />
            </div>
        );
    }
}

export default Map;