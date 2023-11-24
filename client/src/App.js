import Register from "./Register/Register";
import Homepage from "./homepage";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} ></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
