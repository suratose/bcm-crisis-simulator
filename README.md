# BCM Crisis Simulator v1.0

A browser-based tabletop exercise platform for practicing Business Continuity Management, Cyber Crisis Management, Incident Response, and Disaster Recovery.

## Quick Start

### GitHub Pages
1. Push all files to your repository
2. Go to **Settings → Pages → Source: main branch / root**
3. Access at `https://suratose.github.io/bcm-crisis-simulator/`

### Local Development
```bash
# Option A: Python
python -m http.server 8080

# Option B: Node
npx serve .
```
Then open `http://localhost:8080`

> ⚠️ Must run via a server — `fetch()` does not work from `file://`

---

## Project Structure

```
bcm-crisis-simulator/
├── index.html                  # Game shell (HUD, screens, containers)
├── style.css                   # All styles
├── game.js                     # Game engine (state, rendering, scoring)
├── scenarios/
│   └── ransomware_v1.json      # Scenario data (JSON-driven)
├── docs/
│   ├── design-v1.md
│   ├── project-roadmap.md
│   └── schema-v1.md
└── README.md
```

---

## Adding a New Scenario

1. Copy `scenarios/ransomware_v1.json` to `scenarios/your_scenario.json`
2. Edit the JSON — change acts, nodes, scores, and metrics
3. Update `SCENARIO_PATH` in `game.js`:
   ```js
   const SCENARIO_PATH = './scenarios/your_scenario.json';
   ```

---

## Scoring Model (Hidden During Play)

| Category        | Description                              |
|----------------|------------------------------------------|
| Detection       | Speed and accuracy of threat detection   |
| Response        | Crisis escalation and command decisions  |
| Mitigation      | BCP activation and containment actions  |
| Reporting       | Regulatory and stakeholder communication |
| Recovery        | DR execution and system restoration      |
| Remediation     | Post-incident fixes and investment       |
| Lessons Learned | After-action review completion           |

**Executive Metrics** (also hidden during play):
- **Business Health** — starts at 100, affected by decisions
- **Reputation** — starts at 100, affected by communication decisions

---

## Rating Logic

| Rating                  | Business Health | Reputation |
|------------------------|-----------------|------------|
| Cyber Hero             | ≥ 85            | ≥ 85       |
| Balanced Responder     | ≥ 70            | ≥ 70       |
| Struggling Organisation | ≥ 50           | ≥ 50       |
| Organisation Collapse  | < 50            | or < 50    |

---

## Learning Objectives

- Cyber Incident Detection
- Incident Response & Escalation
- Business Impact Analysis (BIA)
- Business Continuity Plan (BCP) Activation
- Crisis Communication & PDPA Obligations
- Disaster Recovery
- Lessons Learned & Remediation

## Target Audience

- University students (Cybersecurity / BCM courses)
- Executive tabletop exercises
- Cybersecurity awareness workshops
- BCM training programs
