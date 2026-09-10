---
title: "GPU Password Cracking Lab"
summary: "Built a cloud password cracking rig on RunPod with an NVIDIA Blackwell RTX 5090 GPU to benchmark hashcat against self-generated MD5, NTLM, and WPA2 hashes. Cracked between 83% and 100% of generated hashes across all three tests using optimized dictionary and rules attack."
date: 2026-09-01
category: "offensive" 
skills: ["Cloud Provisioning", "Dictionary Attacks", "Brute Force Attacks"]
tools: ["Hashcat", "CUDA", "Kali Linux"]
repoUrl: "https://github.com/Benjamin-Spoolstra/Projects/blob/main/GPU%20Password%20Cracking%20Lab.md"
order: 4                 
featured: true
---

## Motivation

Password cracking is a core competency in offensive security and is an area I felt I was weak in. I researched and built this project as a means of learning password cracking practically using hashcat. Another primary goal for this project I had was building an intuition for which hashing algorithms could be cracked efficiently and quickly. Not every hashing algorithm is equal in terms of crackability. MD5 can be brute forced in a matter of hours, but WPA2 could take years. Finally, I was aware that GPUs were better for password cracking, but I didn't know how. This project taught me the value of GPU parallel processing and how limited CPUs can get with repetitive operations.

---

## Environment

The rig is a single-GPU RunPod pod in the EU-RO-1 (Romania) datacenter, backed by a persistent
network volume so tooling and results survive pod restarts.

| Component | Details |
|-----------|---------|
| Provider / tier | RunPod, Secure Cloud, On-Demand |
| Region | EU-RO-1 (Europe - Romania) |
| GPU | 1× NVIDIA GeForce RTX 5090 - 32 GB GDDR7 (Blackwell) |
| CPU / RAM | 16 vCPU, 60 GB RAM |
| Template | Runpod PyTorch 2.8.0 |
| OS | Ubuntu 24.04 |
| Driver / CUDA | 580.178.04 / CUDA 13.0 |
| Container disk | 30 GB (ephemeral) |
| Persistent storage | 50 GB network volume |
| GPU cost | $0.99/hr on-demand |
| Cracking tool | hashcat v7.1.2 (built from source) |

---

## Hardening & Infrastructure

I provisioned a RunPod network volume in the EU-RO-1 region, and then deployed the pod with the network volume attached to it. This configuration ensures that both resources are tied to the same origin and the data stays present even if the pod is deallocated to reduce costs.

---

The RTX 5090 GPU allocated to the pod is a Blackwell card and is perfectly compatible with hashcat v7.1.2 which requires a CUDA of 12.8 or later. This means the GPU can be properly read and leveraged during processing to significantly reduce the cracking time. 

The Secure Cloud was utilized for this pod to ensure the data and processes occurring stay private to the creator and no other users. Teardown involves secure deallocation and termination of any pod instances such that all sensitive data is removed upon process completion. Access is provisioned via SSH key authentication so no brute forcing is possible.

---

## Toolset

| Tool | Category | Purpose |
|------|----------|---------|
| hashcat 7.1.2 | Password recovery | GPU-accelerated cracking of MD5, NTLM, and WPA2 hashes |
| RunPod | Cloud GPU | On-demand RTX 5090 compute with a persistent network volume |
| NVIDIA driver / CUDA | GPU runtime | CUDA backend hashcat runs its kernels on |
| rockyou.txt (SecLists) | Wordlist | Dictionary-attack candidate list |
| best66.rule | Rule set | Candidate mutation |
| Python | Hash generation | Derive NTLM and WPA2 test hashes offline |
| md5sum | Hash generation | Generate MD5 sample hashes from known plaintexts |
| passlib | Hash generation | Generate NTLM sample hashes |

---

## Methodology

### 1. Provision the rig

Deployed the RunPod PyTorch 2.8.0 pod with an RTX 5090 in EU-RO-1, attaching the pre-created
50 GB network volume and enabled ssh key authentication for terminal access.

---

### 2. Verify the GPU and hashcat backend

Confirmed the card and driver were recognized by the pod with the NVIDIA System Management Interface (SMI), and then verified hashcat could see the GPU.

---

### 3. Generate sample hashes from known plaintexts

To keep the lab self-contained and guarantee crackable targets, I generated all hashes myself from
a small plaintext list of entries commonly found in the `rockyou.txt` wordlist.

---

### 4. Crack the fast hashes (MD5 & NTLM)

Ran a dictionary attack with the `rockyou.txt` wordlist using the `best66.rule` against each set. Both recovered 5 of 6
passwords instantly, while `Summer2024!` survived, since it isn't in the rockyou wordlist and
the rule didn't mutate a base word into it. That single holdout reflects the reality that arbitrary passwords are better than guessable ones, which can be found almost immediately.

---

### 5. Crack a slow hash (WPA2)

WPA2 is more complex than MD5 and NTLM because it's tied to both a network identity and passphrase, so I configured an example network identity for this lab to test the hashes against.

The result is that 6 out of the 6 passwords were recovered as they were common enough to be found with the wordlist.

---

**Results Summary**

| Hash Type | Mode | Recovered | Observed Speed | Runtime |
|-----------|------|-----------|----------------|---------|
| MD5 | 0 | 5/6 | ~4.9 GH/s | < 10 s |
| NTLM | 1000 | 5/6 | ~3.6 GH/s | < 10 s |
| WPA2 | 22000 | 6/6 | ~3.4 MH/s | 4 s |


## Skills Gained

Some practical skills I gained from this project include cloud GPU provisioning in RunPod, installing and configuring hashcat for real engagements, and building a crackability intuition based on hashing complexity and efficacy of rules. I understand now how complex passwords are essential to defeating offline brute force attacks. If your password or a predictable variation isn't in common wordlists than it's going to be very difficult for an attacker to recover it outside of leaking it directly from the source.
