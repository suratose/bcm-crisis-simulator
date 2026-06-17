async function loadScenario() {

    const response = await fetch(
        "./scenarios/ransomware_v1.json"
    );

    const scenario = await response.json();

    console.log(scenario);

    alert(
        "Scenario Loaded: " +
        scenario.title
    );
}

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        loadScenario
    );
