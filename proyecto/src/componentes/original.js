import { db } from "../firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default function mostrarOriginal() {
  let appData = {
    nombreapp: "jokeapi",
    descripcion: "Aquí agregamos una descripción de 30 palabras",
    icono: "https://cdn-icons-png.flaticon.com/512/2584/2584606.png",
    integrantes: ["javier", "maria", "matt"],
    actividad: "Capacitor Firebase",
    url: "https://drive.google.com/file/d/1Kl97mmRESu2GWPztzK2XdMvNR68vMQ00/view?usp=drive_link"
  };

  const cont = document.getElementById("app");
  cont.innerHTML = "";

  // ------- TARJETA PREVIEW -------
  const card = document.createElement("div");
  card.className = "proyecto-card";

  const cardHTML = `
      <div class="card-icon">
        <img src="${appData.icono}" alt="icono">
      </div>

      <div class="card-info">
        <h2>${appData.nombreapp}</h2>
        <p>${appData.descripcion}</p>

        <p><strong>Actividad:</strong> ${appData.actividad}</p>
        <p><strong>Integrantes:</strong> ${appData.integrantes.join(", ")}</p>

        <a class="card-link" href="${appData.url}" target="_blank">Ver proyecto</a>
      </div>
  `;

  card.innerHTML = cardHTML;

  // ------- FORMULARIO -------
  const form = document.createElement("div");
  form.className = "form-container";

  const campos = [
    { key: "nombreapp", label: "Nombre de la App" },
    { key: "descripcion", label: "Descripción" },
    { key: "icono", label: "URL del ícono" },
    { key: "actividad", label: "Actividad" },
    { key: "url", label: "URL del proyecto" }
  ];

  campos.forEach(c => {
    const input = document.createElement("input");
    input.placeholder = c.label;
    input.value = appData[c.key];

    input.oninput = () => {
      appData[c.key] = input.value;
      actualizarCard();
    };

    form.appendChild(input);
  });

  // Integrantes
  const inputIntegrantes = document.createElement("input");
  inputIntegrantes.placeholder = "Integrantes (coma separada)";
  inputIntegrantes.value = appData.integrantes.join(", ");

  inputIntegrantes.oninput = () => {
    appData.integrantes = inputIntegrantes.value
      .split(",")
      .map(x => x.trim());
    actualizarCard();
  };

  form.appendChild(inputIntegrantes);

  // Botón Guardar
  const btn = document.createElement("button");
  btn.textContent = "Guardar en Firebase";

  btn.onclick = async () => {
    try {
      await addDoc(collection(db, "proyectos"), appData);
      alert("Proyecto guardado exitosamente 🎉");
    } catch (e) {
      console.error(e);
      alert("Error al guardar 😢");
    }
  };

  form.appendChild(btn);

  // JSON final
  const salida = document.createElement("pre");
  salida.className = "json-box";
  salida.textContent = JSON.stringify(appData, null, 2);

  function actualizarCard() {
    card.innerHTML = `
      <div class="card-icon">
        <img src="${appData.icono}">
      </div>
      <div class="card-info">
        <h2>${appData.nombreapp}</h2>
        <p>${appData.descripcion}</p>
        <p><strong>Actividad:</strong> ${appData.actividad}</p>
        <p><strong>Integrantes:</strong> ${appData.integrantes.join(", ")}</p>
        <a class="card-link" href="${appData.url}" target="_blank">Ver proyecto</a>
      </div>
    `;
    salida.textContent = JSON.stringify(appData, null, 2);
  }

  cont.appendChild(card);
  cont.appendChild(form);
  cont.appendChild(salida);
}