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
    getChildContext() {
        return {
            socket: socketClient('http://localhost:8080')
        };
    }
    getCurrentRoom() {
        return this.state.currentRoom;
    }
    render() {
        return ( 
            <div className="container">
                <div className="logRooms">
                    <Login />
                    <Rooms currentRoom={this.getCurrentRoom.bind(this)}/>
                </div>
                <div className="chatRooms">
                    <ChatWindow />
                </div>
            </div>
        );
    }
};

App.childContextTypes = {
    socket: PropTypes.object.isRequired
};

ReactDOM.render(<App />, document.getElementById('app'));
