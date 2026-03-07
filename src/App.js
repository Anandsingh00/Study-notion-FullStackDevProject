import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"

function App() {
  return (
    <div className="w-full min-h-screen bg-richblack-900 font-inter overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
