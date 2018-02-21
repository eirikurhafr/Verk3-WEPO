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
        this.forceUpdate();

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

    joinRoom(roomToJoin) {
        const { socket } = this.context;
        socket.emit('joinroom', {room:roomToJoin, pass:undefined}, available => {
            console.log('available ', available);
        })
        this.state.roomName = roomToJoin;
        this.forceUpdate();

    }

    addroom() {
        console.log(this.state.room);
        this.state.roomName = this.state.room;
        this.joinRoom(this.state.room);
        console.log(this.state.rooms);
        this.context.socket.emit('rooms');
        this.showRooms();
        this.forceUpdate();

    }
    showRooms() {
        this.state.rooms.forEach(element => {
            if(document.getElementById(element['name']) == null) {
                var node = document.createElement('BUTTON');
                var textnode = document.createTextNode(element['name']);
                node.id = element['name'];
                node.addEventListener('click', function() {
                    this.joinRoom(node.id);
                }.bind(this));
                console.log(this.state.roomName);
                this.forceUpdate();
                node.appendChild(textnode);
                document.getElementById('roomsBtn').appendChild(node);
            }
        });
        this.forceUpdate();
    }

    render() {
        const { room } = this.state;
        return (
            <div id="Rooms-box">
                <h3>Active room: {this.state.roomName}</h3>
                <input
                    type="text"
                    value={room}
                    className="roomlist"
                    onInput={(e) => this.setState({ room: e.target.value })} />
                <button type="button" className="btn pull-left" onClick={() => this.addroom()}>Add Room</button>
                <button type="button" id="rooms" className="btn" onClick={() => this.showRooms()}>Show Available Rooms</button>
                <div id="roomsBtn"></div>
            </div>
            
            
           
        );
    }
};

Rooms.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Rooms;
