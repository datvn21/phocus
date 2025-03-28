import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import Home from "./pages/Home";
import AppLayout from "./components/Layouts/AppLayout";
import Welcome from "./pages/Welcome";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
