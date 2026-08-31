---
title: "Azure Risk Management & DISA STIG Hardening Lab"
summary: "I built a cloud-based GRC lab executing the full NIST RMF lifecycle against an Active Directory domain hosted in Azure. I ran a baseline scan using Nessus and the SCAP Security Compliance Checker (SCC) to enumerate existing vulnerabilities and then hardened the domain with the PowerSTIG utility and manual GPO hardening. Finally, I mapped each control applied to the NIST 800-171 and CMMC 2.0 Level 2 controls."
date: 2026-07-05
category: "grc"
skills: ["Vulnerability Management Lifecycle", "STIG Automation", "Control Mapping", "GRC Documentation"]
tools: ["Azure", "Terraform", "Windows Server 2022", "Active Directory", "Nessus", "SCAP Compliance Checker", "PowerSTIG", "DISA STIGs"]
repoUrl: "https://github.com/Benjamin-Spoolstra/Projects/blob/main/Risk%20Management%20Lab.md"
order: 3
featured: true
---

## Overview

This project is a cloud-based risk-management and compliance lab built from scratch in Azure that simulates the full NIST Risk Management Framework (RMF) against a small Active Directory environment. I wanted hands-on experience with the RMF and the vulnerability-management lifecycle in a realistic setting, using the same toolchain DoD assessors and commercial VM programs rely on. I identified initial misconfigurations using Nessus, hardened the environment with PowerSTIG and manual GPO work, and conducted a reassessment verified the improvements. I mapped the applied controls directly to NIST SP 800-171 and CMMC 2.0 Level 2 frameworks to clearly demonstrate their compliant status.

## Environment

This environment consisted of a two-server `lab.local` domain on Windows Server 2022 Datacenter with one acting as a domain controller and one as a member server. Each was provisioned with Terraform inside an Azure VNet whose NSG only allows intranet traffic between the VMs. RDP access is restricted to a fixed, permanent IP to ensure unauthorized users cannot access the port. I conducted the initial vulnerability assessment with Tenable Nessus Essentials 10.x and the SCAP Compliance Checker (SCC) 5.14.x. Since the environment is in the cloud it can be spun up on demand with Terraform and deallocated between sessions to control cost.

## Logical Network Diagram
![Logical network diagram](/images/risk-lab/risk-lab-network-design.svg)

## Methodology

Four Sequential Phases:

1. **Infrastructure & Domain Setup** - Terraform deploys both VMs from stock Windows Server 2022 images. Each one is promoted to a DC in the `lab.local` domain with a realistic OU structure. No hardening is applied yet as this is the baseline.
2. **Baseline Scanning** - Nessus runs unauthenticated and authenticated scans against both servers. SCAP SCC runs on both servers to compare their current state to the STIG benchmarks, which helps establish baseline compliance scores.
3. **Hardening in Two Layers** - PowerSTIG's `WindowsServer` DSC composite resource automates OS-level registry, audit, security-policy, and service changes, which automatically hardens the servers up to 83% of the overall STIG requirements. The technically configurable AD Domain STIG controls are then implemented manually via GPMC, ADUC, and PowerShell which restricts privileged group membership, disables Windows LAPS, locks down Protected User groups, audits delegation, and blocks DC internet access.
4. **Post-hardening Scanning & Analysis** - The Nessus and SCC scans are repeated under identical settings for a valid before/after comparison, which are then mapped to NIST 800-171 and CMMC Level 2 frameworks.

This project is designed to reflect the entire NIST RMF methodology traced to all seven stages (Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor).

## Key Results

| Measurement | Before | After | Result |
| --- | --- | --- | --- |
| DC - Nessus (authenticated) | 25 findings | 18 findings | ↓ 28% |
| DC - Nessus (unauthenticated) | 24 findings | 18 findings | ↓ 25% |
| DC - SCC compliance (Server 2022 DC STIG V2.8) | 52.16% | 60% | ↑ 7.84% |

An interesting finding from this project is that default Windows Server 2022 images are already fairly hardened. PowerSTIG resolved the only medium vulnerability found by Nessus, which was a DNS Server Recursive Query Cache Poisoning. This meant that the PowerSTIG hardening and manual policy hardening had somewhat diminishing security returns compared to older versions of Windows Server.

## The Most Valuable Lesson

STIG-enforced User Rights Assignment restrictions locked RDP access out of the member server after PowerSTIG applied them, which made recovery require a PowerShell session over the Azure Serial Console. That failure taught me that production STIG deployments need a pre-planned, out-of-band access path before hardening in the case that access is lost. This reminded me of the common usability to security balance that has to be drawn in enterprise and government GRC work, which is often not an easy task.

## Skills Gained

This lab made the vulnerability-management lifecycle practical for me (scan → remediate → rescan against live infrastructure), and showed me where STIG automation ends and assessor judgment begins (~83% automated, the remaining ~17% and the entire AD Domain STIG requiring human decisions), and produced the applicability-determination and control-mapping artifacts that sit at the core of real GRC work.

This made the vulnerability management lifecycle practical for me when I followed the scan, remediate, and rescan procedure to ensure the changes I made produced the expected outcome. It also showed me how assessor judgement is still critical in the age of automation, and that cybersecurity management requires expert human oversight to ensure functional security across large organizations.