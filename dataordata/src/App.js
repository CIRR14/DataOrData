import React, {Component} from 'react';
import './App.css';
import firebase, {auth} from './firebase.js';
import Navbar from './components/Navbar';
import CardContainer from "./containers/CardContainer";
import TrainingForm from "./components/TrainingForm";
import Grid from "@material-ui/core/Grid/Grid";




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
  }

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
        <img src = {this.state.user.photoURL} alt="profile pic" />
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