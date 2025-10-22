import React from 'react';
import { Link } from 'react-router-dom';

export default function ListaUsuarios({ usuarios, eliminarUsuario }) {
    return (
        <div className="container">
            <header className="header">
                <h1>Gestión de Usuarios</h1>
                <Link to="/crear"><button className="btn">➕ Crear Usuario</button></Link>
            </header>

            <ul className="lista">
                {usuarios.length === 0 && <li className="vacio">No hay usuarios aún.</li>}
                {usuarios.map(user => (
                    <li key={user.id} className="item">
                        <div>
                            <strong>{user.nombre}</strong><br />
                            <small>{user.correo}</small>
                        </div>
                        <div className="acciones">
                            <Link to={`/editar/${user.id}`}><button className="btn small">Editar</button></Link>
                            <button className="btn small danger" onClick={() => eliminarUsuario(user.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
