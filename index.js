import { join, dirname } from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { setupMaster, fork } from "cluster";
import { watchFile, unwatchFile } from "fs";
import { performance } from "perf_hooks";
import cfonts from "cfonts";
import { createInterface } from "readline";
import yargs from "yargs";
import fs from "fs";
import path from "path";
import chalk from "chalk";
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, "./package.json"));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say(name, {
  font: "tiny",
  align: "center",
  colors: ["system"],
});
say(author, {
  font: "console",
  align: "center",
  gradient: ["red", "yellow"],
});

let isRunning = false;
let startTime = null;
function start(file) {
  if (isRunning) return;
  isRunning = true;
  startTime = performance.now();
  const args = [join(__dirname, file), ...process.argv.slice(2)];
  setupMaster({ exec: args[0], args: args.slice(1) });
  const p = fork();
  p.on("message", (data) => {
    console.log(chalk.magenta("[ Accepted ✓ ]", data));
    switch (data) {
      case "reset":
        console.log(chalk.red("Restarting process..."));
        p.process.kill();
        isRunning = false;
        start(file);
        break;
      case "uptime":
        p.send(process.uptime());
        break;
    }
  });

  p.on("exit", (code) => {
    isRunning = false;
    const uptime = ((performance.now() - startTime) / 1000).toFixed(2);
    console.error(chalk.white.bgRed.bold(`Process exited with code: ${code}`));
    console.log(chalk.bgYellow.black(`Process ran for ${uptime} seconds before exiting.`));
    if (code === "SIGKILL" || code === "SIGABRT") return start(file);
    console.log(chalk.red("Restarting due to signal..."));

    watchFile(args[0], () => {
      unwatchFile(args[0]);
      start(file);
    });
  });

  const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
  if (!opts["test"]) {
    if (!rl.listenerCount()) {
      rl.on("line", (line) => {
        p.emit("message", line.trim());
      });
    }
  }
}

start("main.js");