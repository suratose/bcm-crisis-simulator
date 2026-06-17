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

        const firstAct = scenario.acts[0];

        const firstQuestion =
            firstAct.questions[0];

        gameArea.innerHTML = `
            <h2>${scenario.title}</h2>

            <p>${scenario.description}</p>

            <hr>

            <h3>${firstAct.name}</h3>

            <h4>
                ${firstQuestion.title}
            </h4>

            <button id="answerBtn">
                Investigate
            </button>

            <div id="resultArea"></div>
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
