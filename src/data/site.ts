// ────────────────────────────────────────────────────────────────
// SITE DATA — edit this file to update most of the homepage content.
// Nothing here is scraped live; it's your content to own and change.
// ────────────────────────────────────────────────────────────────

export const profile = {
  name: "Benjamin Spoolstra",
  handle: "benjamin-spoolstra",
  role: "Offensive Security",
  tagline:
    "Aspiring offensive security professional specializing in web application and internal network penetration testing across Active Directory and cloud environments. Documenting the labs, CTFs, and projects along the way.",
  // The terminal widget lines. `type` is: prompt | out | comment
  terminal: [
    { type: "prompt", text: "whoami" },
    { type: "out", text: "pentester, ctf player, security researcher" },
    { type: "prompt", text: "cat focus.txt" },
    { type: "out", text: "web app + internal network pentesting, AD, cloud" },
    { type: "prompt", text: "cat goals.txt" },
    { type: "out", text: "red teaming, adversary emulation, CPTS" },
    { type: "cursor", text: "" },
  ],
};

export const stats = [
  { n: "Top 10%", l: "Cylab Academy 2026" },
  { n: "+30%", l: "Vulns Found vs Baseline" },
  { n: "-28%", l: "Attack Surface (STIG)" },
  { n: "100+", l: "Attacks Detected (SOC)" },
];

// ── Certifications ──────────────────────────────────────────────
export const certifications = [
  { code: "PenTest+", issuer: "CompTIA" },
  { code: "CySA+", issuer: "CompTIA" },
  { code: "Security+", issuer: "CompTIA" },
  { code: "Network+", issuer: "CompTIA" },
  { code: "A+", issuer: "CompTIA" },
  { code: "AZ-900", issuer: "Microsoft Azure" },
  { code: "AWS CCP", issuer: "Amazon Web Services" },
];

// ── Roadmap: upcoming certs + planned projects (edit freely) ────
export const upcomingCerts = [
  { t: "CWES", d: "HackTheBox Certified Web Exploitation Specialist", when: "In progress", active: true },
  { t: "CPTS", d: "HackTheBox Certified Penetration Testing Specialist", when: "Planned", active: false },
];

export const upcomingProjects = [
  { t: "HashCat Cracking Rig with NVIDIA GPUs", d: "Centralized Location for Password and Hash Cracking", when: "Planned", active: false },
  { t: "Autonomous AI Penetration Testing Framework", d: "AI Penetration Testing Framework to Speed up Bug Bounty Hunting", when: "Planned", active: false },
];

// ── Skills (label + 0-10 level, rendered as a bar) ──────────────
export const skills = [
  { label: "Web App Pentesting", level: 8 },
  { label: "Network Pentesting", level: 8 },
  { label: "Active Directory", level: 7 },
  { label: "Cloud (AWS / Azure)", level: 7 },
  { label: "Blue Team / SIEM", level: 6 },
  { label: "GRC / Risk Mgmt", level: 6 },
];

// ── About copy (Markdown-ish; ** bold ** and _italic_ supported) ─
export const about = [
  "I'm an aspiring **offensive security professional** with about a year of technical experience in web application and internal network penetration testing across Active Directory and cloud environments. My background spans technical support in higher education and pentest engagements for finance and healthcare clients at a growing cybersecurity firm.",
  "I care about understanding security tools to a _deep_ level rather than running them with default settings, so I can conduct quiet, deliberate testing that emulates real, advanced adversaries. I'm not here to check a compliance box. I want to help organizations meaningfully strengthen their true security posture by finding gaps before real attackers do.",
  "Currently working toward **red teaming and adversary emulation**, with emerging interest in IoT/hardware security, low-level programming, and malware reverse engineering. B.S. in Cybersecurity at Grand Canyon University (President's List), expected graduation April 2027.",
];

// ── Contact / links ─────────────────────────────────────────────
export const contact = [
  { k: "github", v: "github.com/Benjamin-Spoolstra", href: "https://github.com/Benjamin-Spoolstra" },
  { k: "email", v: "bspoolstra@proton.me", href: "mailto:benjaminspoolstra@gmail.com" },
  { k: "linkedin", v: "linkedin.com/in/benjamin-spoolstra-2a6b5b332/", href: "https://www.linkedin.com/in/benjamin-spoolstra-2a6b5b332/" },
  { k: "CyLab Academy", v: "Profile", href: "https://learn.cylabacademy.org/users/BenSec" },
  { k: "TryHackMe", v: "Profile", href: "https://tryhackme.com/p/benjaminspoolstra" },
  { k: "HackTheBox", v: "Profile", href: "https://profile.hackthebox.com/profile/019ebcfb-1199-72c0-9d9c-a5d5941f9f50" },
  { k: "HackerOne", v: "Profile", href: "https://hackerone.com/1ben_sec1?type=user" },
];

// ── External writeup collections (link out to your repos) ───────
export const writeupRepos = [
  { name: "CTF Writeups", desc: "CloudGoat, CyLab Academy, GOAD, Lakera AI, OWASP Juice Shop, OverTheWire", href: "https://github.com/Benjamin-Spoolstra/CTF-Writeups" },
  { name: "Lab Writeups", desc: "TryHackMe, HackTheBox, PortSwigger, HackSmarter", href: "https://github.com/Benjamin-Spoolstra/Lab-Writeups" },
  { name: "CTF Resources", desc: "Curated tooling and references by category", href: "https://github.com/Benjamin-Spoolstra/CTF-Resources" },
  { name: "Certification Resources", desc: "Everything used to pass Sec+, CySA+, PenTest+, and more", href: "https://github.com/Benjamin-Spoolstra/Certification-Resources" },
  { name: "Cyber Career Resources", desc: "Hub for all cybersecurity career resources", href: "https://github.com/Benjamin-Spoolstra/Cyber-Career-Resources" },
{ name: "Red Team Resources", desc: "Collection of tools and cheat sheets for red teaming engagements", href: "https://github.com/Benjamin-Spoolstra/Red-Teaming-Resources/" },
];
