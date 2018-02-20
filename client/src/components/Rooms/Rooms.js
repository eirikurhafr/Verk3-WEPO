import React from 'react';
import { PropTypes } from 'prop-types';

class Rooms extends React.Component {
    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;
        socket.on('roomlist', roomList => this.setState({ 
            roomList: Object.keys(roomList).map(key => { 
                return { roomName: key, ...roomList[key] }
            })
        }));
    }
    constructor(props) {
        super(props);
        this.state = {
            room: '',
            roomName: 'Lobby',
            roomList: []
        };
    }
    addroom() {
        const { socket } = this.context;
        console.log(this.state.room);
        this.state.roomName = this.state.room;
        socket.emit('roomlist', this.state.roomName);
        this.forceUpdate();
    }
    render() {
        const { roomList, room } = this.state;
        return (
            <div className="Rooms-box">
                {roomList.map(u => ( <div key={u}>{u}</div> ))}
                <h3>Active room: {this.state.roomName}</h3>
                <input
                    type="text"
                    value={room}
                    className="roomlist"
                    onInput={(e) => this.setState({ room: e.target.value })} />
                <button type="button" className="btn pull-right" onClick={() => this.addroom()}>Add Room</button>
            </div>
        );
    }
};

Rooms.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Rooms;
