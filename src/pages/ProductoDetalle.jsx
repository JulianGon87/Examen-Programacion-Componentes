import { useParams, Link } from 'react-router-dom'
import ProductoImagen from '../components/ProductoImagen'
import productos from '../productos'

function ProductoDetalle({ onAgregar }) {
  const { id } = useParams()
  const producto = productos.find((p) => p.id === Number(id))

  if (!producto) {
    return (
      <div className="container">
        <p>Producto no encontrado.</p>
        <Link to="/">Volver al catálogo</Link>
      </div>
    )
  }

  return (
    <div className="container">
      <Link to="/" className="d-inline-block mb-3">
        &larr; Volver al catálogo
      </Link>
      <div className="row g-4">
        <div className="col-md-5">
          <ProductoImagen id={producto.id} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-7">
          <h1 className="h3">{producto.nombre}</h1>
          <p className="fs-4 text-primary fw-bold">
            ${producto.precio.toLocaleString('es-CL')}
          </p>
          <button className="btn btn-primary" onClick={() => onAgregar(producto)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductoDetalle
