import React, {Component} from 'react';
import './App.css';
import firebase, {auth} from './firebase.js';
import Navbar from './components/Navbar';
import CardContainer from "./containers/CardContainer";
import TrainingForm from "./components/TrainingForm";
import Grid from "@material-ui/core/Grid/Grid";
import {provider} from "./firebase";

// import Container from 'react-grid-system';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,

      datas: [],
    }
      // this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
      // this.login = this.login.bind(this);
      // this.logout = this.logout.bind(this);
  }

    // handleChange(e) {
    //   this.setState({
    //     [e.target.name]: e.target.value
    //   });
    // }

  //LOGIN AND LOGOUT BUTTONS/FUNCTIONS//
  //   logout() {
  //       auth.signOut()
  //           .then(() => {
  //               this.setState({
  //                   user: null
  //               });
  //           });
  //   }
  //
  //   login() {
  //       auth.signInWithPopup(provider)
  //           .then((result) => {
  //               const user = result.user;
  //               this.setState({
  //                   user
  //               });
  //           });
  //   }
    // }
  //LOGIN AND LOGOUT BUTTONS/FUNCTIONS//


    // handleSubmit(e) {
    //   e.preventDefault();
    //   const itemsRef = firebase.database().ref('items'); //spot in database to store items//
    //
    //   //grab what the user typed in//
    //   const item = {
    //     title: this.state.currentItem,
    //     user: this.state.user.displayName || this.state.user.email
    //   }
    //   //grab what the user typed in//
    //
    //
    //   //sends copy of object to Firebase so it can be stored//
    //   itemsRef.push(item);
    //   this.setState({
    //     currentItem: '', //clears out inputs
    //     username: '' //clears out inputs
    //   });
    //    //sends copy of object to Firebase so it can be stored//
    // }
  componentDidMount() {

    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=mass-shootings-in-america&facet=city&facet=state&facet=shooter_sex&facet=shooter_race&facet=type_of_gun_general&facet=fate_of_shooter_at_the_scene&facet=shooter_s_cause_of_death&facet=school_related&facet=place_type&facet=relationship_to_incident_location&facet=targeted_victim_s_general&facet=possible_motive_general&facet=history_of_mental_illness_general&facet=military_experience`)
    .then(res => {
      const datas = res.data;
      this.setState({ datas });
    })
    //Keeps you signed in when you refresh the page//
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });

    //Keeps you signed in when you refresh the page//

    const itemsRef = firebase.database().ref('items');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  render() {


      let myArray = this.state.items.reverse();
      console.log('myArray: ', myArray)

      let {user, currentItem} = this.state;
    
    return (

      <div className='app'>
          <Navbar user={user}/>
        {this.state.user ?
      <div>
        <div className= 'user-profile'>
        <img src = {this.state.user.photoURL} />
        </div>
          <Grid container justify="center">
            <Grid item xs={4}>
                {console.log('userrrrr:', user.email)}
              <TrainingForm user={user} item={currentItem}/>
            </Grid>
            <Grid item xs={8}>
              <CardContainer user={user} array={myArray}/>
            </Grid>
          </Grid>
        </div>
        :
        <div className='wrapper'>
        <p> You must be logged in to see these tasks and submit to it.</p>
        </div>
        }
      </div>
    );
  }
}

export default App;