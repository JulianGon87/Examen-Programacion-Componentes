import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SimpleReactValidator from 'simple-react-validator'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Checkout({ cart, total, user, onQuitar, onVaciarCarrito }) {
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [pedidoOk, setPedidoOk] = useState(false)
  const [, forceUpdate] = useState(0)
  const validator = useRef(
    new SimpleReactValidator({
      messages: { required: 'Este campo es obligatorio.' },
    }),
  )

  if (!user) {
    return (
      <div className="container">
        <h1 className="h4">Tu carrito ({cart.length})</h1>
        <div className="alert alert-info">
          Debes iniciar sesión para completar la compra.{' '}
          <Link to="/login">Ingresar</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validator.current.allValid() || cart.length === 0) {
      validator.current.showMessages()
      forceUpdate((n) => n + 1)
      return
    }

    setEnviando(true)
    try {
      await addDoc(collection(db, 'pedidos'), {
        uid: user.uid,
        email: user.email,
        nombre,
        direccion,
        items: cart.map((p) => ({ id: p.id, nombre: p.nombre, precio: p.precio })),
        total,
        fecha: new Date().toISOString(),
      })
      setPedidoOk(true)
      onVaciarCarrito()
    } catch (error) {
      alert('No se pudo generar el pedido: ' + error.message)
    } finally {
      setEnviando(false)
    }
  }

  if (pedidoOk) {
    return (
      <div className="container">
        <div className="alert alert-success">
          ¡Pedido generado! Te contactaremos a {user.email}.
        </div>
        <Link to="/">Seguir comprando</Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container">
        <h1 className="h4">Tu carrito está vacío</h1>
        <Link to="/">Ir al catálogo</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <h1 className="h4 mb-3">Finalizar compra</h1>

      <ul className="list-group mb-3">
        {cart.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {item.nombre} - ${item.precio.toLocaleString('es-CL')}
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onQuitar(index)}
            >
              x
            </button>
          </li>
        ))}
        <li className="list-group-item d-flex justify-content-between fw-bold">
          Total <span>${total.toLocaleString('es-CL')}</span>
        </li>
      </ul>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {validator.current.message('nombre', nombre, 'required')}
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección de despacho</label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          {validator.current.message('direccion', direccion, 'required')}
        </div>
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Procesando...' : 'Confirmar pedido'}
        </button>
      </form>
    </div>
  )
}

export default Checkout
