import React, { Component } from 'react';
import logo from './monkey.png';
import './App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Subforum from './Subforum.jsx';
import Subforums from './Subforums.jsx';
import Data from './Data.js';
import Thread from './Thread.jsx';
import Error from './Error';
 

const Hot = () => (
  <div>
    <Homepage/>
  </div>
);

const Top = ({ match }) => (
  <div> 
    <h1>Top</h1>
    <Homepage/>
  </div>
);

const New = () => (
  <div>
    <h1>New</h1>
    <Homepage/>
  </div>
);

const MessagePage = () => (
  <div>
    <h1>Messages</h1>
  </div>
);

const cookies = new Cookies();

class App extends Component {
  constructor(props){
    super(props);
   (cookies.get('username') !== "undefined") ? this.state = {loggedIn : true} : this.state = {loggedIn : false};
    beginSession = beginSession.bind(this);
    endSession = endSession.bind(this);
  }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Team Bobo Forum</h1>
        </header>
        <FilterButtons/>
        <RouteDirectory/>
      </div>
    );
  }
}

function LoginPage(props){
  if(cookies.get('username') !== "undefined"){
    return(
      <div>
        <h1>Hello {cookies.get('username')}</h1>
        <button onClick = {endSession}>Press to Logout</button>
      </div>
    );
  }
  else{
    return(
      <button onClick = {beginSession}>Press to Login</button>
    );
  }
}

function beginSession(){
  cookies.set('username', 'madimin', { path: '/' });
  this.setState({loggedIn : true});
}

function endSession(){
  cookies.set('username', undefined, { path: '/' });
  this.setState({loggedIn : false});
}

function RouteDirectory(){
  if(cookies.get('username') !== "undefined"){
    return(
      <div>
            <Switch>
              <Route exact path="/" component={Hot}/>
              <Route exact path="/top" component={Top}/>
              <Route exact path="/new" component={New}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path='/messages' component = {MessagePage}/>
              <Route exact path="/s" component={Subforums}/>
              <Route exact path="/s/:name" component={Subforum}/>
              <Route exact path="/s/:name/:id" component={Thread}/>
              <Route path="" component={Error}/>
            </Switch>
          </div>
    );
}
else{
  return(
    <div>
      <Switch>
        <Route exact path="/login" component={LoginPage}/>
        <Route path="" render={() => (
            <Redirect to="/login"/>)}/>
      </Switch>
    </div>
    );
  }
}

 

function Homepage(props){
  const homepage = (
  <div className = "Homepage">
    <h1> Homepage </h1>
    <SubforumList subforums = {Data.subforumData}/>
  </div>
  );

  return homepage;
}


function SubforumList(props) {
  const subforums = props.subforums;
  const listItems = subforums.map((subforum) =>
  
    <table>
      <caption>{subforum.name}</caption>
      <tbody>
        <ThreadList threads = {subforum.threads}/>
        </tbody>
      </table>
  

  );
  return listItems;
}

function ThreadList(props) {
  const threads = props.threads;
  const listItems = threads.map((thread) =>
    <tr>
      <td>{thread.title}</td>
    </tr>

  );
  return listItems;
}

function FilterButtons(props){
  return (
    <div className = "Filter-buttons">
      <button><Link to="/">Hot</Link></button>
      <button><Link to="/top">Top</Link></button>
      <button><Link to="/new">New</Link></button>
    </div>
  );
}

export default App;
