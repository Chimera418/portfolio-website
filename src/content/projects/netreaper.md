---
title: "NetReaper"
description: "Adversarial-resilient intrusion detection pipeline on NSL-KDD using baseline classification, adversarial attack simulation, and an Isolation Forest safety net."
tags: ["Python", "Machine Learning", "Cybersecurity", "Streamlit"]
link: "https://github.com/Chimera418/Netreaper"
github: "https://github.com/Chimera418/Netreaper"
order: 3
date: "2026-03"
---

## Overview

NetReaper is an adversarial-resilient machine learning security prototype built for intrusion detection on the classic NSL-KDD dataset. Traditional network intrusion detection systems (NIDS) are notoriously susceptible to adversarial perturbations—carefully crafted packet noise designed to deceive classifiers into marking malicious traffic as benign.

NetReaper counters this vulnerability using a multi-stage defense-in-depth pipeline paired with an interactive real-time Streamlit analytics dashboard.

## Three-Stage Pipeline Architecture

```text
[Network Data] 
       │
       ▼
[Stage A: Baseline Classifier (RF / XGBoost)] ──> [Clean Prediction Metrics]
       │
       ▼
[Stage B: Adversarial Attack Simulation]      ──> [Perturbed Traffic Samples]
       │
       ▼
[Stage C: Isolation Forest Safety Net]        ──> [SHAP Explainability & Anomaly Recovery]
```

### 1. Stage A: Baseline Binary Classifier
Trains Random Forest (`rf`) and XGBoost (`xgb`) models to establish high-accuracy baseline intrusion detection on clean NSL-KDD network packets.

### 2. Stage B: Adversarial Simulation
Simulates evasion attacks by injecting realistic adversarial feature perturbations into malicious traffic to test classifier fragility and measure prediction drop-off.

### 3. Stage C: Anomaly Safety Net
An unsupervised Isolation Forest algorithm monitors the latent feature space independently of the primary classifier. When adversarial perturbations push attack samples past the classification boundary, the safety net flags the out-of-distribution anomaly.
- **Defensive Rule:** Classify as attack if `(clf_pred == 1) OR (anomaly_pred == -1)`.

## Streamlit Dashboard Features

- **Interactive Metric Deltas**: Visualizes attack impact drop-off and post-safety-net recovery metrics in real time.
- **SHAP Explainability**: Integrates SHAP summary plots to show which packet features influenced the anomaly detector's decisions.
- **Confusion Matrices & Distributions**: Dynamic drill-down across baseline, attacked, and verified stages.
