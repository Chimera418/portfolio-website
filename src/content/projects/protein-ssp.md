---
title: "Protein SSP"
description: "End-to-end deep learning pipeline predicting protein secondary structures from raw amino acid sequences using ProtT5-XL-UniRef50 and a custom 1D-CNN+BiLSTM architecture."
tags: ["PyTorch", "Hugging Face", "Streamlit", "Python"]
link: "https://huggingface.co/spaces/Chimera418/protein-ssp"
github: "https://github.com/Chimera418/protein-ssp"
order: 2
---

## The Challenge

Proteins are the workhorses of biology, and their function is fundamentally tied to their 3D structure. Determining this structure experimentally is slow and expensive. While AlphaFold solved the 3D folding problem, there's still a massive need for lightweight, ultra-fast secondary structure prediction (SSP) that can run on standard hardware.

## The Solution

This project implements a hybrid deep learning architecture that accurately predicts secondary structures (Alpha-helix, Beta-sheet, Coil) directly from raw amino acid sequences. 

### Architecture

1.  **Language Model Embeddings**: Uses the massive **ProtT5-XL-UniRef50** model (from the Rost Lab) to extract rich, context-aware embeddings for every amino acid in a sequence. It treats protein sequences like natural language.
2.  **Local Feature Extraction**: A **1D Convolutional Neural Network (CNN)** sweeps across the sequence to capture local neighborhood interactions between adjacent amino acids.
3.  **Global Context**: A **Bidirectional LSTM (BiLSTM)** processes the sequence in both directions to understand long-range dependencies across the entire protein chain.
4.  **Classification**: A final dense layer maps these combined features into Q3 (3-state) or Q8 (8-state) structural predictions.

## Impact & Usability

The entire pipeline is wrapped in a user-friendly **Streamlit** interface and hosted on **Hugging Face Spaces**. Researchers can simply paste a FASTA sequence and instantly get high-accuracy secondary structure predictions without needing a GPU cluster.
