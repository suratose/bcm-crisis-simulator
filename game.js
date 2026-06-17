console.log("GAME.JS LOADED");

const gameState = {

    business: 100,
    reputation: 100,

    detection: 0,
    response: 0,
    mitigation: 0,
    reporting: 0,
    recovery: 0,
    remediation: 0,
    lessonsLearned: 0

};

let actChoiceCount = 0;
let maxChoices = 0;

function resetGame() {

    actChoiceCount = 0;

    gameState.business = 100;
    gameState.reputation = 100;

    gameState.detection = 0;
    gameState.response = 0;
    gameState.mitigation = 0;
    gameState.reporting = 0;
    gameState.recovery = 0;
    gameState.remediation = 0;
    gameState.lessonsLearned = 0;
}

async function loadScenario() {

    resetGame();

    document
        .getElementById(
            "startBtn"
        )
        .disabled = true;

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

        maxChoices =
            firstAct.maxChoices;

        const firstQuestion =
            firstAct.questions[0];

        gameArea.innerHTML = `

            <div id="scoreBoard">

                <h2>
                    Executive Dashboard
                </h2>

                <p>
                    Choices Used:
                    <span id="choiceCount">
                        0
                    </span>
                    /
                    <span id="choiceMax">
                        0
                    </span>
                </p>

                <hr>

                <p>
                    Business Health:
                    <span id="businessScore">
                        100
                    </span>
                </p>

                <p>
                    Reputation:
                    <span id="reputationScore">
                        100
                    </span>
                </p>

                <hr>

                <p>
                    Detection:
                    <span id="detectionScore">
                        0
                    </span>
                </p>

                <p>
                    Response:
                    <span id="responseScore">
                        0
                    </span>
                </p>

                <p>
                    Mitigation:
                    <span id="mitigationScore">
                        0
                    </span>
                </p>

                <p>
                    Reporting:
                    <span id="reportingScore">
                        0
                    </span>
                </p>

                <p>
                    Recovery:
                    <span id="recoveryScore">
                        0
                    </span>
                </p>

                <p>
                    Remediation:
                    <span id="remediationScore">
                        0
                    </span>
                </p>

                <p>
                    Lessons Learned:
                    <span id="lessonsLearnedScore">
                        0
                    </span>
                </p>

            </div>

            <hr>

            <h2>
                ${scenario.title}
            </h2>

            <p>
                ${scenario.description}
            </p>

            <hr>

            <h3>
                ${firstAct.name}
            </h3>

            <div id="questionTree"></div>

        `;

        updateScoreBoard();

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

function updateScoreBoard() {

    document.getElementById(
        "businessScore"
    ).textContent =
        gameState.business;

    document.getElementById(
        "reputationScore"
    ).textContent =
        gameState.reputation;

    document.getElementById(
        "detectionScore"
    ).textContent =
        gameState.detection;

    document.getElementById(
        "responseScore"
    ).textContent =
        gameState.response;

    document.getElementById(
        "mitigationScore"
    ).textContent =
        gameState.mitigation;

    document.getElementById(
        "reportingScore"
    ).textContent =
        gameState.reporting;

    document.getElementById(
        "recoveryScore"
    ).textContent =
        gameState.recovery;

    document.getElementById(
        "remediationScore"
    ).textContent =
        gameState.remediation;

    document.getElementById(
        "lessonsLearnedScore"
    ).textContent =
        gameState.lessonsLearned;

    document.getElementById(
        "choiceCount"
    ).textContent =
        actChoiceCount;

    document.getElementById(
        "choiceMax"
    ).textContent =
        maxChoices;
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
        <h4>
            ${node.title}
        </h4>

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

            actChoiceCount++;

            if(node.score){

                gameState.detection +=
                    node.score.detection || 0;

                gameState.response +=
                    node.score.response || 0;

                gameState.mitigation +=
                    node.score.mitigation || 0;

                gameState.reporting +=
                    node.score.reporting || 0;

                gameState.recovery +=
                    node.score.recovery || 0;

                gameState.remediation +=
                    node.score.remediation || 0;

                gameState.lessonsLearned +=
                    node.score.lessonsLearned || 0;

                gameState.business +=
                    node.score.business || 0;

                gameState.reputation +=
                    node.score.reputation || 0;
            }

            updateScoreBoard();

            resultDiv.innerHTML = `
                <p>
                    ${node.result}
                </p>
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

            if (
                actChoiceCount >=
                maxChoices
            ) {

                document
                    .querySelectorAll(
                        "#questionTree button"
                    )
                    .forEach(btn => {

                        btn.disabled = true;

                    });

                const notice =
                    document.createElement(
                        "div"
                    );

                notice.innerHTML = `
                    <hr>

                    <h3>
                        Act Complete
                    </h3>

                    <p>
                        Maximum investigations reached.
                    </p>

                    <p>
                        Proceed to the next phase.
                    </p>
                `;

                document
                    .getElementById(
                        "questionTree"
                    )
                    .appendChild(
                        notice
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
