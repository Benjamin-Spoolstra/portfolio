---
title: "Forge Coupon"
summary: "An OWASP Juice Shop web exploitation challenge where a player must forge arbitrary discount coupons by reverse-engineering a z85-encoded coupon structure."
date: 2026-08-25
kind: "ctf"
platform: "OWASP Juice Shop"
category: "web"
difficulty: "hard"
tags: ["web", "crypto-failures", "reverse-engineering", "owasp-top-10"]
---

## Challenge

The OWASP Juice Shop web application generates discount coupons using a predictable, reversible encoding rather than real cryptography. The goal was to mint a coupon for an arbitrary discount by reversing the encoding and forging a valid coupon for 80% off or above.

## Approach

**1. Obtain a Sample.** I first grabbed a legitimate coupon code from the shop's public BlueSky page to study its structure.

![A valid coupon code obtained from the shop's public page](/images/forge-coupon/valid-coupon.png)
*A legitimate coupon code sourced from the shop's public BlueSky page.*

**2. Identify the Encoding.** Analyzing the code for known signatures pointed to **z85** (ZeroMQ Base-85). This was confirmed by cross-referencing the application's package/backup files, which showed z85 in use.

![Application backup file confirming z85 encoding](/images/forge-coupon/identify-z85.png)
*The application's backup file confirms z85 is the encoding in use.*

**3. Decode the Structure.** Running the coupon through a decoder exposed the plaintext layout, which included the discount amount as a field at the end of the structure.

![Decoded coupon revealing its plaintext structure and discount field](/images/forge-coupon/decode-structure.png)
*Decoding exposes the plaintext structure, including the discount amount field.*

**4. Tamper and Re-Encode.** Because the value is only encoded, not signed, I edited the discount field to an arbitrary percentage and re-encoded it back to a valid-looking z85 coupon.

**5. Confirm Impact.** Applying the forged coupon at checkout on any account applied the inflated discount successfully.

![Forged coupon applying an arbitrary discount at checkout](/images/forge-coupon/discount-applied.png)
*The forged coupon applies an arbitrary discount at checkout.*

## Defensive Analysis

The root cause is using a reversible encoding for a value that authorizes a financial action. Encoding provides zero integrity because it's trivially reversible and re-writable. Values that grant discounts, credit, or access (coupons, gift cards, tokens) need a real cryptographic guarantee, such as a server-side signature (e.g. HMAC) or authenticated encryption (AES-GCM) so any tampering invalidates the value. Client-visible fields should never be trusted for authorization decisions without that integrity check.