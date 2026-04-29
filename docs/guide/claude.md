# Using wiremd with Claude

Claude understands wiremd syntax natively. You can describe a screen in plain English and Claude will generate the wiremd Markdown for it — then render it in VS Code or the CLI.

There are two modes depending on which Claude tool you're using.

---

## Claude Code (CLI)

Claude Code uses a **skill** to generate and render wireframes automatically. Once the skill is installed, you just ask — Claude handles writing the `.md` file, running the renderer, and telling you where to open the preview.

### Install the skill

**Via the VS Code extension (recommended):**
Install the [VS Code extension](./vscode.md), then accept the prompt on first launch: "Want Claude Code to generate wireframes for you? Install the Claude skill." The skill is copied into `.claude/skills/wireframe/` in your workspace.

**Manually:**
Copy `skills/wireframe/` from the wiremd repo into `.claude/skills/wireframe/` in your project root. Claude Code picks it up automatically.

### What you can ask

The skill triggers automatically on wireframing requests — you don't need to invoke it by name:

- "Wireframe a login screen with email, password, and a forgot password link"
- "Sketch the settings page for this app"
- "Draw what the dashboard would look like — nav, a metrics row, a table below"
- "Mockup a confirmation modal for deleting an account"
- "Document this component as a wireframe" *(with a React/JSX file open)*

Claude will generate a `.md` file, render it with `wiremd <file>.md --style clean --serve 3001 --watch`, and give you the URL (`http://localhost:3001`) to open in your browser. The VS Code preview also updates live if you have it open.

### Iterating

Just keep talking:

- "Add a sidebar with navigation links on the left"
- "Replace the table with a card grid"
- "Show the empty state — no items yet, with an Add button"
- "What does the mobile layout look like?"

Claude edits the `.md` file and re-renders. No manual steps needed.

---

## Cowork with a non-technical reviewer

If a PM, designer, or other stakeholder needs to review or iterate on wireframes — but doesn't have VS Code installed — use the browser editor at **[tobiashoelzer.com/wiremd/editor](https://tobiashoelzer.com/wiremd/editor)** with live file sync.

### How it works

1. Claude writes the `.md` file to disk and generates a URL with the file path encoded:
   ```
   https://tobiashoelzer.com/wiremd/editor/?file=/path/to/wireframe.md
   ```
2. The reviewer opens the link in Chrome, Edge, or Safari 16.4+
3. A modal appears showing the filename — the reviewer clicks **Open File** and grants browser access to the file
4. The browser auto-refreshes whenever Claude saves a change (within ~500ms, no page reload)
5. The reviewer can also edit directly in the editor — changes write back to disk in real time

### What the reviewer needs

- Chrome, Edge, or Safari 16.4+ *(Firefox doesn't support local file access)*
- Nothing installed — no CLI, no VS Code, no extensions

### Iterating

Claude edits the `.md` file on disk and saves. The reviewer's browser picks up the change automatically. The reviewer can type feedback in the chat while watching the wireframe update live.

---

## Claude in a product or chat context

If you're using Claude conversationally — in claude.ai, in a product with Claude embedded, or in any chat interface — Claude can generate wiremd syntax from a description even without a skill installed.

Ask Claude to write wiremd Markdown for the screen you want, then:

1. Copy the Markdown Claude generates into a `.md` file
2. Open it in VS Code to preview with the extension, or run `wiremd file.md --serve 3001` in the terminal

**Example prompt:**
> "Write wiremd Markdown for a product registration form — company name, contact email, plan selection (Free/Pro/Enterprise radio buttons), and a Submit button. Use wiremd syntax."

Claude will return a complete `.md` file ready to paste and render.

### Iterating

Paste the current `.md` content back into the chat and ask for changes:

> "Here's the current wireframe. Add a step indicator at the top showing 3 steps, and move the submit button to the right."

---

## Tips

- **Be specific about layout.** "Two-column grid, nav on the left, content on the right" works better than "a typical dashboard layout."
- **Name the states you need.** "Show the loading state for the Submit button" or "Add an error message under the email field."
- **You don't need to know wiremd syntax.** Describe what you want visually — Claude translates it.
