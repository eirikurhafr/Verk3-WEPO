import React from 'react';
import { PropTypes } from 'prop-types';

class Rooms extends React.Component {
    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;
        socket.on('roomlist', rooms => this.setState({
            rooms: Object.keys(rooms).map(key => {
                return { name: key, ...rooms[key] } 
            }) 
        }));
        socket.emit('rooms');
    }
    constructor(props) {
        super(props);
        this.state = {
            room: '',
            roomName: 'Lobby',
            rooms: []
        };
    }
    addroom() {
        const { socket } = this.context;
        console.log(this.state.room);
        this.state.roomName = this.state.room;
        socket.emit('joinroom', {room:this.state.room, pass:undefined}, available => {
            console.log('available ', available);
        })
        console.log(this.state.rooms);
        this.forceUpdate();
    }
    showRooms() {
        var op = ''
        for(var i in this.state.rooms) {
            op += '<option>' + this.state.rooms[i]['name'] +'</option>';
        }
        document.getElementById('rooms').innerHTML = op;
        this.forceUpdate();
    }
    
    render() {
        const { room } = this.state;
        return (
            <div className="Rooms-box">
                <h3>Active room: {this.state.roomName}</h3>
                <input
                    type="text"
                    value={room}
                    className="roomlist"
                    onInput={(e) => this.setState({ room: e.target.value })} />
                <button type="button" className="btn pull-left" onClick={() => this.addroom()}>Add Room</button>
                <select id="rooms" onClick={() => this.showRooms()}>
                    <option>Lobby</option>
                </select>
            </div>
        );
    }
};

Rooms.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Rooms;
