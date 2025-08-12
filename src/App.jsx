import { Routes, Route, Navigate } from ".././node_modules/react-router-dom";
import Products from "./pages/Products";
import PegeNotfound from "./pages/PageNotfound"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { ProductProvider } from "./context/userContext";
function App() {
  return (
    <>
    <ProductProvider>
      <Routes>
        <Route path="/" element={<Navigate  to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PegeNotfound />} />
      </Routes>
      </ProductProvider>
    </>
  );
}

export default App;
