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

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, "./package.json"));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

say(name, {
  font: "pallet",
  align: "center",
  colors: ["yellow", "redBright", "whiteBright"],
});

say(author, {
  font: "console",
  align: "center",
  colors: ["red", "blueBright", "yellow"],
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
    console.log("\x1b[38;5;39mReceived message: \x1b[0m" + data);

    switch (data) {
      case "reset":
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
    console.error("\x1b[38;5;48mProcess exited with code: \x1b[0m" + code);

    if (code === "SIGKILL" || code === "SIGABRT") return start(file);

    const uptime = ((performance.now() - startTime) / 1000).toFixed(2);
    console.log(
      "\x1b[48;5;196m\x1b[38;5;15mProcess ran for \x1b[0m" +
      uptime +
      "\x1b[48;5;196m\x1b[38;5;15m seconds before exiting.\x1b[0m"
    );

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