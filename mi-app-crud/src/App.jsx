import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ListaUsuarios from "./components/ListaUsuarios";
import FormularioUsuario from "./components/FormularioUsuario";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Ana García", correo: "ana@email.com" },
    { id: 2, nombre: "Carlos López", correo: "carlos@email.com" },
  ]);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ListaUsuarios usuarios={usuarios} setUsuarios={setUsuarios} />}
          />
          <Route
            path="/crear"
            element={<FormularioUsuario usuarios={usuarios} setUsuarios={setUsuarios} />}
          />
          <Route
            path="/editar/:id"
            element={<FormularioUsuario usuarios={usuarios} setUsuarios={setUsuarios} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;