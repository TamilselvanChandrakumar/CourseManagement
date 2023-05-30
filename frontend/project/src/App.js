import './App.css';
import Addtasklist from './components/Addtasklist';
import Navbar from './components/Navbar';
import Container from '../node_modules/react-bootstrap/esm/Container'
import Tasklists from './components/Tasklists';

function App() {
  return (
    <Container>

       <Navbar/>
      <Addtasklist/>
      <Tasklists/>
    </Container>
     
  );
}

export default App;
