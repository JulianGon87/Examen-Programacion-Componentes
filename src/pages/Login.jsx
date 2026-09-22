import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase'

function Login() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (modo === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      navigate('/checkout')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container" style={{ maxWidth: '380px' }}>
      <h1 className="h3 mb-3">{modo === 'login' ? 'Iniciar sesión' : 'Registrarse'}</h1>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        {error && <div className="alert alert-danger py-2 mb-0">{error}</div>}
        <button type="submit" className="btn btn-primary">
          {modo === 'login' ? 'Entrar' : 'Crear cuenta'}
        </button>
      </form>
      <button
        className="btn btn-link ps-0 mt-2"
        onClick={() => {
          setModo(modo === 'login' ? 'registro' : 'login')
          setError('')
        }}
      >
        {modo === 'login' ? 'No tengo cuenta' : 'Ya tengo cuenta'}
      </button>
    </div>
  )
}

export default Login
