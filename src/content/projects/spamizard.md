---
title: "Spamizard"
description: "Smart email classifier and AI-powered reply assistant built with Scikit-learn's Naive Bayes & TF-IDF, wrapped in a clean Flask web interface."
tags: ["Scikit-Learn", "Flask", "Python"]
link: "https://spamizard.onrender.com"
github: "https://github.com/Chimera418/Spamizard"
order: 6
---

## Spam meets Wizardry

Spamizard is a full-stack machine learning application designed to classify emails as Spam or Ham (Not Spam) and automatically generate intelligent replies.

## The Model

- **Algorithm**: Utilizes a Multinomial Naive Bayes classifier, which is highly effective for text classification tasks based on word frequencies.
- **Feature Extraction**: Uses TF-IDF (Term Frequency-Inverse Document Frequency) vectorization to map textual email data into numerical features, heavily weighting unique words while discounting common stop-words.
- **Training**: Trained on a robust dataset of over 5,000 labeled emails, achieving over 96% accuracy on unseen validation data.

## The Web Interface

The model is deployed via a **Flask** backend with a responsive, modern web interface. Users can paste in raw email content, and the server runs real-time inference to determine if the email is a threat or a genuine message. If it's genuine, the system provides an AI-assisted quick reply template.
