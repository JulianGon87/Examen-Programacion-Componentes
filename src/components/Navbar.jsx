import { Link } from 'react-router-dom'

function Navbar({ user, cartCount, onLogout }) {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Tienda
        </Link>
        <div className="d-flex align-items-center gap-3">
          <Link to="/checkout" className="btn btn-outline-light btn-sm position-relative">
            Carrito
            {cartCount > 0 && (
              <span className="badge bg-primary ms-1">{cartCount}</span>
            )}
          </Link>
          {user ? (
            <div className="d-flex align-items-center gap-2">
              <span className="text-light small">{user.email}</span>
              <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-light btn-sm">
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
