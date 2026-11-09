# Project Agent Rules & Execution Protocol

## 1. Project Context & Tech Stack
- **Architecture:** Lightweight, vanilla web applications and single-file or minimal-file tools (HTML5, Vanilla CSS, Vanilla JavaScript/Canvas).
- **No Bloated Frameworks:** Do NOT assume the presence of React, Vue, Angular, Webpack, Vite, or complex Node.js build pipelines unless explicitly shown in `package.json`.
- **File Structure:** Flat and minimal. Most logic resides in 1 to 3 core files (`index.html`, `style.css`, `app.js` / `script.js`).

## 2. Strict Anti-Loop & Tool-Use Budget (CRITICAL)
You have a tendency to over-analyze and run redundant terminal commands. You MUST obey these execution limits:
- **Maximum Command Budget:** Execute at most **1 to 2 terminal commands** per user prompt. Most tasks require **ZERO** terminal commands.
- **No Redundant Reads:** Read a target file **ONCE**. Once its contents are in your context window, NEVER read or analyze the same file again before making an edit.
- **No Blind Directory Crawling:** Do NOT run `find`, `grep`, `tree`, `ls -la`, or `cat` across the workspace to "understand the project." Look only at the files open in the editor or explicitly named by the user.
- **No Unnecessary Verification Loops:** For static HTML/JS/CSS changes, do NOT spin up background servers, headless browsers, or linters unless explicitly asked to test. Write the code and finish the turn.

## 3. Execution Workflow (Read -> Edit -> Stop)
Follow this exact 3-step pipeline for every task:
1. **Locate:** If the target file is already in context, skip to Step 2. If not, read the exact file(s) needed in a single batch.
2. **Execute:** Apply the code changes directly using your file-editing tool. Write clean, complete, modular vanilla code without placeholders.
3. **Terminate:** Immediately stop calling tools and give a 1-3 sentence summary of what you changed. Do not re-read the file to "double-check" your edit.

## 4. Coding Standards
- **Self-Contained & Clean:** Prefer standard Web APIs, ES6+ JavaScript, semantic HTML5, and modern CSS (Flexbox, Grid, CSS Variables).
- **Zero Dependencies:** Do not run `npm install` or add external libraries unless the user explicitly asks for a specific package.
- **Direct Edits Only:** Do not output massive walls of explanation before or after your tool calls. Act immediately, patch the code, and yield control back to the user.