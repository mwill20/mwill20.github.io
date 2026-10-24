# CONTENT.md — source of truth for the Traceroute

`index.html` is a rendering of this file. Change the story here first, then propagate to
the HTML (see [UPDATING.md](UPDATING.md)). Every fact carries a provenance tag so an
assistant or a reviewer can check it without asking.

**Provenance tags**

| Tag | Meaning |
|---|---|
| `[resume]` | `M_Will_Gen_Sec_Resume_Updated.docx`, 2026-10-21 |
| `[github]` | Verified against the GitHub API on the date noted |
| `[michael]` | Stated by Michael in conversation; not independently verified |
| `[claude-draft]` | Wording drafted by the assistant and approved by Michael |

Rules that apply to every hop:

- A number appears on the page only with a `[resume]` or `[github]` tag here.
- A repo appears as a branch only if it is public on GitHub and the link resolves.
- The AI meter (0–5, halves allowed) must never decrease from one hop to the next.
- The three standing orders and the hero thesis do not change without Michael's explicit instruction.

---

## Hero

- **Name:** Michael Williams
- **Thesis (h1 italic):** Leveraging AI. As it evolves, so do I. `[michael]`
- **Lede:** Cybersecurity Engineer II at SEARHC. Cybersecurity engineering, AI security, AI and software risk in a healthcare environment. Five years of security operations, and at every hop I stepped into the unknown and built things: solutions, my teams, and myself. `[michael]` `[resume]` for title and employer
- **Trace line:** `$ traceroute mwill20 --from 2020 --to now` · 7 hops · 5 years in security operations · AI thread: none → curiosity → study → adversarial → production
- **Meta block:** Seattle, WA · GCIH · GCIA · GSEC · SecurityX · CAISS · MLSecOps · UT Austin McCombs AI/ML `[resume]` · links: LinkedIn, portfolio, AgentLedger docs
- **Scroll cue:** Follow the evidence. `[michael]`

---

## Hop 1 · 2020 · First responder, technology operations

- **Side:** left · **AI meter:** 0
- **Headline:** It started in a *crisis*.
- **Scope:** one COVID-19 response environment · endpoints, auth, email, IAM lifecycle · HIPAA and PII `[resume]`
- **AI line:** did not exist. this was automation scripts, checklists, and vendor documents. no room for error. `[michael]`
- **Body:** Distributed teams, regulated data, zero tolerance for downtime. I learned the controls by standing them up under pressure: provisioning, authentication, email security, access lifecycle. `[claude-draft]`
- **AI thread:** none (deliberate; AI had not entered the story)
- **Branches:** none
- **Dates on resume:** First Responder (Technology Operations), Co-Lead PDA, Apr 2020 – Jan 2021 `[resume]`

## Hop 2 · 2023 · Student

- **Side:** right · **AI meter:** 1
- **Label:** student · B.A.S. cybersecurity · SANS scholarship · 17 certifications
- **Headline:** Then I *credentialed* the gaps. `[claude-draft]`
- **Scope:** Bachelor of Applied Science, Cybersecurity and Information Assurance · SANS Technology Institute scholarship, Applied Cybersecurity · 17 cyber certifications `[resume]` for degree and SANS; `[michael]` for the count of 17
- **AI line:** early adoption. ChatGPT filled the gaps instructors left. `[michael]`
- **Body:** The degree gave me the map. The SANS scholarship and the certification run gave me the reps on paper: GSEC, GCIH, GCIA, SecurityX, and a dozen more. ChatGPT arrived and became a mentor, thought partner, and assistant that stretched my capabilities. `[michael]` final sentence; `[claude-draft]` the rest
- **AI thread · EARLY ADOPTION:** It was also my first AI security lesson, learned by accident: the model was confidently wrong often. Meaning, there were gaps, and where there are gaps there are vulnerabilities. Follow the evidence started here. `[michael]`
- **Side panel (creds list):** B.A.S. Cybersecurity & Information Assurance, WGU 2023 · Applied Cybersecurity scholarship, SANS Technology Institute 2024 · GSEC, GCIH, GCIA, SecurityX · CASP+, CySA+, PenTest+, Security+, Network+, SSCP · ChatGPT early adopter `[resume]` except the last line `[michael]`
- **Note:** the resume lists 10 security certifications and 7 AI/ML credentials; "17" is consistent if both are counted.

## Hop 3 · 2023–2024 · Director of cybersecurity

- **Side:** left · **AI meter:** 1.5 · **Route:** the loop is drawn at this hop (`LOOP_AT = 2` in `assets/route.js`)
- **Headline:** I almost started at the *finish line*. `[michael]`
- **Scope:** architect a production SOC from an empty rack · lead 30 people across ops, engineering, IR, insider threat · SOPs · playbooks and runbooks · cross-department projects and dependencies · organizational objectives `[resume]` `[michael]`
- **AI line:** fluency. curiosity: prompt engineering, applied research with model-assisted triage, OSINT and enrichment. `[michael]`
- **Body:** BitDefender, Wazuh, Splunk, TheHive, Action1. I wrote the SOPs, playbooks, detection runbooks, and IR procedures, then watched a team of 30 run them. The architecture worked. The gaps were mine, in the hands-on reps underneath it. `[resume]` tools and team size; `[claude-draft]` framing, approved
- **AI thread · CURIOSITY:** Every playbook I wrote was a workflow a model could one day run. I started asking what would have to be true for that to be safe. That question became the next three years. `[claude-draft]` approved
- **Side panel (loop note):** So I looped back to fill the gaps. · the route doubles back here on purpose · student → director → analyst → engineer `[michael]`
- **Dates on resume:** Director of Cybersecurity, Cyber Defense & Intelligence Center, Aug 2023 – Sept 2024 `[resume]`

## Hop 4 · 2024–2026 · Postgraduate AI/ML · Cybersecurity analyst II, external MSSP

- **Side:** right · **AI meter:** 2.5
- **Headline:** 3,000 endpoints. *60 clients.* `[resume]`
- **Scope:** multi-tenant MSSP floor · 300+ events a week · 30+ investigations a month · 25+ customer requests a week across 14 onboarded environments `[resume]`
- **AI line:** study → applied. ML for malware, LLM-assisted context behind deterministic gates. `[michael]`
- **Body:** Tier 2/3 triage, hunts that found what the automated layers missed, EDR and SIEM rules tuned across tenants. I built ThreatPrism inside Swimlane SOAR to extract IOCs, map ATT&CK, and hand analysts context before they touched the alert. `[resume]`
- **AI thread · STUDY, THEN APPLIED:** Postgraduate AI/ML at UT Austin McCombs. Notebooks taught me precision versus recall the hard way. ThreatPrism was the first time a model touched production work, and the first rule I wrote for myself: the model adds context, a deterministic gate makes the call. `[michael]`
- **Big number (side):** 48% · mean time to respond, down, across every tenant · a model in the loop, a gate at the decision `[resume]`
- **Branches:**
  - `threatprism` · tag: 48% MTTR reduction in production `[resume]` · AI-assisted SOC pipeline, deterministic guardrails, evidence-first reporting. `[github 2026-10-21]`
  - `High-Recall_Malware_Detector_Supervised_Unsupervised` · Supervised plus unsupervised PE analysis, recall-first for SOC use. Capstone of five malware ML notebooks. `[github]`
  - `MultiAgent_SOC` · Multi-agent triage and response orchestration with A2A guardrails. Competition finalist. `[github]` `[michael]` for finalist
  - `MalVec` · Explainable malware classification by structural similarity. CI, coverage, typed. `[github]`
- **Dates on resume:** Cybersecurity Analyst II, 11:11 Systems, Feb 2024 – Apr 2026; Postgraduate AI & ML Engineering, UT Austin McCombs, 2025 `[resume]`

## Hop 5 · 2025 · AI security becomes the discipline

- **Side:** left · **AI meter:** 4
- **Headline:** If it can be prompted, it can be *attacked*. `[claude-draft]` approved
- **Scope:** same floor, new target · the AI systems I had started trusting `[claude-draft]` approved
- **AI line:** adversarial. red team, guardrails, fine-tuning, evaluation harnesses. `[claude-draft]` approved
- **Body:** I pointed the detection mindset at the models. Red-teamed chatbots and agents against OWASP LLM Top 10 and MITRE ATLAS, built guardrails that run before and after the model, and fine-tuned one that refuses to become a shell. `[claude-draft]` approved
- **AI thread · ADVERSARIAL:** This is where curiosity turned into a practice: threat model the model, write the should-fail case first, and never let the model gate its own security decision. `[michael]`
- **Big number (side):** 57/0 · adversarial cases thrown at the detector, none got through `[resume]`
- **Branches:**
  - `AI-DevSecOps` · tag: 57 adversarial cases · 0 false negatives `[resume]` · Unsafe-pattern detection in AI-generated code: deterministic controls plus LLM-assisted reasoning. `[resume]`
  - `LLM-Red-Teaming-Audit-Demo` · Finance chatbot and commerce agent; 16 findings mapped to OWASP LLM Top 10, with an audit trail. `[github]` portfolio description
  - `ai-guardrails` · Layered input and output validation with policy enforcement. `[github]`
  - `Trust-Bench-SecureEval-Ops` · Multi-agent security evaluation framework with consensus routing. `[github]`
  - `SecureCLI-Tuner` · tag: 100% adversarial block rate `[github]` portfolio description · QLoRA fine-tune for natural language to Bash, three-layer runtime guardrails. `[github]`

## Hop 6 · 2026 · Cybersecurity engineer II, SEARHC · agents need a trust layer

- **Side:** right · **AI meter:** 5
- **Headline:** Agents will transact. *Who vouches for them?* `[claude-draft]` approved
- **Scope:** greenfield cybersecurity program in a healthcare environment · solo founder-builder · spec first, phase gates, verification between phases `[michael]`
- **AI line:** building with AI, for AI. agents as the attack surface and the workforce. `[claude-draft]` approved
- **Body 1 (by day):** a greenfield cybersecurity program. Detection engineering, vulnerability testing and remediation, threat hunting, AI and software risk, operations engineering across email, endpoint, network, and IAM lifecycle, and agentic AI security with Copilot in a healthcare environment. `[michael]`
- **Body 2 (by build):** AgentLedger, a six-layer proof of concept for discovery, identity, trust signals, context disclosure, workflow validation, and liability evidence. Infrastructure, not an orchestrator. Links: docs, repo. `[github]` AgentLedger README
- **AI thread · BUILDING WITH IT, FOR IT:** By now AI was both the tool and the target. I built with agent frameworks and MCP servers, then turned around and built the controls those agents need: deterministic gates, monitored deployments, one governed instruction set across every runtime. `[claude-draft]` approved
- **Side panel (ascent):** L1 discovery, capability ontology · L2 identity, verified manifests · L3 trust signals, trust ledger · L4 context disclosure, least privilege · L5 workflow validation, deterministic · L6 liability evidence, audit chain `[github]` AgentLedger README
- **Branches:**
  - `adk-expense-approval-agent` · Deterministic routing gate plus human review. Ambient agents. The model never gates the money. `[github]` `[michael]` for "Ambient agents"
  - `ClawGuard` · Guardrail-first monitoring for a live OpenClaw agent, evidence preserved for investigation. `[github 2026-10-21: SECURITY.md, tests, CI present]`
  - `agent-config-sync-public` (shown as agent-config-sync) · One source of truth for AI assistant instructions and skills across runtimes, with drift detection. Kaggle capstone. `[github]`
  - `AGENTs` · Eleven agent builds across LangChain, LangGraph, CrewAI, AutoGen, each with security notes and pinned deps. `[github]` repo description
- **Dates on resume:** Cybersecurity Engineer II, SEARHC, Jun 2026 – present `[resume]`
- **Excluded on purpose:** `MnemoVault` is not public on GitHub (404 on 2026-10-21). Add it as a branch only once published.

## Marquee (decorative, aria-hidden)

MITRE ATT&CK · MITRE ATLAS · STRIDE · OWASP LLM Top 10 · OWASP Agentic Top 10 · CoSAI MCP Taxonomy · NIST AI RMF · HIPAA · ISO 27001 · SOC 2 · Sigma · YARA · YARA-L 2.0 · KQL · MCP · A2A `[resume]` `[michael]`

## Hop 7 · Destination · Standing orders

- **Standing orders (do not change without instruction):**
  1. Everything is *untrusted* until proven otherwise.
  2. Guardrails are *engineering*, not an afterthought.
  3. Findings trace to *evidence*, or they are not findings.
- **Current block:**
  - current · Cybersecurity Engineer II · SEARHC `[resume]`
  - mandate · Build the greenfield cybersecurity program. A small crack team, leveraging AI, engineering the solutions that raise organizational IT and security maturity. Proactive where it can be, reactive when it must be. `[michael]` `[claude-draft]` phrasing, approved
  - stack · GreyMatter SOAR · Google SecOps · SentinelOne · Proofpoint · Pentera (vulnerability management) · Entra ID / AD · Defender · IAM · Drata `[resume]`
  - frameworks · NIST · ISO 27001 · HIPAA · SOC 2 · OWASP `[resume]`
  - in progress · Agentic AI Professional Program · Western State University, California `[michael]` program name as stated; not independently verified
- **Ledger line:** illustrative until the profile Action exists (see SECURITY.md). Update the build number and date by hand when editing, or leave as is.
- **Contact:** mwill.itmission@gmail.com · LinkedIn · GitHub

---

## Change log

| Date | Change | Source |
|---|---|---|
| 2026-10-21 | v1–v3 mockups; v3 wording hop by hop | Michael |
| 2026-10-24 | Hop 2 body and AI thread reworded; mandate line added; site published | Michael |
