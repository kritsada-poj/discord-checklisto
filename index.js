const { Client, GatewayIntentBits } = require("discord.js")
const fs = require("fs")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

const FILE_PATH = "./tasks.json"
let checklist = []

// Load tasks from file
function loadTasks() {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH, "utf8")
    checklist = JSON.parse(data)
  }
}

// Save tasks to file
function saveTasks() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(checklist, null, 2))
}

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`)
  loadTasks()
})

client.on("messageCreate", (message) => {
  if (message.author.bot) return

  const args = message.content.split(" ")
  const command = args.shift().toLowerCase()

  if (command === "!add") {
    const task = args.join(" ")
    if (!task) return message.channel.send("Please provide a task.")

    checklist.push({ name: task, status: false })

    saveTasks()

    message.channel.send(`Added: "${task}"`)
  }

  if (command === "!bulkadd") {
    const tasksText = args.join(" ")
    const tasks = tasksText
      .split(";")
      .map((t) => t.trim())
      .filter((t) => t)

    if (tasks.length === 0)
      return message.channel.send("Please provide tasks separated by `;`.")

    tasks.forEach((task) => checklist.push({ name: task, status: false }))
    saveTasks()

    message.channel.send(
      `Added tasks:\n${tasks.map((t) => `- ${t}`).join("\n")}`
    )
  }

  if (command === "!list") {
    if (checklist.length === 0) {
      return message.channel.send("Checklist is empty.")
    }

    let listText = "**Checklist:**\n"

    checklist.forEach((task, index) => {
      listText += `${task.status ? "[x]" : "[ ]"} ${index + 1}. ${task.name}\n`
    })

    message.channel.send(listText)
  }

  if (command === "!done") {
    const index = parseInt(args[0]) - 1

    if (isNaN(index) || index < 0 || index >= checklist.length) {
      return message.channel.send("Invalid task number.")
    }

    checklist[index].status = true

    saveTasks()

    message.channel.send(`Marked task ${index + 1} as done.`)
  }

  if (command === "!edit") {
    const index = parseInt(args[0]) - 1
    const newTask = args.slice(1).join(" ")

    if (isNaN(index) || index < 0 || index >= checklist.length || !newTask) {
      return message.channel.send("Invalid command or task number.")
    }

    checklist[index].name = newTask

    saveTasks()

    message.channel.send(`Task ${index + 1} updated to "${newTask}".`)
  }

  if (command === "!remove") {
    const index = parseInt(args[0]) - 1

    if (isNaN(index) || index < 0 || index >= checklist.length) {
      return message.channel.send("Invalid task number.")
    }

    const removed = checklist.splice(index, 1)

    saveTasks()

    message.channel.send(`Removed: "${removed[0].name}".`)
  }

  if (command === "!sort") {
    const option = args[0]
    if (!option)
      return message.channel.send(
        "Please specify sort option: `asc` or `desc`."
      )

    if (option === "asc") {
      checklist.sort((a, b) => a.name.localeCompare(b.name))

      saveTasks()

      message.channel.send("Tasks sorted Ascending order (A - Z).")
    } else if (option === "desc") {
      checklist.sort((a, b) => b.name.localeCompare(a.name))

      saveTasks()

      message.channel.send("Tasks sorted Descending order (Z - A).")
    } else {
      message.channel.send("Invalid sort option. Use `asc` or `desc`.")
    }
  }
})

client.login("YOUR_BOT_TOKEN_HERE")
