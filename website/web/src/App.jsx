import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";

import Home from "./components/routes/Home";
import Store from "./components/routes/Store";
import Games from "./components/routes/Games";
import About from "./components/routes/About";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
