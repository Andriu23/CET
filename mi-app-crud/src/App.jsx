import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaUsuarios from './components/ListaUsuarios';
import FormularioUsuario from './components/FormularioUsuario';

const usuariosIniciales = [
  { id: 1, nombre: 'Ana García', correo: 'ana@email.com' },
  { id: 2, nombre: 'Carlos López', correo: 'carlos@email.com' }
];

export default function App() {
  // cargar desde localStorage si existe
  const [usuarios, setUsuarios] = useState(() => {
    try {
      const almacen = localStorage.getItem('usuarios');
      return almacen ? JSON.parse(almacen) : usuariosIniciales;
    } catch {
      return usuariosIniciales;
    }
  });

  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  // Agregar usuario
  const agregarUsuario = (usuario) => {
    const nuevo = { ...usuario, id: Date.now() };
    setUsuarios(prev => [...prev, nuevo]);
  };

  // Actualizar usuario
  const actualizarUsuario = (id, usuarioActualizado) => {
    setUsuarios(prev => prev.map(u => (u.id === id ? { ...u, ...usuarioActualizado } : u)));
  };

  // Eliminar usuario
  const eliminarUsuario = (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (!confirmar) return;
    setUsuarios(prev => prev.filter(u => u.id !== id));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaUsuarios usuarios={usuarios} eliminarUsuario={eliminarUsuario} />} />
        <Route path="/crear" element={<FormularioUsuario modo="crear" agregarUsuario={agregarUsuario} />} />
        <Route path="/editar/:id" element={<FormularioUsuario modo="editar" usuarios={usuarios} actualizarUsuario={actualizarUsuario} />} />
      </Routes>
    </BrowserRouter>
  );
}