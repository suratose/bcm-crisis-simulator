// ── BCM Crisis Simulator — game.js v1.0 ──────────────────────────────────────
// Scenario is embedded directly — works from file://, GitHub Pages, and any server.

const EMBEDDED_SCENARIO = {
  "id": "ransomware_v1",
  "title": "Operation Dark Monday",
  "subtitle": "Ransomware Crisis — Tabletop Exercise",
  "version": "1.0",
  "acts": [
    {
      "id": 1, "label": "Act 1 — Detection", "title": "Something is wrong",
      "brief": "It is 07:42 on a Monday morning. The IT helpdesk begins receiving calls about systems being slow or inaccessible. An alert fires in the SOC dashboard.",
      "ticker": "07:42 — Multiple users reporting encrypted files and a ransom note on screen.",
      "maxChoices": 4,
      "nodes": [
        { "id": "a1n1", "type": "investigation", "title": "Check the SOC alert details",
          "result": "The SIEM shows lateral movement starting at 02:14. Ransomware binary deployed across 43 endpoints in Finance and Operations.",
          "scores": { "detection": 5 },
          "children": [
            { "id": "a1c1", "title": "Identify patient zero", "result": "User jsmith@corp.com opened a malicious attachment at 01:58 from a spoofed CFO email.", "scores": { "detection": 5 } },
            { "id": "a1c2", "title": "Check backup status", "result": "Last verified backup completed 3 days ago. Today's incremental backup was partially encrypted.", "scores": { "detection": 3 } }
          ]
        },
        { "id": "a1n2", "type": "investigation", "title": "Review network traffic logs",
          "result": "Outbound C2 traffic detected to 185.220.x.x (known Tor exit node). Approximately 2.3 GB of data exfiltrated before encryption began.",
          "scores": { "detection": 5 }, "children": []
        },
        { "id": "a1n3", "type": "decision", "title": "Isolate affected network segment?",
          "options": [
            { "text": "Yes — isolate immediately", "scores": { "detection": 15, "response": 10 }, "metrics": { "business": -5 }, "feedback": "Correct action. Isolation halted lateral movement but caused brief service disruption for 300 staff." },
            { "text": "No — continue monitoring", "scores": { "detection": 5, "response": -5 }, "metrics": { "business": -15, "reputation": -10 }, "feedback": "Delayed action. The ransomware spread to 2 additional departments while monitoring continued." }
          ]
        },
        { "id": "a1n4", "type": "decision", "title": "Notify CISO and executive team?",
          "options": [
            { "text": "Yes — escalate immediately", "scores": { "reporting": 15 }, "metrics": { "reputation": 5 }, "feedback": "Good. Early escalation allows leadership to prepare crisis communications and engage legal." },
            { "text": "No — investigate more first", "scores": { "reporting": -10 }, "metrics": { "reputation": -5 }, "feedback": "Risky. Without executive awareness, key decisions were delayed by 2 hours." }
          ]
        }
      ]
    },
    {
      "id": 2, "label": "Act 2 — Escalation", "title": "Crisis is confirmed",
      "brief": "CISO has been notified. Legal, HR, and Comms teams are being assembled. The ransom note demands $2.3M in cryptocurrency within 72 hours.",
      "ticker": "09:15 — Media is asking questions. A customer portal has been offline for 90 minutes.",
      "maxChoices": 4,
      "nodes": [
        { "id": "a2n1", "type": "investigation", "title": "Assess scope of encrypted systems",
          "result": "Confirmed: 43 endpoints, 2 file servers, 1 ERP system (SAP), and the customer-facing web portal are encrypted. Core banking and email remain online.",
          "scores": { "detection": 5 },
          "children": [
            { "id": "a2c1", "title": "Estimate recovery time without paying ransom", "result": "IT estimates 7–14 days for full recovery using backups. ERP data loss of approximately 3 days.", "scores": { "recovery": 3 } }
          ]
        },
        { "id": "a2n2", "type": "investigation", "title": "Review cyber insurance policy",
          "result": "Policy covers ransomware response up to $5M. Coverage requires notification within 24 hours of discovery. The insurer must approve any ransom payment.",
          "scores": { "mitigation": 3 }, "children": []
        },
        { "id": "a2n3", "type": "decision", "title": "Declare a formal Cyber Crisis?",
          "options": [
            { "text": "Yes — activate Crisis Management Team", "scores": { "response": 15, "mitigation": 10 }, "metrics": { "business": 5 }, "feedback": "Strong. CMT activation enables structured command, coordination, and faster decision-making." },
            { "text": "No — handle within IT department", "scores": { "response": -10 }, "metrics": { "business": -10, "reputation": -10 }, "feedback": "Poor. IT-only response lacked authority to make key business and legal decisions quickly." }
          ]
        },
        { "id": "a2n4", "type": "decision", "title": "Notify cyber insurer within SLA?",
          "options": [
            { "text": "Yes — notify immediately", "scores": { "reporting": 15, "mitigation": 5 }, "metrics": {}, "feedback": "Correct. Timely notification preserves coverage. Insurer dispatched a forensics firm within 4 hours." },
            { "text": "No — assess internally first", "scores": { "reporting": -15 }, "metrics": { "business": -10 }, "feedback": "Policy breach. Late notification voided a portion of coverage, adding $400K to recovery costs." }
          ]
        }
      ]
    },
    {
      "id": 3, "label": "Act 3 — Business Impact", "title": "Counting the cost",
      "brief": "The Crisis Management Team is assembled. Finance is preparing impact figures. Customers and partners are calling for updates.",
      "ticker": "11:30 — Stock price has dropped 4%. Two enterprise clients have emailed requesting status updates.",
      "maxChoices": 4,
      "nodes": [
        { "id": "a3n1", "type": "investigation", "title": "Conduct Business Impact Analysis",
          "result": "Critical processes offline: Order processing, customer portal, financial reporting. Revenue impact estimated at $180K/day. SLA breach for 3 Tier-1 clients imminent.",
          "scores": { "mitigation": 5 },
          "children": [
            { "id": "a3c1", "title": "Identify manual workarounds", "result": "Finance can process payroll manually for up to 5 days. Orders can be taken via phone with 40% reduced capacity.", "scores": { "mitigation": 3 } }
          ]
        },
        { "id": "a3n2", "type": "investigation", "title": "Assess reputational risk",
          "result": "Social media monitoring shows 142 mentions, mostly concerned customers. No mainstream media coverage yet. One industry journalist has made direct contact.",
          "scores": { "reporting": 3 }, "children": []
        },
        { "id": "a3n3", "type": "decision", "title": "Issue a public statement now?",
          "options": [
            { "text": "Yes — brief, factual holding statement", "scores": { "reporting": 10 }, "metrics": { "reputation": 15 }, "feedback": "Effective. The statement contained speculation, reassured clients, and reduced media pressure." },
            { "text": "No — wait for full picture", "scores": { "reporting": -5 }, "metrics": { "reputation": -20 }, "feedback": "Costly. The silence was interpreted as cover-up. Negative media coverage began within 2 hours." }
          ]
        },
        { "id": "a3n4", "type": "decision", "title": "Activate Business Continuity Plan (BCP)?",
          "options": [
            { "text": "Yes — activate BCP immediately", "scores": { "mitigation": 20, "recovery": 10 }, "metrics": { "business": 15 }, "feedback": "Excellent. Manual workarounds reduced operational downtime by an estimated 60%." },
            { "text": "No — wait for IT recovery", "scores": { "mitigation": -10 }, "metrics": { "business": -15 }, "feedback": "Missed opportunity. Two days of revenue loss could have been partially offset by BCP activation." }
          ]
        }
      ]
    },
    {
      "id": 4, "label": "Act 4 — Crisis Management", "title": "Making the hard calls",
      "brief": "Day 2. IT has begun recovery. The threat actor has published a sample of stolen data on a dark web forum as proof of exfiltration. Regulators have been informed.",
      "ticker": "Day 2, 10:00 — Data leak confirmed. Legal advises potential PDPA notification obligation.",
      "maxChoices": 4,
      "nodes": [
        { "id": "a4n1", "type": "investigation", "title": "Assess the data exfiltration scope",
          "result": "Stolen data includes: 14,200 customer records (name, email, partial payment data), internal financial forecasts, and HR salary data. No passport or ID numbers confirmed stolen.",
          "scores": { "reporting": 5 },
          "children": [
            { "id": "a4c1", "title": "Check PDPA notification requirements", "result": "Under Thai PDPA, notification to PDPC required within 72 hours of confirmed breach. Customer notification required if high risk of harm.", "scores": { "reporting": 3 } }
          ]
        },
        { "id": "a4n2", "type": "investigation", "title": "Consult on ransom payment decision",
          "result": "Legal advises paying ransom carries legal risk and no guarantee of decryption. FBI recommends no payment. Insurer is neutral but will cover up to $1M if approved.",
          "scores": { "response": 3 }, "children": []
        },
        { "id": "a4n3", "type": "decision", "title": "Notify affected customers about data breach?",
          "options": [
            { "text": "Yes — transparent notification within 72hrs", "scores": { "reporting": 20 }, "metrics": { "reputation": 10 }, "feedback": "Legally compliant and trust-building. Customers responded with concern but appreciated honesty." },
            { "text": "No — disclose only if legally forced", "scores": { "reporting": -20 }, "metrics": { "reputation": -25 }, "feedback": "High-risk strategy. Regulator discovered the breach independently and issued a formal warning." }
          ]
        },
        { "id": "a4n4", "type": "decision", "title": "Pay the ransom?",
          "options": [
            { "text": "No — proceed with self-recovery", "scores": { "remediation": 15, "recovery": 10 }, "metrics": { "business": -10 }, "feedback": "Defensible decision. Recovery took longer but avoided legal risk and funding criminal actors." },
            { "text": "Yes — pay to accelerate recovery", "scores": { "remediation": -10, "recovery": 5 }, "metrics": { "business": 10, "reputation": -15 }, "feedback": "Controversial. Recovery was faster but leaked to media, causing significant reputational damage." }
          ]
        }
      ]
    },
    {
      "id": 5, "label": "Act 5 — Recovery", "title": "Building back",
      "brief": "Day 5. Systems are being restored. Leadership is under pressure. The board wants a full incident review. Staff morale is low after 5 days of disruption.",
      "ticker": "Day 5, 14:00 — 70% of systems restored. Full recovery estimated in 48 hours.",
      "maxChoices": 4,
      "nodes": [
        { "id": "a5n1", "type": "investigation", "title": "Verify integrity of restored systems",
          "result": "Forensic team confirms all restored systems are clean. Persistence mechanisms removed. New EDR deployed on all endpoints. Firewall rules updated.",
          "scores": { "recovery": 5 },
          "children": [
            { "id": "a5c1", "title": "Confirm backup restoration success", "result": "98% of data restored. 3-day ERP gap filled manually by Finance team. No further data confirmed lost.", "scores": { "recovery": 5 } }
          ]
        },
        { "id": "a5n2", "type": "investigation", "title": "Review total business impact",
          "result": "Direct costs: $620K (forensics, overtime, tooling). Indirect costs: estimated $1.4M (lost revenue, SLA penalties, contract renegotiation). Total: ~$2M.",
          "scores": { "lessonsLearned": 5 }, "children": []
        },
        { "id": "a5n3", "type": "decision", "title": "Conduct formal Lessons Learned review?",
          "options": [
            { "text": "Yes — within 2 weeks, cross-functional", "scores": { "lessonsLearned": 30 }, "metrics": { "reputation": 5 }, "feedback": "Best practice. 14 action items identified. Board received a full After-Action Report within 3 weeks." },
            { "text": "No — move on and focus on operations", "scores": { "lessonsLearned": 0 }, "metrics": { "reputation": -5 }, "feedback": "Missed. Without a review, root causes remain unaddressed and repeat incidents become more likely." }
          ]
        },
        { "id": "a5n4", "type": "decision", "title": "Invest in BCP and DR program improvements?",
          "options": [
            { "text": "Yes — allocate budget and assign owner", "scores": { "remediation": 20, "lessonsLearned": 10 }, "metrics": { "business": 5, "reputation": 5 }, "feedback": "Excellent. The board approved a 3-year resilience program. Posture significantly improved." },
            { "text": "No — prioritize cost reduction instead", "scores": { "remediation": -15 }, "metrics": { "business": -5, "reputation": -5 }, "feedback": "Short-sighted. Auditors flagged insufficient investment as a material risk in the annual review." }
          ]
        }
      ]
    }
  ]
};

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
  scenario:    null,
  actIndex:    0,
  choicesUsed: 0,
  openNodes:   {},    // nodeId → boolean
  investigated: {},   // nodeId → boolean
  decided:     {},    // nodeId → optionIndex
  scores: {
    detection:    0,
    response:     0,
    mitigation:   0,
    reporting:    0,
    recovery:     0,
    remediation:  0,
    lessonsLearned: 0
  },
  business:   100,
  reputation: 100
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(v) { return Math.max(0, Math.min(100, Math.round(v))); }

function applyScores(scores, metrics) {
  for (const [k, v] of Object.entries(scores  || {})) {
    if (state.scores[k] !== undefined) state.scores[k] = clamp(state.scores[k] + v);
  }
  if (metrics) {
    if (metrics.business   !== undefined) state.business   = clamp(state.business   + metrics.business);
    if (metrics.reputation !== undefined) state.reputation = clamp(state.reputation + metrics.reputation);
  }
}

function getAct()        { return state.scenario.acts[state.actIndex]; }
function totalActs()     { return state.scenario.acts.length; }
function isLastAct()     { return state.actIndex >= totalActs() - 1; }
function actComplete()   { return state.choicesUsed >= getAct().maxChoices; }
function progressPct()   { return Math.round((state.actIndex / totalActs()) * 100); }

// ── Screens ───────────────────────────────────────────────────────────────────

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Render: HUD ───────────────────────────────────────────────────────────────

function renderHUD() {
  const act = getAct();
  document.getElementById('hud-act').textContent     = act.label;
  document.getElementById('hud-choices').textContent = `${state.choicesUsed}/${act.maxChoices} choices`;
  document.getElementById('progress-fill').style.width = progressPct() + '%';
  document.getElementById('act-eyebrow').textContent  = act.label;
  document.getElementById('act-title').textContent    = act.title;
  document.getElementById('act-brief').textContent    = act.brief;
  document.getElementById('ticker-text').textContent  = act.ticker;

  // Choice dots
  const bar = document.getElementById('choices-bar');
  bar.innerHTML = '<span class="choices-label">Choices:</span>';
  for (let i = 0; i < act.maxChoices; i++) {
    const dot = document.createElement('div');
    dot.className = 'choice-dot' + (i < state.choicesUsed ? ' used' : '');
    bar.appendChild(dot);
  }
}

// ── Render: Nodes ─────────────────────────────────────────────────────────────

function renderNodes() {
  const act       = getAct();
  const container = document.getElementById('nodes-container');
  container.innerHTML = '';

  for (const node of act.nodes) {
    container.appendChild(buildNodeCard(node));
  }
}

function buildNodeCard(node) {
  const isOpen     = !!state.openNodes[node.id];
  const isDone     = state.investigated[node.id] || state.decided[node.id] !== undefined;
  const card       = document.createElement('div');
  card.className   = 'node-card' + (isDone ? ' done' : '');
  card.id          = 'card-' + node.id;

  // Header
  const header = document.createElement('div');
  header.className = 'node-header';
  header.setAttribute('role', 'button');
  header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  header.innerHTML = `
    <span class="node-type-badge ${node.type === 'investigation' ? 'badge-inv' : 'badge-dec'}">
      ${node.type === 'investigation' ? 'Investigate' : 'Decision'}
    </span>
    <span class="node-title">${node.title}</span>
    ${isDone ? '<span class="node-done-icon" aria-label="Complete">✓</span>' : ''}
    <span class="node-chevron${isOpen ? ' open' : ''}" aria-hidden="true">▾</span>
  `;
  header.addEventListener('click', () => toggleNode(node.id));
  card.appendChild(header);

  // Body (only if open)
  if (isOpen) {
    const body = document.createElement('div');
    body.className = 'node-body';

    if (node.type === 'investigation') {
      body.appendChild(buildInvestigationBody(node));
    } else {
      body.appendChild(buildDecisionBody(node));
    }

    card.appendChild(body);
  }

  return card;
}

function buildInvestigationBody(node) {
  const frag = document.createDocumentFragment();

  if (state.investigated[node.id]) {
    const result = document.createElement('div');
    result.className = 'node-result finding';
    result.textContent = node.result;
    frag.appendChild(result);

    // Child nodes
    if (node.children && node.children.length) {
      const childrenWrap = document.createElement('div');
      childrenWrap.className = 'children';

      for (const child of node.children) {
        const childEl = document.createElement('div');
        childEl.className = 'child-node';

        const childTitle = document.createElement('div');
        childTitle.className = 'child-title';
        childTitle.textContent = child.title;
        childEl.appendChild(childTitle);

        if (state.investigated[child.id]) {
          const childResult = document.createElement('div');
          childResult.className = 'child-result';
          childResult.textContent = child.result;
          childEl.appendChild(childResult);
        } else {
          const btn = document.createElement('button');
          btn.className = 'inv-btn';
          btn.textContent = '⤳ Investigate further';
          btn.disabled = actComplete();
          btn.addEventListener('click', () => investigateChild(node.id, child.id));
          childEl.appendChild(btn);
        }

        childrenWrap.appendChild(childEl);
      }
      frag.appendChild(childrenWrap);
    }
  } else {
    const btn = document.createElement('button');
    btn.className = 'inv-btn';
    btn.textContent = '⤳ Investigate';
    btn.disabled = actComplete();
    btn.addEventListener('click', () => investigate(node.id));
    frag.appendChild(btn);
  }

  return frag;
}

function buildDecisionBody(node) {
  const frag     = document.createDocumentFragment();
  const decided  = state.decided[node.id];
  const optWrap  = document.createElement('div');
  optWrap.className = 'options';

  node.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    let cls = 'opt-btn';
    if (decided !== undefined) {
      cls += decided === i ? ' selected' : ' rejected';
    }
    btn.className = cls;
    btn.disabled  = (decided !== undefined) || actComplete();

    const icon = document.createElement('span');
    icon.className = 'opt-icon';
    icon.textContent = decided === i ? '✓' : (decided !== undefined ? '✕' : '◎');
    btn.appendChild(icon);

    btn.appendChild(document.createTextNode(opt.text));
    btn.addEventListener('click', () => decide(node.id, i));
    optWrap.appendChild(btn);
  });

  frag.appendChild(optWrap);

  // Show feedback after decision
  if (decided !== undefined) {
    const feedback = document.createElement('div');
    feedback.className = 'opt-feedback';
    feedback.textContent = node.options[decided].feedback;
    frag.appendChild(feedback);
  }

  return frag;
}

// ── Render: Act Complete / Footer ─────────────────────────────────────────────

function renderFooter() {
  const completeMsg = document.getElementById('act-complete-msg');
  const footerNext  = document.getElementById('footer-next');
  const btnNext     = document.getElementById('btn-next');

  if (actComplete()) {
    completeMsg.style.display = 'block';
    footerNext.style.display  = 'flex';
    btnNext.textContent = isLastAct() ? 'View Executive Report →' : 'Next Act →';
  } else {
    completeMsg.style.display = 'none';
    footerNext.style.display  = 'none';
  }
}

// ── Actions ───────────────────────────────────────────────────────────────────

function toggleNode(nodeId) {
  state.openNodes[nodeId] = !state.openNodes[nodeId];
  renderGame();
}

function investigate(nodeId) {
  if (actComplete()) return;
  const node = findNode(nodeId);
  if (!node || state.investigated[nodeId]) return;
  state.investigated[nodeId] = true;
  state.choicesUsed++;
  applyScores(node.scores || {}, {});
  renderGame();
}

function investigateChild(parentId, childId) {
  if (actComplete()) return;
  const parent = findNode(parentId);
  const child  = parent && parent.children && parent.children.find(c => c.id === childId);
  if (!child || state.investigated[childId]) return;
  state.investigated[childId] = true;
  state.choicesUsed++;
  applyScores(child.scores || {}, {});
  renderGame();
}

function decide(nodeId, optIdx) {
  if (actComplete() || state.decided[nodeId] !== undefined) return;
  const node = findNode(nodeId);
  if (!node) return;
  const opt = node.options[optIdx];
  state.decided[nodeId] = optIdx;
  state.choicesUsed++;
  applyScores(opt.scores || {}, opt.metrics || {});
  renderGame();
}

function nextAct() {
  if (isLastAct()) {
    renderReport();
    showScreen('screen-report');
    return;
  }
  state.actIndex++;
  state.choicesUsed = 0;
  state.openNodes   = {};
  showScreen('screen-game');
  renderGame();
  window.scrollTo(0, 0);
}

function findNode(nodeId) {
  const act = getAct();
  return act.nodes.find(n => n.id === nodeId) || null;
}

// ── Render: Game (full) ───────────────────────────────────────────────────────

function renderGame() {
  renderHUD();
  renderNodes();
  renderFooter();
}

// ── Report ────────────────────────────────────────────────────────────────────

function getRating() {
  const b = state.business, r = state.reputation;
  if (b >= 85 && r >= 85) return { label: 'Cyber Hero',            cls: 'hero',       desc: 'Exceptional response. Your organisation demonstrated industry-leading resilience.' };
  if (b >= 70 && r >= 70) return { label: 'Balanced Responder',    cls: 'balanced',   desc: 'Solid performance with room for improvement in a few key areas.' };
  if (b >= 50 && r >= 50) return { label: 'Struggling Organisation', cls: 'struggling', desc: 'The incident caused significant damage. Foundational improvements are urgently needed.' };
  return                         { label: 'Organisation Collapse',  cls: 'collapse',   desc: 'Critical failures in response led to severe and lasting business and reputational damage.' };
}

function getStrengths() {
  const s = state.scores, out = [];
  if (s.detection     >= 15) out.push('Strong threat detection and early warning');
  if (s.response      >= 15) out.push('Effective crisis escalation and command');
  if (s.mitigation    >= 15) out.push('Proactive BCP and service continuity');
  if (s.reporting     >= 20) out.push('Timely and transparent stakeholder communication');
  if (s.recovery      >= 15) out.push('Well-executed disaster recovery');
  if (s.remediation   >= 20) out.push('Committed to long-term resilience investment');
  if (s.lessonsLearned >= 20) out.push('Embedded lessons-learned culture');
  return out.length ? out : ['No clear strengths identified — review all response phases'];
}

function getWeaknesses() {
  const s = state.scores, out = [];
  if (s.detection      < 10) out.push('Weak or delayed threat detection');
  if (s.response       < 10) out.push('Slow crisis declaration and escalation');
  if (s.mitigation     < 10) out.push('Insufficient business continuity activation');
  if (s.reporting      < 5)  out.push('Poor regulatory and public communication');
  if (s.recovery       < 10) out.push('Inadequate disaster recovery execution');
  if (s.remediation    < 5)  out.push('No post-incident remediation investment');
  if (s.lessonsLearned < 10) out.push('Lessons-learned process not completed');
  return out.length ? out : ['No critical weaknesses — strong overall performance'];
}

function getRecommendations() {
  const s = state.scores, out = [];
  if (s.detection      < 15) out.push('Improve SIEM alerting rules and 24/7 SOC coverage');
  if (s.response       < 15) out.push('Conduct quarterly Cyber Crisis tabletop exercises');
  if (s.mitigation     < 15) out.push('Test BCP activation at least annually');
  if (s.reporting      < 15) out.push('Develop pre-approved crisis communication playbooks');
  if (s.recovery       < 10) out.push('Test full DR restoration from backup annually');
  if (s.lessonsLearned < 20) out.push('Mandate after-action reviews for all P1 incidents');
  out.push('Review cyber insurance policy terms and notification SLAs');
  return out.slice(0, 5);
}

function renderReport() {
  const s      = state.scores;
  const rating = getRating();
  const strs   = getStrengths();
  const weaks  = getWeaknesses();
  const recs   = getRecommendations();

  const techTotal = s.detection + s.response + s.mitigation + s.reporting + s.recovery + s.remediation + s.lessonsLearned;
  const techAvg   = Math.round(techTotal / 7);
  const overall   = Math.round((state.business + state.reputation + techAvg) / 3);

  const bColor = state.business   >= 70 ? 'good' : state.business   >= 50 ? 'ok' : 'bad';
  const rColor = state.reputation >= 70 ? 'good' : state.reputation >= 50 ? 'ok' : 'bad';
  const oColor = overall          >= 70 ? 'good' : overall           >= 50 ? 'ok' : 'bad';

  const scoreRows = [
    { name: 'Detection',       val: s.detection,     max: 30 },
    { name: 'Response',        val: s.response,      max: 30 },
    { name: 'Mitigation',      val: s.mitigation,    max: 30 },
    { name: 'Reporting',       val: s.reporting,     max: 30 },
    { name: 'Recovery',        val: s.recovery,      max: 30 },
    { name: 'Remediation',     val: s.remediation,   max: 30 },
    { name: 'Lessons Learned', val: s.lessonsLearned, max: 30 }
  ];

  const container = document.getElementById('report-container');
  container.innerHTML = `
    <div class="report-hero">
      <div class="report-hero-eyebrow">Executive Incident Report</div>
      <h1>${state.scenario.title}</h1>
      <div class="report-hero-sub">${state.scenario.subtitle} — After-Action Assessment</div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Business Health</div>
        <div class="metric-value ${bColor}">${state.business}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Reputation</div>
        <div class="metric-value ${rColor}">${state.reputation}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Overall Resilience</div>
        <div class="metric-value ${oColor}">${overall}</div>
      </div>
    </div>

    <div class="section-card">
      <h3>Technical performance by category</h3>
      ${scoreRows.map(r => `
        <div class="score-row">
          <span class="score-name">${r.name}</span>
          <div class="score-track">
            <div class="score-fill" style="width:${Math.round(Math.min(100, (r.val / r.max) * 100))}%"></div>
          </div>
          <span class="score-num">${r.val}</span>
        </div>
      `).join('')}
    </div>

    <div class="sw-grid">
      <div class="sw-card str">
        <h4>✓ Strengths</h4>
        ${strs.map(t => `<div class="sw-item">${t}</div>`).join('')}
      </div>
      <div class="sw-card weak">
        <h4>✕ Weaknesses</h4>
        ${weaks.map(t => `<div class="sw-item">${t}</div>`).join('')}
      </div>
    </div>

    <div class="section-card">
      <h3>Recommendations</h3>
      ${recs.map(r => `
        <div class="rec-item">
          <span class="rec-arrow">→</span>${r}
        </div>
      `).join('')}
    </div>

    <div class="rating-box">
      <div class="rating-label">Final Rating</div>
      <div class="rating-title ${rating.cls}">${rating.label}</div>
      <div class="rating-desc">${rating.desc}</div>
    </div>

    <div class="report-footer">
      <button class="btn-primary" onclick="location.reload()">↩ Restart Exercise</button>
    </div>
  `;
}

// ── Boot ──────────────────────────────────────────────────────────────────────

function init() {
  // Use embedded scenario — no fetch needed
  state.scenario = EMBEDDED_SCENARIO;

  // Title screen: Begin button
  document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('screen-game');
    renderGame();
  });

  // Next act button
  document.getElementById('btn-next').addEventListener('click', nextAct);

  // Show title
  showScreen('screen-title');
}

document.addEventListener('DOMContentLoaded', init);
