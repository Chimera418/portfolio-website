---
title: "Drug Conflict Detection"
description: "A Multi-Agent AI prototype for intelligent prescription conflict detection. Utilizes severity-prioritized search algorithms to analyze drug interactions."
tags: ["Python", "AI", "Agents"]
link: "https://drug-conflict-detection.streamlit.app"
github: "https://github.com/Chimera418/drug-conflict-detection"
order: 3
---

## Overview

Prescribing multiple medications simultaneously carries significant risks due to adverse drug-drug interactions (DDIs). Standard conflict detection systems often flag hundreds of minor warnings, leading to "alert fatigue" where doctors might accidentally ignore critical, life-threatening conflicts.

## Intelligent Detection

This project approaches the problem using **Multi-Agent AI** and **Severity-Prioritized Search Algorithms**:

- **Context-Aware Agents**: Instead of simple database lookups, the agents analyze patient profiles alongside the prescription list to contextually evaluate the risk of drug interactions.
- **Severity Prioritization**: The search algorithm is tuned to surface high-severity, contraindicating interactions first, suppressing low-priority noise so that healthcare providers can focus on what actually matters.
- **Prototype UI**: Deployed via Streamlit, allowing users to input a mock list of prescriptions and receive an instant, tiered breakdown of potential conflicts.

## Technical Stack

- **Python**: Core logic and data processing.
- **AI/LLMs**: Intelligent agents utilized for nuanced understanding of drug interaction literature.
- **Streamlit**: Fast, responsive web interface for prototyping.
