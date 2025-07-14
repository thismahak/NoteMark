import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import Bookmarks from "./pages/Bookmarks";
import AddNote from "./pages/AddNote";
import EditNote from "./pages/EditNote";
import AddBookmark from "./pages/AddBookmark";
import EditBookmark from "./pages/EditBookmark";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/notes" element={<ProtectedLayout><Notes /></ProtectedLayout>} />
        <Route path="/bookmarks" element={<ProtectedLayout><Bookmarks /></ProtectedLayout>} />
        <Route path="/add-note" element={<ProtectedLayout><AddNote /></ProtectedLayout>} />
        <Route path="/edit-note/:id" element={<ProtectedLayout><EditNote /></ProtectedLayout>} />
        <Route path="/add-bookmark" element={<ProtectedLayout><AddBookmark /></ProtectedLayout>} />
        <Route path="/edit-bookmark/:id" element={<ProtectedLayout><EditBookmark /></ProtectedLayout>} />
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
