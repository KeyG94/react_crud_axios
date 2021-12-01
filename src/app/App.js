import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Home from "./home/Home.jsx";
import Admin from "./admin/Admin.jsx";
import Page from "./page/Page.jsx";
import EditPost from "./admin/EditPost";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/page/:id" element={<Page />} />
        <Route path="/admin/page/edit/:id" exact element={<EditPost />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
