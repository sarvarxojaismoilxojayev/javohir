import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profiles from "./Pages/Profiles";
import Error404 from "./Pages/Error404";
import Dashboard from "./Pages/Dashboard";
import CreateProfile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Experience from "./Pages/Experience";
import Education from "./Pages/Education";
import Posts from "./Pages/Posts";
import BittaPost from "./Pages/bittaPost";
import UseProfile from "./Pages/UseProfile";
function App() {
  return (
    <Routes>
      <Route to="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profile/:id" element={<UseProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/add-experience" element={<Experience />} />
        <Route path="/add-education" element={<Education />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<BittaPost />} />/
        <Route path="/*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
