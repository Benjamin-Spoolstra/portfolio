---
title: "Azure Cloud SOC Home Lab"
summary: "A cloud-based SOC built from scratch in Azure with Terraform with an attacker VM, a misconfigured victim VM, and a Wazuh 4.14 SIEM, which are all used to run a full attack-and-detect cycle with custom detection rules mapped to the MITRE ATT&CK framework."
date: 2026-04-10
category: "defensive"
skills: ["Infrastructure as Code", "SIEM administration", "Detection engineering", "Cloud network security"]
tools: ["Terraform", "Azure", "Wazuh 4.14", "cloud-init", "Nmap", "Hydra", "MITRE ATT&CK"]
repoUrl: "https://github.com/Benjamin-Spoolstra/Projects/blob/main/SOC%20Lab.md"
order: 2
featured: true
---

## Overview

This project consists of a cloud-based Security Operations Center (SOC) built from scratch in Microsoft Azure as a hands-on platform for threat detection, SIEM administration, and attack simulation. I wanted blue-team experience beyond what certifications and theory provide, so rather than a local VM setup I deployed the whole lab in Azure, which helped me gain real cloud-infrastructure experience while learning detection engineering.

The project is designed around a realistic attack-and-detect scenario where a dedicated attacker machine runs live credential attacks and reconnaissance against an intentionally misconfigured target, while a central SIEM ingests logs from both machines and surfaces the activity as mapped alerts. Every component is deployed through Infrastructure as Code (IaC), so the environment is fully standardized, reproducible, and repeatable.

## Environment

The environment consists of three Ubuntu 22.04 VMs across three segmented Azure subnets. One is a Wazuh 4.14 SIEM hub acting as a log manager, indexer, and dashboard. Another is a attacker VM, and the last one is a victim VM. Access is restricted to SSH key authentication with NSG rules restricting management interfaces to a single source IP. This ensures the environment can't be accessed from the outside.

## Infrastructure & Automation

All infrastructure is provisioned with Terraform in a modular layout such that a root module calls separate child modules for networking, SIEM, attacker, and victim. Each VM receives its full configuration at first boot via cloud-init, so the SOC can be fully operational with zero manual server configuration. 

## Logical Network Diagram
![Logical network diagram](/images/soc-lab/soc-lab-network-design.svg)

Key Design Decisions:

- **Network Segmentation** - Three subnets and NSGs enforcing least privilege network access controls are dedicated to each machine. Network traffic flow from the attacker machine can only go from the attacker subnet to the victim subnet, and SOC monitoring traffic only flows to the SOC subnet. The attacker machine cannot interact or reach the SOC subnet.
- **Static, Private SIEM IP** - Ensures both agent cloud-init scripts can reference a known address at boot, with no dependency on Terraform outputs.
- **NSG Home-IP Restriction** - SSH and the Wazuh Dashboard are limited to a single source IP so the management interfaces are never exposed to the internet.
- **cloud-init Automation** - The SIEM machine automatically ships with the full Wazuh suite. The attacker machine installs Hydra, Nmap, and the Wazuh agent, and the victim machine installs vsftpd with intentionally weak credentials, enables SSH password auth, and enrolls its agent.

## Methodology

Three sequential phases mirror a real attack-and-detect workflow:

1. **Infrastructure Deployment** - Terraform deploys the resource group, VNet, three subnets, NSGs, public IPs, and all three VMs in dependency order in one run. After around 20 minutes of the first startup the Wazuh Dashboard is live and both agents start running automatically.
2. **Attack Simulation** - An Nmap service scan starts from the attacker machine and maps the victim's open ports. Then Hydra runs a dictionary attack against FTP, which generates a sustained stream of authentication failures before landing the credential. Because the attacker also runs an agent, the SIEM gets dual-perspective visibility.
3. **Detection & Investigation** - Custom XML rules mapped to common MITRE ATT&CK TTPs fire on the authentication failure patterns, which escalate the alerts to level 12. The events view, MITRE ATT&CK view, and a custom alerts dashboard visualize the full attack simulation timeline.

Across the run, the SIEM generated 1 critical, 502 medium, and 1,675 low severity alerts during the attack window. The Credential Access technique (T1110.001, Password Guessing) dominated the alert count at 112 hits, which accurately reflects the type of attack being simulated.

## Skills gained

The lab built real operational experience across four areas: 
1. **IaC** - Deployed a modular Terraform infrastructure with multiple resource dependencies while working through partial-deploy failures.
2. **Cloud Network Security** - Designed an NSG ruleset from the minimum required traffic routes while working within Azure quotas.
3. **SIEM Administration** - Stood up Wazuh from scratch which included enrolling agents across multiple VMs, diagnosed agent disconnects, and configured an OpenSearch-based indexer to parse and read logs.
4. **Detection Engineering** - Crafted basic detection rules using the standard parent-child rule model that triggered if specific traffic and behavior matched the signatures