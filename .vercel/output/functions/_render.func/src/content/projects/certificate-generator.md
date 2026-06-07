---
title: "Certificate Generator"
description: "A Flask application for event-based certificate distribution. Features participant validation, server-side Pillow rendering, and bulk email delivery."
tags: ["Flask", "Python", "Pillow", "HTML/CSS"]
link: "https://csi-certificate-generator-odhy.onrender.com"
github: "https://github.com/Chimera418/Certificate-Generator"
order: 5
---

## The Problem

Managing and distributing certificates for large hackathons and events is a logistical nightmare. Organizers typically have to manually generate PDFs, cross-reference attendee lists, and send hundreds of individual emails.

## The Solution

A streamlined, full-stack **Flask** application designed to automate the entire lifecycle of event certificate generation and distribution.

### Technical Implementation

- **Data Validation**: Securely parses and validates participant data (from CSVs or databases).
- **Dynamic Rendering**: Utilizes the **Pillow (PIL)** library to programmatically overlay participant names, event details, and unique IDs onto beautiful template images on the server-side.
- **Bulk Email Distribution**: Integrates SMTP logic to automatically dispatch customized, rendered certificates to hundreds of participants simultaneously without triggering spam filters.
- **Web Dashboard**: A clean HTML/CSS interface allowing organizers to upload templates, manage lists, and trigger the generation process with a single click.

## Real-World Impact

Built primarily for CSI (Computer Society of India) events at my university, this tool reduced a multi-day administrative chore into a 5-minute automated workflow.
