# BCM Crisis Simulator v1.0

## Scenario Data Schema

### Root Structure

```json
{
  "scenarioId": "ransomware_v1",
  "title": "Ransomware Crisis Simulation",
  "version": "1.0",
  "description": "",
  "acts": []
}
```

---

## Act Structure

```json
{
  "id": "act1",
  "name": "Detection",
  "maxChoices": 4,
  "status": "draft",
  "questions": []
}
```

---

## Question Structure

```json
{
  "id": "q1",
  "type": "investigation",
  "title": "How many users received the email?",
  "result": "Thirty-five users received the phishing email.",

  "score": {
    "detection": 5
  },

  "children": []
}
```

---

## Score Structure

```json
{
  "business": 0,
  "reputation": 0,

  "detection": 0,
  "response": 0,
  "mitigation": 0,
  "reporting": 0,
  "recovery": 0,
  "remediation": 0,
  "lessons": 0
}
```

---

## Question Types

```text
investigation
decision
action
review
```

---

## Children

Used for:

* Follow-up Investigation
* Follow-up Question
* Follow-up Decision

Example:

Q1
↓
Q1A
↓
Q1B

```json
{
  "children": []
}
```

---

## Unlock

Reserved for future versions.

Used for:

* Special Actions
* Unique Capabilities
* Hidden Options

Example:

```json
{
  "unlock": [
    "block_c2"
  ]
}
```

---

## Act 1 Example

```text
Act1
└─ Q1
    ├─ Q1A
    └─ Q1B
         └─ Identify Infected Hosts
```

---

## Capability Metrics

DRMRRRL

* Detection
* Response
* Mitigation
* Reporting
* Recovery
* Remediation
* Lessons Learned

---

## Business Metrics

* Business Health
* Reputation

---

## Current Version

Schema Version: 1.0

Status: Draft

Last Updated: June 2026

```
```
