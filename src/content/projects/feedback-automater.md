---
title: "Feedback Automater"
description: "End-to-end Playwright automation tool with a Streamlit UI to handle tedious university portal feedback forms, including automated Outlook OTP verification."
tags: ["Python", "Playwright", "Streamlit"]
github: "https://github.com/Chimera418/aseb-feedback-automator"
order: 9
---

## The Ultimate Automation

At my university, filling out end-of-semester feedback forms for dozens of courses and labs is a notoriously tedious, multi-step process. I built the Feedback Automater to solve this pain point entirely.

## How It Works

This tool is a masterclass in web scraping, browser automation, and bypassing friction:

1.  **Playwright Core**: Uses Python Playwright to spin up a headless browser, navigate to the portal, and interact with the complex DOM of the feedback forms.
2.  **OTP Bypassing**: The university portal requires an Outlook OTP to login. I integrated IMAP/Outlook scraping logic to automatically intercept the OTP email, parse the code, and inject it into the login field. The user never has to check their inbox.
3.  **Streamlit UI**: Provides a dead-simple, accessible UI where users just put in their credentials, and the script handles the rest.

## Impact

What used to take 20 minutes of mind-numbing clicking and typing now takes 15 seconds. It's a perfect example of identifying a real-world friction point and engineering a robust, end-to-end automation pipeline to destroy it.
