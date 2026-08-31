---
title: "OverTheWire: Bandit (0–33)"
summary: "A series of Linux command line challenges with 34 levels in total. Challenges cover Linux fundamentals, from file system navigation and data encodings to networking, SSH keys, cron-based privilege escalation, and git forensics."
date: 2026-06-15
kind: "ctf"
platform: "OverTheWire"
category: "misc"
difficulty: "easy"
tags: ["linux", "privilege-escalation", "networking", "git", "fundamentals"]
---

## Overview

Bandit is OverTheWire's foundational Linux wargame, where each level hands you the credential to the next by making you extract it with the right command-line technique. Working through all 34 levels (0–33) built fluency across the core skills that everything else in offensive security rests on. 

## Skills by theme

- **Filesystem Navigation & Awkward Filenames (0–5).** - Reading files whose names start with dashes, contain spaces, or are hidden, quoting/escaping identifiers, and using size, user, and group permission predicates to locate a file by its properties rather than its name.
- **Data Manipulation & Encodings (6–12).** - Using `grep`, `sort | uniq -u`, and `strings` to pull a specific string from a lot of extra data. Decoding base64, reversing a ROT13 substitution with `tr`, and peeling back a file repeatedly wrapped in gzip/bzip2/tar by using `file` to identify each layer and `xxd` to reverse a hexdump.
- **Networking & TLS (14–16).** -  Talking to services directly with netcat, wrapping connections in TLS, and using Nmap to sweep a port range and find the listening service before connecting.
- **SSH Keys & Port Knocking (13, 16–18).** - Moving private keys with secure copy protocol, fixing permissions with change mode, authenticating with SSH, and running a single remote command over SSH non-interactively.
- **Privilege Escalation via Cron (21–24).** - Reading cron job definitions, tracing the scripts they run, and exploiting a world-writable script directory by dropping a script that copies a protected password file somewhere readable, then waiting for the privileged cron to execute it.
- **Restricted-shell & brute-force scripting (24–25).** - Writing a small bash loop to brute-force a 4-digit PIN over a single netcat connection, and escaping a restricted view shell by shrinking the terminal and dropping into a text editor where a bash shell could be established.
- **Git forensics (27–31).** - Cloning a repo over SSH and recovering secrets from git history such as inspecting commit logs, checking out a developer branch, reading tags, finding metadata on specific commits, and even committing and pushing to trigger a server-side hook.

## Key takeaways

The value of Bandit is working through all the unique challenges from basic filesystem navigation to full cron job privilege escalation and remote repository exploitation. These fundamentals show up constantly in real engagements.
