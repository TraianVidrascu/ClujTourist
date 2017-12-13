import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import MapDisplayObject from "./MapDisplayObject";
import firebase from '../../config/constants'
import 'bootstrap/dist/css/bootstrap.css'

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
        this._getStyle = this._getStyle.bind(this);
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

    _getLat(coor) {
        return coor.split(',')[0]
    }

    _getLng(coor) {
        return coor.split(',')[1]
    }

    _getStyle(tag_string) {
        const event = {

            width: '49px',
            height: '64px',
            color: 'red'
        }
        const location = {

            width: '49px',
            height: '64px',
            color: 'blue'
        }
        if(tag_string.indexOf('location')>=0){
            return location;
        }else{
            return event;
        }
    }
    render() {


        const objectives = this.state.items.map((item, index) => (
            <MapDisplayObject
                text={item.name}
                lat={this._getLat(item.location)}
                lng={this._getLng(item.location)}
                style={this._getStyle(item.tag_string)}
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
