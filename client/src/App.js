import AutoSlider from "./5category/AutoSlider/AutoSlider.js";
import Foodpage from "./5category/Foodpage/Foodpage.js";
import Homepage from "./homepage";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Foodpage" element={<Foodpage />} />
        <Route path="/AutoSlider" element={<AutoSlider />} />
        <Route path="*" element={<Navigate to="/" />} ></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
