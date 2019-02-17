import React, {Component} from 'react';
import {Button, Card, withStyles} from '@material-ui/core'
import firebase from "../firebase";
import Divider from "@material-ui/core/Divider/Divider";
import getData from '../api/route'

class TrainingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            data: [],
            user: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.login = this.login.bind(this);
        // this.logout = this.logout.bind(this);
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items'); //spot in database to store items//

        const item = {
            title: this.state.currentItem,
            user: this.props.user.displayName || this.props.user.email
        };

        itemsRef.push(item);

        this.setState({
            currentItem: '', //clears out inputs
            username: '' //clears out inputs
        });
    }


    render() {
        const {classes, user, item} = this.props;
        return (
            <div className={classes.root}>
                {console.log(this.state)}

                <Card className={classes.addItem}>
                    <form onSubmit={this.handleSubmit}>
                        <input className={classes.input} type="text" name="username" placeholder="Staff Member"
                               value={user.displayName || user.email} readOnly/>
                        {console.log(item)}
                        <input className={classes.input} type="text" name="currentItem"
                               placeholder="Who is doing the training?" onChange={this.handleChange}
                               value={item.currentItem}/>
                        <Button type="submit" className={classes.button}>Add </Button>
                        <Divider/>
                        <div>
                            DATA
                        </div>

                    </form>
                </Card>
            </div>
        );
    }
}

export default withStyles({
    root:{
        width: 'auto',
        margin: '32px auto'
    },
    addItem: {
        borderRadius: '2px',
        borderTop: '3px solid #283947',
        backgroundColor: '#B9B2A7',
        padding: '60px 18px',
        marginBottom: '34px',
        width: 'auto'
    },
    button: {
        width: '100%',
        margin: 'auto',
        backgroundColor: '#DCAB8B'
    },
    input: {
        // fontSize: '22px',
        color: '#000',
        padding: '18px 22px',
        margin: '17px auto',
        border: 0,
        display: 'block',
        width: '80%'
    }


})(TrainingForm)
