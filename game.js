async function loadScenario() {

    const response =
        await fetch(
            "./scenarios/ransomware_v1.json"
        );

    const scenario =
        await response.json();

    const gameArea =
        document.getElementById(
            "gameArea"
        );

    gameArea.innerHTML = `
        <h2>${scenario.title}</h2>
        <p>${scenario.description}</p>
    `;
}

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        loadScenario
    );
