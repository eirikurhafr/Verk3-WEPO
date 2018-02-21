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
        this.forceUpdate();
    }

    addroom() {
        
        console.log(this.state.room);
        this.state.roomName = this.state.room;
        this.joinRoom(this.state.room);
        console.log(this.state.rooms);
        this.context.socket.emit('rooms');
        this.forceUpdate();
        this.showRooms();
    }
    showRooms() {
        for(var i in this.state.rooms) {
            if(document.getElementById(this.state.rooms[i]['name']) == null) {
                var node = document.createElement('BUTTON');
                var textnode = document.createTextNode(this.state.rooms[i]['name']);
                node.id = this.state.rooms[i]['name'];
                const { socket } = this.context;
                var name2  = this.state.roomName;
                var newname = node.id;
                node.addEventListener('click', function() {
                    socket.emit('joinroom', {room:node.id, pass:undefined}, joined => {
                        console.log('joined ', joined);
                        name2 = newname;
                        console.log(name2);
                    })
                });
                this.state.roomName = name2;
                this.forceUpdate();
                node.appendChild(textnode);
                document.getElementById('roomsBtn').appendChild(node);
            }
        }
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
