import { Link } from 'react-router-dom'
import ProductoImagen from './ProductoImagen'

function ProductoCard({ producto, onAgregar }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm producto-card">
        <Link to={`/producto/${producto.id}`}>
          <ProductoImagen id={producto.id} className="card-img-top producto-img" />
        </Link>
        <div className="card-body d-flex flex-column">
          <h3 className="h6">
            <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark">
              {producto.nombre}
            </Link>
          </h3>
          <p className="text-primary fw-bold mb-3">
            ${producto.precio.toLocaleString('es-CL')}
          </p>
          <button
            className="btn btn-primary mt-auto"
            onClick={() => onAgregar(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductoCard
