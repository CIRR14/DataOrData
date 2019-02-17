import React, {Component} from 'react';
import {Button, Card, withStyles, Typography, Grid} from '@material-ui/core'
import firebase from "../firebase";
import Divider from "@material-ui/core/Divider/Divider";
import getData from '../api/route';

class TrainingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            data: [],
            user: '',
            doneLoading:false,
            flip: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.login = this.login.bind(this);
        // this.logout = this.logout.bind(this);
    }


    async  componentDidMount(){
        const data = await getData();
        this.setState({data})
        console.log("RECORDS:::::", data);
        console.log(this.state.data)
        this.setState({doneLoading: true})
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

        console.log('this props: ' , this.props)
        let x = !this.state.flip;
        console.log(x);

        this.setState({
            currentItem: '', //clears out inputs
            username: '', //clears out inputs
            flip: x
        });
    }


    render() {
        const {classes, user, item} = this.props;
        const {data, currentItem} = this.state;
        return (
            <div>
            {this.state.doneLoading &&
            <div className={classes.root}>
                {console.log(this.state)}

                <Card className={classes.addItem}>
                    <form onSubmit={this.handleSubmit}>
                        <input className={classes.input} type="text" name="username" placeholder="Staff Member"
                               value={user.displayName || user.email} readOnly/>
                        {console.log(item)}
                        <input className={classes.input} type="text" name="currentItem"
                               placeholder="Who is doing the training?" onChange={this.handleChange}
                               value={currentItem}/>
                        <Button type="submit" className={classes.button}>Add </Button>
                        <Divider/>
                        
                <div className={classes.root}>
                        <Typography align='center' variant="h4" color='textPrimary'>
                            Stay Informed
                        </Typography>
                </div>

                        {this.state.flip === true ?
                            <div>
                                <Grid container spacing={24}>
                                    <Grid item xs={4}><Typography variant ="h6">University:</Typography></Grid> <Grid item xs={8}>{data[1].fields.title}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Location:</Typography></Grid> <Grid item xs={8}>{data[1].fields.city}, {data[1].fields.state}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Date:</Typography></Grid><Grid item xs={8}>{data[1].fields.date_detailed}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Fatalities:</Typography></Grid> <Grid item xs={8}>{data[1].fields.total_number_of_fatalities}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Description:</Typography></Grid> <Grid item xs={8}>{data[1].fields.description}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Possible Motive:</Typography></Grid> <Grid item xs={8}>{data[1].fields.possible_motive_detailed}</Grid>

                                </Grid>
                            </div>
                            :
                            <div>
                                <Grid container spacing={24}>
                                    <Grid item xs={4}><Typography variant ="h6">University:</Typography></Grid> <Grid item xs={8}>{data[6].fields.title}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Location:</Typography></Grid> <Grid item xs={8}>{data[6].fields.city}, {data[6].fields.state}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Date:</Typography></Grid><Grid item xs={8}>{data[6].fields.date_detailed}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Fatalities:</Typography></Grid> <Grid item xs={8}>{data[6].fields.total_number_of_fatalities}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Description:</Typography></Grid> <Grid item xs={8}>{data[6].fields.description}</Grid>
                                    <Grid item xs={4}><Typography variant ="h6">Possible Motive:</Typography></Grid> <Grid item xs={8}>{data[6].fields.possible_motive_detailed}</Grid>

                                </Grid>
                            </div>
                        }
                        <Grid container spacing={24}><Grid item xs={12}>   ~   </Grid></Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={12}><Typography align='center' variant="h5" color='textPrimary'>Outcome of Shootings On School Grounds</Typography></Grid>
                            <Grid item xs={12}><Typography align='center' variant="h6" color='textPrimary'>418 incidents since 2013</Typography></Grid>
                            <Grid item xs={12} align="center"> <img src="../map.png" height="432px" width="500px" alt="shooting map"/> </Grid>
                        </Grid>
                    </form>
                </Card>
            </div>
    }
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
