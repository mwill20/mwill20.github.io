---
layout: default # Adjust if your site uses a different default layout
title: Project - Personal Productivity Agent
permalink: /projects/personal-productivity-agent/
---

# Project: Personal Productivity Agent

I'm excited to share a project I've been developing: a **Personal Productivity Agent** for Windows! This Python-based tool is designed to help automate various tasks, provide system insights, and even leverage the power of Google's Gemini Large Language Model (LLM) for intelligent analysis.

**Check out the code on GitHub:**
[Personal Productivity Agent Repository](https://github.com/mwill20/PersonalProductivityAgent)

## What It Does

The agent is packed with features to make daily computing tasks easier and more insightful:

*   **Smart Windows Event Log Analysis:** This is a key feature. The agent can:
    *   Fetch specific Windows Event Logs.
    *   Use the Gemini LLM to analyze errors.
    *   Provide clear explanations, list potential causes, and offer troubleshooting steps.
    *   Suggest a safe command-line fix, indicating if it requires administrator privileges.
*   **File System Management:** Easily find, move, or rename files, and create directories, all with interactive confirmations.
*   **System Utilities:** Get quick information about your computer's disk usage, memory, CPU, and network status. You can also launch applications or find duplicate files.
*   **Productivity Boosters:** Summarize documents, view upcoming events from `.ics` calendar files, and set helpful desktop reminders.

## Two Modes of Operation

One of the powerful aspects of this agent is its flexibility:

1.  **Interactive Command-Line Assistant:**
    Simply run `python main_agent.py` in your terminal. You'll get a user-friendly menu to access all its features directly. This is great for hands-on use.

2.  **MCP (Multi-Capability Protocol) Server Mode:**
    By running `python main_agent.py --mcp-mode`, the agent transforms into a backend server. It listens for commands in a special JSON format (MCP) sent by other programs.
    *   **Why is this important?** It allows other applications or orchestrator agents (like the `agent.ts` TypeScript agent we've also explored) to use the Python agent's capabilities programmatically. For instance, `agent.ts` could ask the Python agent to analyze event logs and then display the results in a custom UI or trigger further automated actions.
    *   This architecture enables building more complex, modular AI systems where different agents specialize in different tasks and communicate seamlessly.

## Technologies Used

*   **Python:** The core programming language.
*   **Google Gemini LLM:** Powers the intelligent analysis features.
*   **JSON & Standard I/O:** Forms the basis of the MCP communication in server mode.

## Explore the Project

All the code for the Personal Productivity Agent, including the MCP server implementation, is available in its GitHub repository. I encourage you to take a look!

[Visit the Personal Productivity Agent Repository](https://github.com/mwill20/PersonalProductivityAgent)

---

This project demonstrates how scripting, AI language models, and inter-process communication can be combined to create genuinely useful and intelligent tools. I'm looking forward to developing it further!
