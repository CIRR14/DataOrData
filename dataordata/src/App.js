import React, {Component} from 'react';
import './App.css';
import firebase, {auth} from './firebase.js';
import Navbar from './components/Navbar';
import CardContainer from "./containers/CardContainer";
import TrainingForm from "./components/TrainingForm";
import Grid from "@material-ui/core/Grid/Grid";

// import Container from 'react-grid-system';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,
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
    // logout(){
    //     auth.signOut()
    //     .then(() => {
    //       this.setState({
    //         user: null
    //       });
    //     });
    // }
    //
    // login(){
    //   auth.signInWithPopup(provider)
    //   .then((result) => {
    //     const user = result.user;
    //     this.setState({
    //       user
    //     });
    //   });
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

  //Remove item function//

  //remove item function//
  


  // collect of item function//

  // collect of item function//


  render() {


      let myArray = this.state.items.reverse();

      let {user, currentItem} = this.state;
    
    return (
      <div className='app'>
          <Navbar/>
        {this.state.user ?
      <div>
        <div className= 'user-profile'>
        <img src = {this.state.user.photoURL} />
        </div>
          <Grid container justify="center">
            <Grid item xs={4}>
                {console.log(user)}
              <TrainingForm user={user} item={currentItem}/>
            </Grid>
            <Grid item xs={8}>
              <CardContainer array={myArray}/>
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