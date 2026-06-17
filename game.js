console.log("GAME.JS LOADED");

async function loadScenario() {

    console.log("START BUTTON CLICKED");

    try {

        const response = await fetch(
            "./scenarios/ransomware_v1.json"
        );

        const scenario = await response.json();

        console.log(scenario);

        const gameArea =
            document.getElementById("gameArea");

        gameArea.innerHTML = `
            <h2>${scenario.title}</h2>

            <p>
                ${scenario.description}
            </p>

            <p>
                Number of Acts:
                ${scenario.acts.length}
            </p>
        `;

    }
    catch (error) {

        console.error(error);

        document.getElementById(
            "gameArea"
        ).innerHTML = `
            <h2>ERROR</h2>
            <p>${error}</p>
        `;
    }
}

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        loadScenario
    );
