import { Link } from "react-router-dom";

function ListaUsuarios({ usuarios, setUsuarios }) {
    const eliminarUsuario = (id) => {
        if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
            setUsuarios(usuarios.filter((u) => u.id !== id));
        }
    };

    return (
        <>
            <div className="header">
                <h1>Gestión de Usuarios</h1>
                <Link to="/crear" className="btn">Crear Usuario</Link>
            </div>

            <ul className="lista">
                {usuarios.length === 0 ? (
                    <p className="vacio">No hay usuarios registrados.</p>
                ) : (
                    usuarios.map((u) => (
                        <li key={u.id} className="item">
                            <div>
                                <strong>{u.nombre}</strong>
                                <br />
                                <small>{u.correo}</small>
                            </div>
                            <div className="acciones">
                                <Link to={`/editar/${u.id}`} className="btn small">Editar</Link>
                                <button className="btn small danger" onClick={() => eliminarUsuario(u.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}

export default ListaUsuarios;