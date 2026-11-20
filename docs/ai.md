# Writing slides with AI

The theme is built to be used by coding agents (Claude Code, GitHub Copilot, Cursor, Codex, …) as well as by people.

## The agent skill

The npm package ships an [Agent Skill](https://agentskills.io) at `node_modules/slidev-theme-tum/skills/slidev-tum/SKILL.md`. It lists every layout, option and component, the style rules of the TUM design, and how to check the result. Agents that support skills load it only when a task needs it.

=== "Claude Code"

    Link the skill into your project once:

    ```bash
    mkdir -p .claude/skills
    ln -s ../../node_modules/slidev-theme-tum/skills/slidev-tum .claude/skills/slidev-tum
    ```

=== "Other agents"

    Reference it from your `AGENTS.md`:

    ```md
    Slides use slidev-theme-tum. Before editing slides.md, read
    node_modules/slidev-theme-tum/skills/slidev-tum/SKILL.md.
    ```

Since the skill lives in the package, it always matches the installed version of the theme.

## llms.txt

The docs site publishes [`llms.txt`](llms.txt), a short index of these pages for language models, following the [llms.txt convention](https://llmstxt.org).

## Prompts that work

- "Create a 15-minute intermediate talk for my master's thesis on *X* with slidev-theme-tum, in German."
- "Turn this outline into slides; use `two-cols` for the comparison and a `diagram` slide for the architecture."
- "Export the deck to PNG and check every slide for overflowing text."

Agents should verify their work by rendering: `pnpm slidev export --format png` writes one image per slide.

## Working on the theme itself

The repository has an [`AGENTS.md`](https://github.com/danielgnth/slidev-tum-theme/blob/main/AGENTS.md) with the structure, commands and conventions, so agents can change the theme and run the same checks as CI. See [Development](development/index.md).
