import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function FormularioUsuario({ usuarios, setUsuarios }) {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const usuario = usuarios.find((u) => u.id === Number(id));
            if (usuario) {
                setNombre(usuario.nombre);
                setCorreo(usuario.correo);
            }
        }
    }, [id, usuarios]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre || !correo) {
            setError("Por favor completa todos los campos.");
            return;
        }

        if (id) {
            const actualizados = usuarios.map((u) =>
                u.id === Number(id) ? { ...u, nombre, correo } : u
            );
            setUsuarios(actualizados);
        } else {
            const nuevo = { id: Date.now(), nombre, correo };
            setUsuarios([...usuarios, nuevo]);
        }

        navigate("/");
    };

    return (
        <>
            <div className="header">
                <h2>{id ? "Editar Usuario" : "Crear Usuario"}</h2>
                <Link to="/" className="btn">Volver</Link>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}

                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Ana García"
                    />
                </div>

                <div className="form-group">
                    <label>Correo</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        placeholder="Ej: ana@email.com"
                    />
                </div>

                <button type="submit" className="btn">
                    {id ? "Guardar Cambios" : "Agregar Usuario"}
                </button>
            </form>
        </>
    );
}

export default FormularioUsuario;