// ── BCM Crisis Simulator — game.js v1.0 ──────────────────────────────────────
// Loads scenario JSON, drives the game loop, and renders the executive report.
// Dependencies: none (vanilla JS). Targets: index.html + style.css.

const SCENARIO_PATH = './scenarios/ransomware_v1.json';

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

async function init() {
  // Load scenario JSON
  try {
    const res = await fetch(SCENARIO_PATH);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.scenario = await res.json();
  } catch (err) {
    console.error('Failed to load scenario:', err);
    document.body.innerHTML = `<p style="color:#f85149;padding:2rem;">Error loading scenario: ${err.message}</p>`;
    return;
  }

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
