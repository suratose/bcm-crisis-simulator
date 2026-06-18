# Scenario JSON Schema v1.0

This document describes the structure of a scenario JSON file used by BCM Crisis Simulator.

---

## Top-Level Object

```json
{
  "id":       "ransomware_v1",
  "title":    "Operation Dark Monday",
  "subtitle": "Ransomware Crisis — Tabletop Exercise",
  "version":  "1.0",
  "acts":     [ ...Act ]
}
```

| Field    | Type   | Description                        |
|----------|--------|------------------------------------|
| id       | string | Unique identifier for the scenario |
| title    | string | Display title                      |
| subtitle | string | Subtitle shown in report           |
| version  | string | Schema version                     |
| acts     | array  | Ordered list of Act objects        |

---

## Act Object

```json
{
  "id":         1,
  "label":      "Act 1 — Detection",
  "title":      "Something is wrong",
  "brief":      "Description shown to player at start of act.",
  "ticker":     "Urgency message shown in yellow alert bar.",
  "maxChoices": 4,
  "nodes":      [ ...Node ]
}
```

| Field      | Type    | Description                                   |
|------------|---------|-----------------------------------------------|
| id         | number  | Act number (display only)                     |
| label      | string  | Short label shown in HUD                      |
| title      | string  | Act heading                                   |
| brief      | string  | Situation briefing paragraph                  |
| ticker     | string  | Urgency ticker message                        |
| maxChoices | number  | Number of choices before act ends             |
| nodes      | array   | List of Node objects (investigation/decision) |

---

## Node Object — Investigation

```json
{
  "id":     "a1n1",
  "type":   "investigation",
  "title":  "Check the SOC alert details",
  "result": "Finding revealed to player after clicking Investigate.",
  "scores": { "detection": 5 },
  "children": [ ...ChildNode ]
}
```

| Field    | Type   | Description                                              |
|----------|--------|----------------------------------------------------------|
| id       | string | Unique node ID (format: `a{act}n{num}`)                  |
| type     | string | `"investigation"`                                        |
| title    | string | Node header shown to player                              |
| result   | string | Finding text revealed after investigation                |
| scores   | object | Score adjustments applied on investigation (see Scores)  |
| children | array  | Optional follow-up investigation nodes                   |

### Child Node

```json
{
  "id":     "a1c1",
  "title":  "Identify patient zero",
  "result": "Finding text.",
  "scores": { "detection": 3 }
}
```

Children use the same `id`, `title`, `result`, `scores` fields. No nested children.

---

## Node Object — Decision

```json
{
  "id":      "a1n3",
  "type":    "decision",
  "title":   "Isolate affected network segment?",
  "options": [ ...Option ]
}
```

| Field   | Type   | Description                          |
|---------|--------|--------------------------------------|
| id      | string | Unique node ID                       |
| type    | string | `"decision"`                         |
| title   | string | Decision question shown to player    |
| options | array  | Exactly 2 options (Yes/No or A/B)    |

### Option Object

```json
{
  "text":     "Yes — isolate immediately",
  "scores":   { "detection": 15, "response": 10 },
  "metrics":  { "business": -5 },
  "feedback": "Feedback paragraph shown after selection."
}
```

| Field    | Type   | Description                                        |
|----------|--------|----------------------------------------------------|
| text     | string | Button label shown to player                       |
| scores   | object | Score adjustments applied on selection (see below) |
| metrics  | object | Executive metric adjustments (business/reputation) |
| feedback | string | Consequence text shown after selection             |

---

## Scores Object

All score fields are optional. Positive values increase the score; negative values decrease it. Scores are clamped to 0–100.

```json
{
  "detection":     5,
  "response":      10,
  "mitigation":    0,
  "reporting":    -5,
  "recovery":      0,
  "remediation":   0,
  "lessonsLearned": 0
}
```

---

## Metrics Object

```json
{
  "business":   -10,
  "reputation":  5
}
```

Both start at 100. Adjusted by decision outcomes. Clamped to 0–100. Hidden during gameplay, revealed in Executive Report.

---

## Rating Thresholds

| Rating                  | Business | Reputation |
|------------------------|----------|------------|
| Cyber Hero             | ≥ 85     | ≥ 85       |
| Balanced Responder     | ≥ 70     | ≥ 70       |
| Struggling Organisation | ≥ 50    | ≥ 50       |
| Organisation Collapse  | < 50     | or < 50    |
