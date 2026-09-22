import { useState, useEffect } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'

function ProductoImagen({ id, className }) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    let activo = true
    getDownloadURL(ref(storage, `productos/${id}.png`))
      .then((u) => activo && setUrl(u))
      .catch(() => {})
    return () => {
      activo = false
    }
  }, [id])

  if (!url) {
    return <div className={`bg-light ${className}`} />
  }

  return <img src={url} alt="" className={className} />
}

export default ProductoImagen
