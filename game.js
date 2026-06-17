console.log("GAME.JS LOADED");

async function loadScenario() {

    try {

        const response = await fetch(
            "./scenarios/ransomware_v1.json"
        );

        const scenario = await response.json();

        const gameArea =
            document.getElementById("gameArea");

        const firstAct =
            scenario.acts[0];

        const firstQuestion =
            firstAct.questions[0];

        gameArea.innerHTML = `
            <h2>${scenario.title}</h2>

            <p>${scenario.description}</p>

            <hr>

            <h3>${firstAct.name}</h3>

            <h4>${firstQuestion.title}</h4>

            <button id="answerBtn">
                Investigate
            </button>

            <div id="resultArea"></div>
        `;

        document
            .getElementById("answerBtn")
            .addEventListener(
                "click",
                () => {

                    let childHtml = "";

                    if (firstQuestion.children) {

                        firstQuestion.children.forEach(
                            child => {

                                childHtml += `
                                    <button
                                        class="childBtn"
                                        data-id="${child.id}">
                                        ${child.title}
                                    </button>
                                    <br><br>
                                `;
                            }
                        );
                    }

                    document
                        .getElementById(
                            "resultArea"
                        )
                        .innerHTML = `
                            <p>
                                ${firstQuestion.result}
                            </p>

                            <p>
                                Detection Score:
                                ${firstQuestion.score.detection}
                            </p>

                            <hr>

                            <h4>
                                Next Investigation
                            </h4>

                            ${childHtml}

                            <div id="childResult"></div>
                        `;

                    document
                        .querySelectorAll(
                            ".childBtn"
                        )
                        .forEach(btn => {

                            btn.addEventListener(
                                "click",
                                () => {

                                    const selected =
                                        firstQuestion.children.find(
                                            c =>
                                                c.id ===
                                                btn.dataset.id
                                        );

                                    document
                                        .getElementById(
                                            "childResult"
                                        )
                                        .innerHTML = `
                                            <hr>

                                            <h4>
                                                ${selected.title}
                                            </h4>

                                            <p>
                                                ${selected.result}
                                            </p>
                                        `;
                                }
                            );

                        });

                }
            );

    }
    catch (error) {

        console.error(error);

        document
            .getElementById(
                "gameArea"
            )
            .innerHTML = `
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
