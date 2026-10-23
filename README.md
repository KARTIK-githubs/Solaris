# SOLARIS — Together We Shine Brighter

An intelligent, regulation-aware solar adoption, community solar planning, affordability optimisation, and transparent credit allocation platform designed for India, starting with Delhi (BSES Rajdhani Power Limited, BSES Yamuna Power Limited, Tata Power DDL).

Primary SDG Alignment:
- **SDG 8** — Decent Work and Economic Growth
- **SDG 9** — Industry, Innovation, and Infrastructure
- Supporting **SDG 7** — Affordable and Clean Energy

---

## 1. Architecture & Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4 design tokens, Material Symbols & Lucide Icons, Canvas Confetti.
- **State Management & Persistence:** Centralized `AppContext` with live reactive recalculations and local storage persistence for CA numbers, budget preferences, consent agreements, and audit history.
- **Solar Engineering Engine (`src/utils/solarCalculations.ts`):** Deterministic calculations for Delhi insolation (~1,420 kWh/kWp/year), DERC LT-1 domestic tariff brackets, and official PM Surya Ghar: Muft Bijli Yojana subsidies (capped at ₹78,000 for residential 3kW+).
- **Smart Affordability Optimiser (`src/utils/optimiserEngine.ts`):** Exact combinatorial linear solver optimizing binary participant selection, adhering strictly to budget ceilings, non-negative allocations, 100.0% zero-shortfall reconciliation, and $EMI_i < \Delta \text{Bill}_i$ personal net benefit constraints.
- **Audit & Governance:** Continuous logging of all regulatory approvals, member consent e-signatures, and solver executions in an immutable audit ledger.

---

## 2. Supported Roles & Demo Switcher

Solaris supports 5 distinct user roles with dedicated interfaces accessible via the **Interactive Role Switcher** in the top bar or at `/login`:
1. **Household / Resident (Rohit Rao)** — Flat 301, Pocket 2 RWA, 5.0 kW Sanctioned load.
2. **MSME / Business Owner (Alok Gupta)** — Shree Fabric Mills, 25.0 kW Sanctioned load, accelerated depreciation tax benefits.
3. **RWA / Community Coordinator (Anita Verma)** — General Secretary, Gulmohar Enclave RWA, managing cohort capitalization and terrace resolutions.
4. **Installer / Financing Partner (Vikram Solar Solutions)** — Empanelled BRPL EPC specialist reviewing site quotes and warranty terms.
5. **Administrator / Auditor (Er. Rajesh Sharma)** — DERC Ombudsman & statutory auditor verifying transformer saturation and compliance checklists.

---

## 3. Implemented Routes & Features Status

| Route | Feature | Status | Notes |
|---|---|---|---|
| `/` | Public Landing Page | **Complete** | Hero, simulation preview, 4-step journey, audience segments, comparison table, SDG impact, and FAQs. |
| `/dashboard` | Main Cockpit | **Complete** | KPI metrics, generation vs consumption curve, LiDAR terrace scan, milestone timeline, and consent action. |
| `/onboarding` | 5-Step Location & Profile Wizard | **Complete** | DISCOM selector, CA verification, monthly bill slider, housing type, and solar goal selection. |
| `/assessment` | Solar Feasibility Calculator | **Complete** | Deterministic sizing, net cost after subsidy, payback period, 3-model comparative matrix, and report export. |
| `/regulations` | Regulatory Eligibility Checker | **Complete** | Residential vs MSME filters, VNM, CAPEX, GNM, P2P rules, and statutory checklist. |
| `/community` | Community Solar Workspace | **Complete** | Member roster, capitalization progress bar, resolution tracker, terrace envelope, and neighbor invite modal. |
| `/optimiser` | Smart Affordability Optimiser | **Complete** | Exact linear solver, target kWp selection, budget guardrails, real-time stress test simulator (Monsoon -20%, Rate Spike, etc.). |
| `/credit-allocation`| Transparent Credit Allocation | **Complete** | 100.0% reconciled radial distribution dial, node breakdowns, lifecycle stepper, and DISCOM reconciliation ledger. |
| `/partners` | Installers & Financing Network | **Complete** | Empanelled EPC quotations, warranty comparison, and green loan EMI calculator. |
| `/monitoring` | Inverter Telemetry & Maintenance | **Complete** | 12-month generation charts, performance ratio, fault logging, and service ticket tracking. |
| `/reports` | Reports & Regulatory Statements | **Complete** | Downloadable CSV datasets and print-ready PDF planning statements. |
| `/notifications` | Notification Center | **Complete** | Real-time action triggers, read/unread states, and direct step navigation. |
| `/settings` | DISCOM & CA Settings | **Complete** | Verified consumer parameters, tariff tier selection, and data reset. |
| `/admin` | Administration & Audit Console | **Complete** | Project records, immutable audit logs, statutory rule toggles, and automated test runner. |
| `/login` | Zero-Friction Role Switcher | **Complete** | Instant persona switching for all 5 roles with pre-configured ledgers. |

---

## 4. Critical End-to-End Demo Flow

1. **Homepage:** User explores solar potential and reviews the 4-step roadmap.
2. **Onboarding:** User selects DISCOM (`BRPL`), verifies Consumer CA `#102948192`, adjusts the monthly bill slider (`₹6,850`), and picks *Join Community Solar (VNM)*.
3. **Assessment:** Solaris calculates 4.2 kWp optimal capacity, ₹1.32L net cost after ₹78k subsidy, and 2.4-year payback.
4. **Regulatory Check:** User reviews statutory clearance under DERC VNM guidelines 2024.
5. **Community Workspace:** User inspects Gulmohar Enclave RWA cohort capitalization and terrace envelope.
6. **Smart Optimiser:** User tests 12 kWp capacity, runs stress contingencies (Monsoon drop, Rate spike), and validates the solver guarantee.
7. **Credit Allocation:** User verifies the 100.0% reconciled radial allocation (Flat 301 = 40%, Flat 204 = 35%, Flat 102 = 25%).
8. **Digital Consent:** User signs the VNM Member Agreement with instant visual confirmation and audit log entry.
9. **Monitoring & Reports:** User downloads the internal planning statement and checks generation telemetry.

---

## 5. Statutory Disclaimer

Solaris provides regulatory planning guidance and algorithmic simulation models under Delhi Electricity Regulatory Commission (DERC) regulations. Official metering approvals, sanctioned load expansions, and final electricity tariff credit settlements are administered strictly by authorized DISCOMs (BSES Rajdhani, BSES Yamuna, Tata Power DDL). Documents generated by Solaris are internal planning statements and do not represent official utility electricity bills.
