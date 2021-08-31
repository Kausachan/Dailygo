import React, {Component} from 'react';
import SignIn_SignUp from './page/signin_signup/SignIn_SignUp.component';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import HomePage from './page/home/HomePage.component';
import Header from './components/header/Header.component';
import {auth, createUserProfile} from './firebase/Firebase.utils';
import {connect} from 'react-redux';
import {setUserAction} from './redux/user/user.actions';
import Loader from 'react-loader';

class App extends Component{

unsubscribe = null;
unsubscribe_snap = null;

componentDidMount(){
  const {currentUser, setUserAction} = this.props;
  this.unsubscribe = auth.onAuthStateChanged(async userAuth => {
    if(userAuth)
    {
      this.props.history.push('/home');
      const userRef = await createUserProfile(userAuth);
      this.unsubscribe_snap = userRef.onSnapshot(snapshot =>{
        setUserAction({
            id : snapshot.id,
          ...snapshot.data()
        })
      })
    }
    else setUserAction(userAuth);
  });
}

componentWillUnmount(){
  this.unsubscribe();
  this.unsubscribe_snap();
}

  render(){
    return(
      <div>
        <Header currentUser = {this.props.currentUser} bingos = {0}/>
        {
          this.props.loader ?
          (
            <Loader loaded={false} lines={13} length={20} width={10} radius={30}
            corners={1} rotate={0} direction={1} color="#000" speed={1.5}
            trail={60} shadow={true} hwaccel={false} className="spinner"
            zIndex={2e9} top="50%" left="50%" scale={1.00}
            loadedClassName="loadedContent" />
            )
          :
          null
        }
        <Switch>
          <Route exact path = "/" component = {SignIn_SignUp}/>
          <Route exact path = "/home" component = {HomePage}/>
        </Switch>
      </div>
      )
  }
}

const mapStateToProps = ({user, loader}) =>({
  currentUser : user.currentUser,
  loader : loader.loader
})

const DispatchState = (dispatch) => ({
  setUserAction : user => dispatch(setUserAction(user))
})

export default connect(mapStateToProps, DispatchState)(withRouter(App));
