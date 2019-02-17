import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import {Button, Typography, Collapse, CardHeader, CardActions, CardContent, Card} from '@material-ui/core/';
import {PieChart, Delete} from '@material-ui/icons/';
import firebase from "../firebase";

const styles = theme => ({
    card: {
        width: '80%',
        margin: '32px auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        // transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#283947',
        color: '#fff'
    },
    button: {
        backgroundColor: '#DCAB8B'
    },
    remove:{
        color: '#FF676D'
    }
});

class UserCard extends React.Component {
    state = {expanded: false};

    handleExpandClick = () => {
        this.setState(state => ({expanded: !state.expanded}));
    };
    removeItem = async(id) => {
        const itemRef = firebase.database().ref(`/items/${id}`);
        await itemRef.remove();
    };


    render() {
        const {classes, user, dude, id} = this.props;
        const {displayName, email} = dude;

        return (
            <Card className={classes.card}>
                <CardHeader className={classes.header} classes={{title: classes.header}} avatar={<PieChart/>} color="#fff" title={`Completed By: ${this.props.user}`}/>
                <CardContent>
                    <Typography component="p">
                        Supervised by: {this.props.title}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    {user === displayName || user === email ?
                        <Button className={classes.remove} onClick={() => this.removeItem(id)}><Delete/>  Remove</Button> : null}
                    <Button
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        }, classes.button)}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                    >
                        Show Report </Button>
                </CardActions>

                {/*Collapsible starts*/}
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Report:</Typography>
                        <Typography paragraph>
                            Show Data
                            <div className="report">
                                <p><bold>(add timestamp)</bold></p>
                                <p>
                                    {user}
                                    (died or lived **collect boolean, if true then live, if false then die**) </p>
                                <p>
                                    {user}
                                    chose to (**collect to (**run/hide/fought**) and (lived/died**boolean**)</p>
                            </div>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}





UserCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserCard);
