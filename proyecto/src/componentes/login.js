import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import mostrarRegistro from "./registro.js";

export default function mostrarLogin() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="form-container">
      <h2>Iniciar Sesión</h2>

      <input id="loginEmail" type="email" placeholder="Correo electrónico" />
      <input id="loginPass" type="password" placeholder="Contraseña" />

      <button id="btnIngresar">Ingresar</button>

      <small>¿No tienes cuenta?
        <a id="goRegistro">Crear una cuenta</a>
      </small>
    </div>
  `;

  document.getElementById("goRegistro").onclick = mostrarRegistro;

  document.getElementById("btnIngresar").onclick = async () => {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;

    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };
}