let scenario;

let currentAct = 0;
let choicesUsed = 0;

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

async function loadScenario() {

    const response =
        await fetch("scenarios/ransomware_v1.json");

    scenario =
        await response.json();

    renderAct();

}

function clampMetrics() {

    Object.keys(gameState).forEach(key => {

        gameState[key] =
            Math.max(
                0,
                Math.min(100, gameState[key])
            );

    });

}

function applyEffects(effects) {

    if (!effects) return;

    Object.keys(effects).forEach(key => {

        if (gameState[key] !== undefined) {

            gameState[key] += effects[key];

        }

    });

    clampMetrics();

}

function renderAct() {

    const status =
        document.getElementById("status");

    const content =
        document.getElementById("content");

    content.innerHTML = "";

    if (currentAct >= scenario.acts.length) {

        showFinalReport();
        return;

    }

    const act =
        scenario.acts[currentAct];

    status.innerHTML = `
        <div class="card">
            <strong>Act:</strong> ${act.title}<br>
            <strong>Choices Used:</strong>
            ${choicesUsed}/${act.maxChoices}
        </div>
    `;

    act.nodes.forEach(node => {

        const card =
            document.createElement("div");

        card.className = "card";

        const title =
            document.createElement("h3");

        title.textContent = node.title;

        card.appendChild(title);

        if (node.type === "investigation") {

            const btn =
                document.createElement("button");

            btn.textContent = "Investigate";

            btn.onclick = () => {

                if (
                    choicesUsed >=
                    act.maxChoices
                ) return;

                choicesUsed++;

                const result =
                    document.createElement("div");

                result.className =
                    "result";

                result.textContent =
                    node.result;

                btn.disabled = true;

                card.appendChild(result);

                updateStatus();

                checkActComplete();

            };

            card.appendChild(btn);

        }

        if (node.type === "decision") {

            node.options.forEach(option => {

                const btn =
                    document.createElement("button");

                btn.textContent =
                    option.text;

                btn.onclick = () => {

                    if (
                        choicesUsed >=
                        act.maxChoices
                    ) return;

                    applyEffects(
                        option.effects
                    );

                    choicesUsed++;

                    card.querySelectorAll(
                        "button"
                    ).forEach(
                        b => b.disabled = true
                    );

                    const result =
                        document.createElement(
                            "div"
                        );

                    result.className =
                        "result";

                    result.textContent =
                        `Selected: ${option.text}`;

                    card.appendChild(
                        result
                    );

                    updateStatus();

                    checkActComplete();

                };

                card.appendChild(btn);

            });

        }

        content.appendChild(card);

    });

}

function updateStatus() {

    const act =
        scenario.acts[currentAct];

    document.getElementById(
        "status"
    ).innerHTML = `
        <div class="card">
            <strong>Act:</strong>
            ${act.title}<br>

            <strong>Choices Used:</strong>
            ${choicesUsed}/${act.maxChoices}
        </div>
    `;

}

function checkActComplete() {

    const act =
        scenario.acts[currentAct];

    if (
        choicesUsed <
        act.maxChoices
    )
        return;

    const content =
        document.getElementById(
            "content"
        );

    const next =
        document.createElement("div");

    next.className =
        "card";

    next.innerHTML = `
        <h3>Act Complete</h3>

        <button id="nextActBtn">
            Next Act
        </button>
    `;

    content.appendChild(next);

    document
        .getElementById(
            "nextActBtn"
        )
        .onclick = () => {

            currentAct++;
            choicesUsed = 0;

            renderAct();

        };

}

function getRating() {

    if (
        gameState.business >= 85 &&
        gameState.reputation >= 85
    ) {
        return "Cyber Hero";
    }

    if (
        gameState.business >= 70 &&
        gameState.reputation >= 70
    ) {
        return "Balanced Responder";
    }

    if (
        gameState.business >= 50 &&
        gameState.reputation >= 50
    ) {
        return "Struggling Organization";
    }

    return "Organization Collapse";

}

function showFinalReport() {

    document.getElementById(
        "status"
    ).innerHTML = "";

    document.getElementById(
        "content"
    ).innerHTML = `
        <div class="card report">

            <h2>
                Executive Incident Report
            </h2>

            <p>
                Business Health:
                ${gameState.business}
            </p>

            <p>
                Reputation:
                ${gameState.reputation}
            </p>

            <hr>

            <p>
                Detection:
                ${gameState.detection}
            </p>

            <p>
                Response:
                ${gameState.response}
            </p>

            <p>
                Mitigation:
                ${gameState.mitigation}
            </p>

            <p>
                Reporting:
                ${gameState.reporting}
            </p>

            <p>
                Recovery:
                ${gameState.recovery}
            </p>

            <p>
                Remediation:
                ${gameState.remediation}
            </p>

            <p>
                Lessons Learned:
                ${gameState.lessonsLearned}
            </p>

            <hr>

            <h3>
                Final Rating:
                ${getRating()}
            </h3>

        </div>
    `;

}

loadScenario();
