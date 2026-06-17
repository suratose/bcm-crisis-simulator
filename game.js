console.log("GAME.JS LOADED");

async function loadScenario() {

    try {

        const response = await fetch(
            "./scenarios/ransomware_v1.json"
        );

        const scenario =
            await response.json();

        const gameArea =
            document.getElementById(
                "gameArea"
            );

        const firstAct =
            scenario.acts[0];

        const firstQuestion =
            firstAct.questions[0];

        gameArea.innerHTML = `
            <h2>${scenario.title}</h2>

            <p>${scenario.description}</p>

            <hr>

            <h3>${firstAct.name}</h3>

            <div id="questionTree"></div>
        `;

        const treeContainer =
            document.getElementById(
                "questionTree"
            );

        renderQuestion(
            firstQuestion,
            treeContainer
        );

    }
    catch(error) {

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

function renderQuestion(
    node,
    container
) {

    const block =
        document.createElement(
            "div"
        );

    block.style.margin =
        "20px 0";

    block.innerHTML = `
        <h4>${node.title}</h4>

        <button>
            Investigate
        </button>

        <div class="result"></div>
    `;

    container.appendChild(
        block
    );

    const button =
        block.querySelector(
            "button"
        );

    const resultDiv =
        block.querySelector(
            ".result"
        );

    button.addEventListener(
        "click",
        () => {

            button.disabled = true;

            let scoreHtml = "";

            if(node.score){

                scoreHtml =
                    "<pre>" +
                    JSON.stringify(
                        node.score,
                        null,
                        2
                    ) +
                    "</pre>";
            }

            resultDiv.innerHTML = `
                <p>
                    ${node.result}
                </p>

                ${scoreHtml}
            `;

            if(node.children){

                node.children.forEach(
                    child => {

                        renderQuestion(
                            child,
                            resultDiv
                        );

                    }
                );

            }

        }
    );
}

document
    .getElementById(
        "startBtn"
    )
    .addEventListener(
        "click",
        loadScenario
    );
