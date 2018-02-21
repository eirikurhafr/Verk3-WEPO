import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import '../styles/site.less';
import socketClient from 'socket.io-client';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Login from './components/Login/Login';
import Rooms from './components/Rooms/Rooms';

class App extends React.Component {
    componentDidCatch(error, info) {
        console.log(error, info);
    }
    
    constructor(props) {
        super(props)
        this.state = {
            roomName: 'Lobby',
            loggedIn: false,
            user: ''
        }

        this.getCurrentRoom=this.getCurrentRoom.bind(this);
        this.setCurrentRoom=this.setCurrentRoom.bind(this);
        this.getUser=this.getUser.bind(this);
        this.setUser=this.setUser.bind(this);
    }

    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        };
    }

    setCurrentRoom(rmName) {
        this.state.roomName = rmName;
    }

    getCurrentRoom() {
        return this.state.roomName;
    }

    setUser(usName) {
        this.state.user = usName;
    }

    getUser() {
        return this.state.user();
    }

    render() {
        return ( 
            <div className="container">
                <div className="logRooms">
                    <Login />
                    <Rooms swapRoom={this.setCurrentRoom}/>
                </div>
                <div className="chatRooms">
                    <ChatWindow roomName={this.getCurrentRoom} user={this.getUser}/>
                </div>
            </div>
        );
    }};

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<App />, document.getElementById('app'));
