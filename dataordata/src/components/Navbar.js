import React, {Component} from "react";

import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {auth, provider} from "../firebase";


const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1,
        fontWeight: ""
    },
    navbar:{
        backgroundColor: '#283948'
    },
    button: {
        backgroundColor: '#DCAB8B',
        color: '#000',
    }
};



class ButtonAppBar extends Component{
constructor(props) {
    super(props)

    this.state= {

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
    render () {

    const {classes, user} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <img src="../logo.svg" alt="sst logo" height="65px" width="65px"/>
                        <Typography align="center" variant="h4" color="inherit" className={classes.grow}>
                        Active Shooter Emergency Response Training
                        </Typography>
                        {user ?
                            <Button className={classes.button} color="inherit" onClick={this.logout}> Log Out </Button>
                            :
                            <Button className={classes.button} color="inherit" onClick={this.login}> Log In </Button>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
};


ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
