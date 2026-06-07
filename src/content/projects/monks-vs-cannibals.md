---
title: "Monks vs Cannibals"
description: "Classic river crossing puzzle game implemented from scratch in the Jack programming language for the Nand2Tetris 16-bit virtual machine platform."
tags: ["Jack", "Nand2Tetris", "VM Architecture"]
github: "https://github.com/Chimera418/Monks-and-Cannibals"
order: 10
---

## Deep Under the Hood

Most games are built in high-level engines like Unity or Godot. This one was built in **Jack**, a Java-like language designed specifically to be compiled down to a custom 16-bit virtual machine as part of the legendary *Nand2Tetris* course.

## The Game

The classic logic puzzle: Three monks and three cannibals must cross a river using a boat that can carry at most two people. If the cannibals ever outnumber the monks on either side of the river, the monks get eaten, and it's game over.

## Technical Execution

Because Jack runs on a highly constrained simulated hardware platform, every visual and logical element had to be meticulously managed:
- **Direct Memory Manipulation**: Sprites and graphics are drawn by directly manipulating the screen memory map.
- **Custom Event Loops**: No standard libraries here—keyboard polling, game state updates, and rendering cycles were all written from scratch.
- **Memory Efficiency**: The 16-bit hardware environment enforces strict memory constraints, requiring highly optimized object-oriented design and garbage collection workarounds.

## Why Jack?

Building this game was the ultimate test of understanding the entire computing stack—from boolean logic gates and CPU architecture, all the way up to high-level game design.
