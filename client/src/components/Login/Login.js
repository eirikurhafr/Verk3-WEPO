import React from 'react';
import { PropTypes } from 'prop-types';

class Login extends React.Component {
    componentDidMount() {
        // Register emission handler
        const { socket } = this.context;
        socket.on('adduser', (user) => {
            // Update the message state
            let usernames = Object.assign([], this.state.usernames);
            usernames.push(user);
            this.setState({ usernames });
        });
    }
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            loggedIn: false,
            errorMsg: '',
            usernames: []
        };
    }
    adduser() {
        const { socket } = this.context;
        socket.emit('adduser', this.state.user, (available) => {
            if (available) {
                this.state.loggedIn = true;
                this.state.errorMsg = ''
                this.forceUpdate();
            } else {
                this.state.errorMsg = 'Username Taken';
                this.state.loggedIn = false;
                this.forceUpdate();
            }
        })
        console.log(this.state.user);
    }
    render() {
        const { usernames, user } = this.state;
        if(this.state.loggedIn == false) {
            return (
                <div className="login-box">
                    {usernames.map(u => ( <div key={u}>{u}</div> ))}
                    <p>Select username:</p>
                    <input
                        type="text"
                        value={user}
                        className="adduser"
                        onInput={(e) => this.setState({ user: e.target.value })} />
                    <h4 id="login-error">{this.state.errorMsg}</h4>
                    <button type="button" className="btn pull-left" onClick={() => this.adduser()}>Set nickname</button>
                </div>
            );
        } else if(this.state.loggedIn == true) {
            console.log('logged in: ', this.state.loggedIn);
            return(
                <div className="login-box">
                    {usernames.map(u => ( <div key={u}>{u}</div> ))}
                    <h4>User: {this.state.user}</h4>
                </div>
            );
        }
    }
};

Login.contextTypes = {
    socket: PropTypes.object.isRequired
};

export default Login;
