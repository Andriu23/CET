import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function FormularioUsuario({ modo, agregarUsuario, usuarios = [], actualizarUsuario }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const idParam = id ? Number(id) : null;

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (modo === 'editar' && idParam != null) {
            const encontrado = usuarios.find(u => u.id === idParam);
            if (encontrado) {
                setNombre(encontrado.nombre);
                setCorreo(encontrado.correo);
            } else {
                // si no existe el id redirige a lista
                navigate('/');
            }
        }
    }, [modo, idParam, usuarios, navigate]);

    const validar = () => {
        if (!nombre.trim() || !correo.trim()) {
            setError('Todos los campos son obligatorios.');
            return false;
        }
        const re = /\S+@\S+\.\S+/;
        if (!re.test(correo)) {
            setError('Ingrese un correo válido.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validar()) return;

        if (modo === 'crear') {
            agregarUsuario({ nombre: nombre.trim(), correo: correo.trim() });
        } else if (modo === 'editar') {
            actualizarUsuario(idParam, { nombre: nombre.trim(), correo: correo.trim() });
        }
        navigate('/');
    };

    return (
        <div className="container">
            <header className="header">
                <h2>{modo === 'crear' ? 'Crear Usuario' : 'Editar Usuario'}</h2>
                <Link to="/"><button className="btn">← Volver</button></Link>
            </header>

            <form onSubmit={handleSubmit} className="form">
                <label>Nombre</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" />

                <label>Correo</label>
                <input value={correo} onChange={e => setCorreo(e.target.value)} placeholder="correo@ejemplo.com" />

                {error && <div className="error">{error}</div>}

                <div style={{ marginTop: 12 }}>
                    <button type="submit" className="btn">{modo === 'crear' ? 'Crear' : 'Guardar'}</button>
                </div>
            </form>
        </div>
    );
}
