import { Component } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Navbar from './components/Navbar'
import Catalogo from './pages/Catalogo'
import ProductoDetalle from './pages/ProductoDetalle'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      cart: [],
    }
  }

  componentDidMount() {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      this.setState({ user })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  agregarProducto = (producto) => {
    this.setState({ cart: [...this.state.cart, producto] })
  }

  quitarProducto = (index) => {
    this.setState({ cart: this.state.cart.filter((_, i) => i !== index) })
  }

  vaciarCarrito = () => {
    this.setState({ cart: [] })
  }

  handleLogout = () => {
    signOut(auth)
  }

  render() {
    const { user, cart } = this.state
    const total = cart.reduce((acc, p) => acc + p.precio, 0)

    return (
      <HashRouter>
        <Navbar user={user} cartCount={cart.length} onLogout={this.handleLogout} />
        <Routes>
          <Route path="/" element={<Catalogo onAgregar={this.agregarProducto} />} />
          <Route
            path="/producto/:id"
            element={<ProductoDetalle onAgregar={this.agregarProducto} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                total={total}
                user={user}
                onQuitar={this.quitarProducto}
                onVaciarCarrito={this.vaciarCarrito}
              />
            }
          />
        </Routes>
      </HashRouter>
    )
  }
}

export default App
