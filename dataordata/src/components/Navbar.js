import React from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import LoginButton from "./LoginButton";


const styles = {
    root: {
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        color: "white"
    },
    navbar:{
        backgroundColor: '#283947'
    }
};

const ButtonAppBar = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <img src="../logo.svg" alt="sst logo" height="40px" width="40px"/>
                    <Typography variant="h4" color="inherit" className={classes.grow}>
                        SST
                    </Typography>
                    <LoginButton/>
                </Toolbar>
            </AppBar>
        </div>
    );
};


ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
