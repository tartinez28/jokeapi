import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import mostrarLogin from "./login.js";

export default function mostrarRegistro() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="form-container">
      <h2>Crear Cuenta</h2>

      <input id="regEmail" type="email" placeholder="Correo electrónico" />
      <input id="regPass" type="password" placeholder="Contraseña" />
      <input id="regPass2" type="password" placeholder="Repetir contraseña" />

      <button id="btnRegistrar">Registrarme</button>

      <small>¿Ya tienes cuenta?
        <a id="goLogin">Iniciar sesión</a>
      </small>
    </div>
  `;

  document.getElementById("goLogin").onclick = mostrarLogin;

  document.getElementById("btnRegistrar").onclick = async () => {
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPass").value;
    const pass2 = document.getElementById("regPass2").value;

    if (pass !== pass2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      alert("Usuario registrado con éxito ✔");
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };
}
