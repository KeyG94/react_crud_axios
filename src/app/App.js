import { Routes, Route } from "react-router-dom";
import Home from "./home/Home.jsx";
import Admin from "./admin/Admin.jsx";
import Page from "./page/Page.jsx";
import style from "./app.css";

function App() {
  return (
    <div style={style}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/page/:id" element={<Page />} />
      </Routes>
    </div>
  );
}

export default App;
