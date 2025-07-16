# Discord Checklist Bot

A simple Discord bot to manage a checklist with tasks you can add, edit, remove, mark done, bulk add, and sort. Your checklist is saved persistently in a local file so it won't reset after a bot restart.

---

## Features

- Add task
- Bulk add multiple tasks at once
- Edit existing tasks
- Remove tasks
- List all tasks with clear `[ ]` (not done) and `[x]` (done) formatting
- Mark tasks as done
- Sort tasks alphabetically or by status (done/undone)
- Persist tasks to a local JSON file (`tasks.json`)

---

## Commands

| Command    | Usage                           | Description                            |
| ---------- | ------------------------------- | -------------------------------------- |
| `!add`     | `!add Buy milk`                 | Add a new task                         |
| `!bulkadd` | `!bulkadd Task1; Task2; Task3`  | Add multiple tasks separated by `;`    |
| `!edit`    | `!edit 1 New task name`         | Edit task at position 1                |
| `!remove`  | `!remove 2`                     | Remove task at position 2              |
| `!list`    | `!list`                         | List all tasks                         |
| `!done`    | `!done 3`                       | Mark task 3 as done                    |
| `!sort`    | `!sort alpha` or `!sort status` | Sort tasks alphabetically or by status |

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- A Discord bot token (create an application & bot in the [Discord Developer Portal](https://discord.com/developers/applications))

---

### Installation

1. Clone or download this repository
2. Open your terminal and navigate to the project folder
3. Install dependencies:
   ```bash
   yarn
   ```
4. Replace `YOUR_BOT_TOKEN_HERE` in `index.js` with your bot token
5. Run the bot:
   ```bash
   node index.js
   ```

---

## How It Works

- When the bot starts, it loads tasks from `tasks.json` if the file exists.
- Bulk add multiple tasks at once
- Edit existing tasks

---

## Notes

- `tasks.json` will be created automatically in the project directory upon first task addition.
- Keep your bot token secure and never share it publicly!
- Make sure your bot has the permissions to **Read Messages** and **Send Messages** in your server.
- Enable the **Message Content Intent** in the Discord Developer Portal under your bot settings.

---

## License

This project is open source and free to use.
