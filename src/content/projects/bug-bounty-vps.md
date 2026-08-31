---
title: "Bug Bounty VPS"
summary: "A hardened Kali Linux VPS built from scratch as a dedicated remote platform for bug bounty hunting, penetration testing, and CTFs."
date: 2026-05-22
category: "offensive"
skills: ["Linux hardening", "Recon pipeline design", "Secure remote access", "Methodical documentation"]
tools: ["Kali Linux", "Subfinder", "Amass", "httpx", "Katana", "Nuclei", "Caido", "TigerVNC", "tmux"]
repoUrl: "https://github.com/Benjamin-Spoolstra/Projects/blob/main/Bug%20Bounty%20VPS.md"
order: 1
featured: true
---

## Overview

This project consists of a hardened Kali Linux VPS built from scratch as a dedicated, remote platform for bug bounty hunting, penetration testing, and CTF challenges. Running engagements from a VPS rather than a laptop gives me a stable environment and the flexibility to hunt effectively even with limited time. I can easily kick off long recon jobs remotely and pick up where I left off. A structured file system and repeatable methodology let me move through the phases of testing efficiently and make meaningful progress in the time I have.

The environment pairs a Kali VPS with my local workstation, Caido as the proxy, GUI access to the server over a VNC-through-SSH tunnel, and a local DVWA target for safely exercising the full tool pipeline before touching any real program.

## Hardening

Before any testing, the box is hardened around the goal of reducing the attack surface by disabling every service, port, and default behavior that isn't strictly necessary. 

Key controls:

- **SSH** - Key-only authentication with the root login disabled and idle timeout enforced in the case of a disconnection.
- **Firewall** - UFW default-deny inbound with only necessary ports open.
- **Brute-force protection** - Fail2ban with a PAM lockout at the network and OS level.
- **Kernel hardening** - ASLR, ptrace restrictions, SYN-flood protection, IP forwarding disabled, and kernel pointer exposure restricted.
- **Filesystem** - Common execution directories like `/tmp` restricted to no execution, restrictive umask, and tightened home-directory permissions.
- **Service cleanup** - Unnecessary desktop services stopped and disabled with IPv6 removed entirely.

VNC is forwarded through a single SSH tunnel such that GUI access adds no extra open ports. A DVWA container running locally on the server serves as a safe local target for validating tools before any real engagement.

## Methodology

Engagements follow a three-phase approach:

1. **Passive recon** runs entirely against third-party datasets (certificate transparency, Wayback, Shodan, GitHub) with zero traffic to the target, which produces a full attack-surface map before the target receives a single request.
2. **Active enumeration** restricts DNS resolution, HTTP probing, live crawling with Katana, JavaScript analysis, and safe Nuclei template checks to 5 requests per second to respect potentially weak servers. Every command carries a rate limit and an identifying User-Agent so security teams can recognize the traffic.
3. **Manual testing** uses Caido against the most interesting endpoints, covering XSS, IDOR, SSRF, open redirects, CORS misconfigurations, auth logic flaws, error-based SQLi, GraphQL enumeration, and HTTP verb tampering.

Each engagement spins up through a setup script that builds a consistent directory structure, a pre-structured engagement log, and a named tmux session with dedicated windows for recon, testing, monitoring, and shell access.

## Toolset highlights

A 20-tool pipeline spanning passive recon (Subfinder, Assetfinder, Amass, Chaos), DNS/HTTP (dnsx, httpx), crawling and URL discovery (Katana, gau, waybackurls), analysis (gf, unfurl, LinkFinder, SecretFinder), fuzzing and scanning (ffuf, Nuclei), out of band detection (interactsh), and manual testing (Caido), which are glued together with anew for deduplication and tmux for session management.

## Skills gained

Beyond the tooling, this project built practical intuition for Linux server hardening, for designing a recon pipeline that turns a wide attack surface into a prioritized target list, and for SSH tunneling as a security skill rather than just a way to get a shell. 
