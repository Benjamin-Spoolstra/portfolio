---
title: "Quizploit: Binary Analysis"
summary: "A CyLab Academy CTF challenge where a stack buffer overflow vulnerability gates a flag behind 13 questions about the executable's structure and mitigations. It can be solved by static analysis with file, checksec, and nm utilities in Linux."
date: 2026-08-13
kind: "ctf"
platform: "CyLab Academy"
category: "pwn"
difficulty: "easy"
tags: ["binary-exploitation", "static-analysis", "elf", "picoctf"]
---

## Challenge

This challenge consists of a vulnerable C binary that contains a stack buffer overflow. The flag isn't obtained by exploiting the overflow directly. Instead the challenge asks 13 questions about the binary's structure, mitigations, and source, and answering all of them reveals the flag.

## Approach

After pulling down the binary and its C source, and connecting to the remote service over netcat, I worked through the questions with three standard analysis utilities.

`file` identified the target as a 64-bit ELF executable, which answered the first several questions about its type and architecture.

![file command output identifying a 64-bit ELF executable](/images/quizploit/file-output.png)
*The `file` utility inspects the binary and reports it as a 64-bit ELF executable.*

Source review of the `vuln()` function showed the buffer declared as `0x15` bytes, which is hex for 21, the value the overflow question was looking for.

![C source showing the vulnerable buffer declaration](/images/quizploit/source-buffer.png)
*The `vuln()` buffer is declared as `0x15`.*

**`checksec` reported the binary's hardening with NX enabled, which means the stack is non-executable, and a real exploit would need a code-reuse approach rather than injected shellcode to exploit the buffer overflow.

![checksec output showing NX enabled](/images/quizploit/checksec.png)
*`checksec` confirms NX is enabled.*

`nm` dumped the symbol table to locate the `win()` function, which is an unused function never called during normal execution at address `0x401176`. That address was the final answer that unlocked the flag.

![nm symbol table output locating the win function](/images/quizploit/nm-win.png)
*`nm` locates the unused `win()` function at `0x401176`.*

## Key takeaway

- The core lesson is that binary analysis is an essential skill required to effectively identify vulnerabilities and craft subsequent exploits. The `file`, `checksec`, and `nm` utilities tell you the architecture, and studying the C source code allows exploit developers to understand what mitigations have to be overcome for their exploits to work.
