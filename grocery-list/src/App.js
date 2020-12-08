import './App.scss';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import List from './pages/List/List';
import GroceryEntry from './pages/GroceryItem/GroceryItem';

function App() {
  return (
    <div id="App">
      <Router>
        <Nav />
        <Route exact path="/" component={List} />
        <Route path="/grocery-item/:id" component={GroceryEntry} />
      </Router>
    </div>
  );
}

export default App;
