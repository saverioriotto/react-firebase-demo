
import './App.css';
import {Routes , Route, BrowserRouter } from "react-router-dom" 
import Tasks from './components/Tasks';
import Task from './components/Task';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/task" element={<Task /> } /> 
            <Route path="/tasks" element={<Tasks /> } />      
            <Route path="/tasks/:id" element={<Tasks /> } />             
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
