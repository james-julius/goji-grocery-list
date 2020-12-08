import './App.scss';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import List from './pages/List/List';
import AddItem from './pages/AddItem/AddItem';

function App() {
  return (
    <div id="App">
      <Router>
        <Nav />
        <Route exact path="/" component={List} />
        <Route path="/add-item" component={AddItem} />
      </Router>
    </div>
  );
}

export default App;
