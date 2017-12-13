import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapDisplayObject from "./MapDisplayObject";
import firebase from '../../config/constants'

const a = ({text}) => <div>{text}</div>;

class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: []
        }
        this._getLat = this._getLat.bind(this);
        this._getLng = this._getLng.bind(this);

    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('items')

        itemsRef.on('value', (snapshot) => {
            const items = snapshot.val()
            this.setState({
                items: Object.keys(items).map(id => ({id, ...items[id]}))
            })
        });
        this.setState({
            isLoading: false
        })
    }

    _getLat(coor){
        var lat =  coor.split(' ')[0].replace('.','').replace('\'','').replace('°','.');
        return lat.substring(0,lat.length-2)
    }

    _getLng(coor){
        var lng =  coor.split(' ')[1].replace('.','').replace('\'','').replace('°','.');
        return lng.substring(0,lng.length-3)
    }

    render() {
        const objectives = this.state.items.map((item, index) => (
            <MapDisplayObject
                text={item.name}
                lat={this._getLat(item.location)}
                lng={this._getLng(item.location)}
            />
        ));

        if (this.state.isLoading) {
            return (<div>
                <text>Loading...</text>
            </div>)
        } else
            return (
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    style={{height: '300px'}}
                    center={[46.7712101, 23.623635299999933]}
                    zoom={13}
                >
                    {
                        objectives
                    }
                </GoogleMapReact>)

    }
}

GoogleMap.defaultProps = {
    center: {lat: 46.77, lng: 23.62},
    zoom: 11
};

export default GoogleMap;
