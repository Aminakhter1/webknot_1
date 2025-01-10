
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import EventManagement from './pages/EventManagement';
import AttendeeManagement from './pages/AttendeeManagement';
import TaskTracker from './pages/TaskTracker';
import Header from './components/Header';
function App() {
  return (
    <Router>
    <div className="container-fluid">
      <Header />
      <main className="mt-4">
        <Routes>
          <Route path="/events" element={<EventManagement />} />
          <Route path="/attendees" element={<AttendeeManagement />} />
          <Route path="/tasks" element={<TaskTracker />} />
          <Route path="/" element={<h1 className="text-center">Welcome to Event Dashboard</h1>} />
        </Routes>
      </main>
    </div>
  </Router>
   
  );
}

export default App;
