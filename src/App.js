import React, {Component} from 'react';
import SignIn_SignUp from './page/signin_signup/SignIn_SignUp.component';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import HomePage from './page/home/HomePage.component';
import Header from './components/header/Header.component';
import {auth, createUserProfile} from './firebase/Firebase.utils';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : null
    }
  }

unsubscribe = null;
unsubscribe_snap = null;

componentDidMount(){
  this.unsubscribe = auth.onAuthStateChanged(async userAuth => {
    if(userAuth)
    {
      this.props.history.push('/home');
      const userRef = await createUserProfile(userAuth);
      this.unsubscribe_snap = userRef.onSnapshot(snapshot =>{
        this.setState({
          currentUser : {
            id : snapshot.id,
          ...snapshot.data()
        }})
      })
    }
    else{
      this.setState({currentUser : userAuth})
    }
  });
}

componentWillUnmount(){
  this.unsubscribe();
  this.unsubscribe_snap();
}

  render(){
    return(
      <div>
        <Header currentUser = {this.state.currentUser} bingos = {!this.state.currentUser ? null : this.state.currentUser.bingos}/>
        <Switch>
          <Route exact path = "/" component = {SignIn_SignUp}/>
          <Route exact path = "/home" component = {HomePage}/>
        </Switch>
      </div>
      )
  }
}


export default withRouter(App);
