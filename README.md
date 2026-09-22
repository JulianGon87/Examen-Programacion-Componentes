# Examen Programación de Componentes - Julián González

Tienda en React: catálogo de productos, carrito, checkout con cuenta de usuario.

**Demo:** https://examen-julian-gonzalez.netlify.app/

### Cómo correrlo

```
npm install
```

Crear un archivo `.env` en la raíz con las credenciales de Firebase (ver `.env.example`), luego:

```
npm run dev
```

## Flujo

1. **Catálogo** (`/`) - lista de productos con imagen (Firebase Storage), público.
2. **Detalle de producto** (`/producto/:id`) - ruta con parámetro, público.
3. Agregar al carrito no requiere sesión.
4. **Checkout** (`/checkout`) - si no hay sesión, pide iniciar sesión antes de continuar. Con sesión, muestra el resumen del carrito y el formulario de despacho (validado), y guarda el pedido en Firestore.
5. **Login/registro** (`/login`) - Firebase Auth con correo y contraseña.

## Dónde está cada contenido del examen

- **Componentes padre/hijo, props, callbacks, state**: `src/App.jsx` (clase, dueño del carrito) y `src/components/ProductoCard.jsx`.
- **Ciclo de vida**: `componentDidMount`/`componentWillUnmount` en `App.jsx` (suscripción a Firebase Auth).
- **Formulario y validaciones**: `src/pages/Checkout.jsx` con `simple-react-validator`.
- **Enrutamiento con y sin params**: `src/App.jsx` (`react-router-dom`), `/producto/:id` usa param.
- **Firebase Auth**: `src/pages/Login.jsx`.
- **Firebase Database (Firestore)**: pedidos guardados en `src/pages/Checkout.jsx`.
- **Firebase Storage**: imágenes de producto, `src/components/ProductoImagen.jsx`.
- **Bootstrap**: estilos en todas las páginas (`src/main.jsx` importa `bootstrap/dist/css/bootstrap.min.css`).

## APK (Ejercicio 3)

El proyecto se empaqueta con Cordova en `cordova-app/`. Requiere Android Studio (SDK) instalado y Java 17-21.

```
npm run build
rm -rf cordova-app/www/*
cp -r dist/* cordova-app/www/
cd cordova-app
npx cordova build android
```

El APK debug queda en `cordova-app/platforms/android/app/build/outputs/apk/debug/app-debug.apk`, listo para instalar y probar.

Para el release firmado ya hay una keystore generada.

```
cd cordova-app/platforms/android
gradle assembleRelease
cd ..
"$ANDROID_HOME/build-tools/<version>/zipalign" -v -p 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk TiendaApp-release-aligned.apk
"$ANDROID_HOME/build-tools/<version>/apksigner" sign --ks tienda-release.keystore --ks-key-alias tienda --out TiendaApp-release-signed.apk TiendaApp-release-aligned.apk
```

Probado instalando con `adb install -r TiendaApp-release-signed.apk` en el emulador Pixel_10: catálogo, imágenes de Storage y navegación funcionan igual que en la web.

Nota: el router usa `HashRouter` (no `BrowserRouter`) para que funcione bien cargado desde archivos locales dentro del WebView de Cordova.
