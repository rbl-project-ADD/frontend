import { Routes, Route } from "react-router-dom";
import Home from "@/app/routes/Home";
import Layout from "./app/Layout";
import About from "./app/routes/About";
function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="about" element={<About />} /> 
        </Route>
        <Route path="*" element={<h1>Mat aa bhai idhar</h1>} />
      </Routes>
    </>
  )
}

export default App
