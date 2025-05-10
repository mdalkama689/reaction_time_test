import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ReactionGame from './pages/ReactionGame';
import Results from './pages/Results';
import { useEffect, useState } from 'react';
import MobileShare from './components/share/MobileShare';
import TabShare from './components/share/TabShare';

function App() {
    const [deviceType, setDeviceType] = useState<"big" | "small">("big");


  useEffect(() => {
    const handleResize = () => {
        setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <BrowserRouter>
        {deviceType === "small" ? <MobileShare /> : <TabShare />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="play" element={<ReactionGame />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;