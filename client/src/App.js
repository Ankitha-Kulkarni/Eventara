import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddEvent from "./pages/AddEvent";
import EventDetails from "./pages/EventDetails";
import EventPage from "./pages/EventPage";
import EditEvents from "./pages/EditEvent";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/edit-event/:id" element={<EditEvents />} />
      </Routes>
    </Router>
  );
}

export default App;