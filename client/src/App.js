
import { Button } from '@chakra-ui/react';
import './App.css';
import Home from './Pages/Home';
import {Route} from "react-router-dom"
import ChatPage from './Pages/ChatPage';
import Hello from './Pages/Hello';
import MeetingRoom from './components/Authentification/MeetingRoom';
import CardCourse from './components/Authentification/Course';
import Main from './quiz/Main';
import QuizReact from './quiz/QuizReact';
import ResultReact from './quiz/ResultReact';
import ResultNode from './quiz/ResultNode';
import QuizNode from './quiz/QuizNode';
import MainNode from './quiz/MainNode';

function App() {
  return (
    <div className="App">
      <Route path='/' component={Home} exact/>
      <Route path='/Home' component={Hello}/>
      <Route path='/MeetingRoom' component={MeetingRoom}/>
      <Route path='/Course' component={CardCourse}/>
      <Route path='/mainQuizReact' component={Main} />
      <Route path='/QuizReact' component={QuizReact}/> 
      <Route path='/ResultReact' component={ResultReact}/> 
      <Route path='/ResultNode' component={ResultNode}/> 
      <Route path='/QuizNode' component={QuizNode}/> 
      <Route path='/mainQuizNode' component={MainNode}/> 
    </div>
  );
}

export default App;
