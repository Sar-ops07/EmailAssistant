import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import History from "./pages/History";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/history" element={<History />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
