import React, {Component} from 'react';
import {Button, withStyles} from '@material-ui/core'
import {auth, provider} from "../firebase";


class LoginButton extends Component {

    constructor(props){
        super(props)

        this.state = {
            user: null
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }



    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    render() {
        const {classes} = this.props
        return (
            <div className={classes.root}>
                {this.state.user ?
                    <Button className={classes.button} color="inherit" onClick={this.logout}> Log Out </Button>
                    :
                    <Button className={classes.button} color="inherit" onClick={this.login}> Log In </Button>
                }
            </div>
        );
    }
}


export default withStyles({
    button:{
        backgroundColor: '#DCAB8B',
        color:'#000',
    }
})(LoginButton);