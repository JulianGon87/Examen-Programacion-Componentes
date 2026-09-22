import ProductoCard from '../components/ProductoCard'
import productos from '../productos'

function Catalogo({ onAgregar }) {
  return (
    <div className="container">
      <h1 className="h3 mb-4">Catálogo</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} onAgregar={onAgregar} />
        ))}
      </div>
    </div>
  )
}

export default Catalogo
