BCM Crisis Simulator v1.0
Objective

จำลองเหตุการณ์ Cyber Crisis แบบ Interactive Tabletop Exercise

สำหรับอบรม

BCM
BCP
ISO 22301
Incident Response
Crisis Management

ระยะเวลาเล่น

45 นาที

Debrief

15 นาที

รวม

60 นาที
Target Audience
University Students
IT Staff
SOC Analysts
Management
BCM Team
Executives
Core Design Philosophy
ไม่ใช่ Quiz
ไม่ใช่ CTF
ไม่ใช่ Incident Response อย่างเดียว

แต่เป็น

Risk
↓
Detection
↓
Incident Response
↓
Business Impact Analysis
↓
Business Continuity
↓
Recovery
↓
Crisis Management
↓
Lessons Learned
Storyline

Scenario เดียว

Phishing Email
↓
RAT Infection
↓
AD Enumeration
↓
Domain Controller Compromise
↓
Ransomware Deployment
↓
Business Disruption
↓
Recovery
↓
Lessons Learned
Game Structure
Act 1

Detection

Goal

Identify Threat

Available Choices

8

Allowed Choices

4

Example
What does the malware do?
Where does it communicate?
How many users received the email?
Is ERP affected?
Output

Unlock Information

Unlock Actions

Update Score

Act 2

Escalation

Goal

Understand Scope

Contain Threat

Available Choices

6

Allowed Choices

3

Example
Investigate AD Enumeration
Investigate Servers
Investigate C2
Output

Unlock Advanced Actions

Act 3

Business Impact Analysis

Goal

Understand Business Impact

Example

Choose Critical Systems

ERP
Email
AD
Production

Choose RTO

1 Hour
4 Hours
24 Hours

Choose Recovery Priority

Output

Recovery Score

Business Score

Act 4

Crisis Management

Goal

Manage Organizational Crisis

Decisions

Activate BCP?

Activate DR Site?

Declare Crisis?

Communication

Internal

External

Output

Reporting Score

Reputation Score

Act 5

Recovery

Goal

Restore Operations

Decisions

Recovery Order

Credential Rotation

Infrastructure Rebuild

DR Failback

Output

Recovery Score

Remediation Score

Post Incident Review

(แทน Act 6)

Goal

Lessons Learned

Continuous Improvement

Example

What should be improved?

User Awareness
DR Testing
BIA Review
Crisis Communication
Output

Lessons Learned Score

PDCA Score

Branching Model
Linear Story

ทุกทีมเจอเหตุการณ์เดียวกัน

Branching Knowledge

เลือกต่างกัน

ข้อมูลที่ได้ต่างกัน

Branching Actions

ข้อมูลต่างกัน

Action ที่ปลดล็อกต่างกัน

Branching Scores

คะแนนต่างกัน

Branching Endings

ผลลัพธ์ต่างกัน

Score Engine
Operational Metrics
Business Health

เริ่ม

100
Reputation

เริ่ม

100
Capability Metrics

DRMRRRL

Detection
Response
Mitigation
Reporting
Recovery
Remediation
Lessons Learned

คะแนนแต่ละ Choice

ตัวอย่าง

{
  "business": 5,
  "reputation": 0,

  "detection": 10,
  "mitigation": 5,

  "unlock": [
    "block_c2"
  ]
}
Final Report
Executive Dashboard

แสดง

Business Health
Reputation
Resilience Score
DRMRRRL Profile
Detection
Response
Mitigation
Reporting
Recovery
Remediation
Lessons Learned
PDCA Assessment
Plan
Do
Check
Act
Strengths

เช่น

Excellent Threat Detection
Strong Containment Strategy
Weaknesses

เช่น

Delayed Crisis Declaration
Weak Recovery Planning
Recommended Improvements

เช่น

Improve BIA Process
Increase DR Testing Frequency
Review Communication Plan
Ending Types
Cyber Hero

Technical + Business Strong

Balanced Responder

ทุกด้านสมดุล

Technical Hero

Technical ดีมาก

Business อ่อน

Business Saver

BCM ดีมาก

Technical ปานกลาง

Crisis Amplifier

Communication แย่

Organization Collapse

Business Health ต่ำมาก

Classroom Mode

Team Name

Training Code

Session Expiry Time

Suitable for

25 Students
5 Teams
Technology Stack

Static Web Application

index.html
style.css
game.js
scenario.json
config.js

Deploy

GitHub Pages
Netlify
Vercel

นี่จะเป็น BCM Crisis Simulator v1.0 Baseline Architecture ของเรา และหลังจากคุณสมัคร GitHub เสร็จ ขั้นต่อไปคือผมจะช่วยออกแบบโครงสร้าง scenario.json และโครงสร้างโค้ด game.js ก่อนเริ่มเขียนหน้าเว็บจริงครับ
