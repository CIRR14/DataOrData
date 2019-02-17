import React, { Component } from 'react';
import './App.css';
import firebase, {auth, provider} from './firebase.js';
import axios from 'axios';



class App extends Component {

  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,

      datas: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //LOGIN AND LOGOUT BUTTONS/FUNCTIONS//
  logout(){
      auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  login(){
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }
  //LOGIN AND LOGOUT BUTTONS/FUNCTIONS//


  // async fetchData(data) {
  //   console.log("cnjfdcnfe")
  //  await this.setState({data});
  //  console.log(data)
  // }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items'); //spot in database to store items//
   
    //grab what the user typed in//
    const item = {
      title: this.state.currentItem,
      user: this.state.user.displayName || this.state.user.email
    }
    //grab what the user typed in//


    //sends copy of object to Firebase so it can be stored//
    itemsRef.push(item);
    this.setState({
      currentItem: '', //clears out inputs
      username: '' //clears out inputs
    });
     //sends copy of object to Firebase so it can be stored//
  }

  // componentWillMount(){
  //   console.log(this.state)
  //   this.fetchData();
  //   console.log(this.state)

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

  //Remove item function//
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  //remove item function//





  // collect of item function//

  // collect of item function//


  render() {

    let myArray = this.state.items.reverse();
    
    return (

      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>
                <img 
    src="logo.svg" 
    alt=""
    height="40px"
    width="40px" /> SST
              </h1>
              {this.state.user ?
                  <button onClick = {this.logout}> Log Out </button>
                  :
                  <button onClick = {this.login}> Log In </button>
              }
            </div>
        </header>
        {this.state.user ?
      <div>
        <div className= 'user-profile'>
        <img src = {this.state.user.photoURL} />
        </div>
                <div className='container'>
      
            <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="Staff Member" value={this.state.user.displayName || this.state.user.email} />
                <input type="text" name="currentItem" placeholder="Who is doing the training?" onChange={this.handleChange} value={this.state.currentItem} />
                <button>Add </button>
              </form>
            <div>

<ul>
  { this.state.data.map(dat => <li> {dat.test}</li>)}
  </ul>

              </div>

            </section>
            <section className='display-item'>
                <div className="wrapper">
                  <ul>
                    {myArray.map((item) => {
                      return (
                        <li key={item.id}>

                        <div container>
                    
                        <div row>
                          <h3> Completed by: <b>{item.title}</b></h3>
                        </div>
                          
                        <div row>
                            Supervised by: <b>{item.user}</b>
                        </div>

                        <div row>
                          <div col>
                            {item.user === this.state.user.displayName || item.user === this.state.user.email ?
                              <button className="remove" onClick={() => this.removeItem(item.id)}>Remove</button> : null}
                          </div>
                          <div col>
                              <button>See Report</button>
                          </div>
                        </div>

                              <div className="report">
                                <center><p><bold>(add timestamp)</bold></p></center>
                                <p> {item.title} (died or lived **collect boolean, if true then live, if false then die**) </p>
                                <p>{item.title} chose to (**collect to (**run/hide/fought**) and (lived/died**boolean**)</p>
                              </div>

                        </div>
                        </li>
                 
                      )
                    })}
                  </ul>
                </div>
            </section>
          </div>
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