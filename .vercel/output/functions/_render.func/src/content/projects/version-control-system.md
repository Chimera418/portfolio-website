---
title: "Version Control System"
description: "A Git-like version control system built from scratch. Implements DAG-based commit history, Merkle Tree integrity, and branch management."
tags: ["Python", "Data Structures", "Cryptography"]
github: "https://github.com/Chimera418/Version-Control-System"
order: 4
---

## Re-inventing the Wheel

Everyone uses Git, but how many truly understand how it works under the hood? I decided to find out by building a distributed version control system from scratch in Python.

## Core Architecture

This isn't a wrapper around Git—it's a fundamental implementation of version control algorithms:

- **Directed Acyclic Graph (DAG)**: The commit history is structured as a robust DAG, allowing for complex branching and merging scenarios.
- **Merkle Trees**: Implemented cryptographic Merkle Trees to track file changes and ensure the integrity of the file system at any given commit. If a single byte is tampered with, the hash mismatch immediately exposes it.
- **Object Storage**: Designed an efficient blob-based object storage system to deduplicate file data across multiple commits, minimizing disk footprint.

## Key Features

- `init`, `add`, `commit` workflows mimicking standard VCS behavior.
- Branch creation and traversal.
- Hashing-based integrity checks for corruption detection.

## Why I Built It

This project was a deep dive into **Applied Cryptography** and **Advanced Data Structures**. It drastically improved my understanding of how modern file systems and version control tools ensure data integrity at scale.
