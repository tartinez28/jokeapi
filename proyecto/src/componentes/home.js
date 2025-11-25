export default async function mostrarHome() {

  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
    <h2 style="text-align:center; margin-top:20px;">Loading jokes... 😂</h2>
  `;

  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single&amount=10");
    const data = await response.json();
    const chistes = data.jokes;

    appContainer.innerHTML = "";

    const grid = document.createElement("div");
    grid.classList.add("grid-chistes");

    chistes.forEach((joke) => {

      const card = document.createElement("div");
      card.classList.add("chiste-card");

      card.innerHTML = `
        <img class="chiste-icon" 
             src="https://cdn-icons-png.flaticon.com/512/742/742751.png"
             alt="icon">

        <div class="chiste-info">
            <span class="tag">${joke.category}</span>

            <p><strong>Joke:</strong> ${joke.joke}</p>
            <p><strong>Type:</strong> ${joke.type}</p>
            <p><strong>Safe:</strong> ${joke.safe}</p>
        </div>
      `;

      grid.appendChild(card);
    });

    appContainer.appendChild(grid);

  } catch (error) {
    console.error("Error loading data:", error);
    appContainer.innerHTML = "<p>Error loading jokes 😢</p>";
  }
}