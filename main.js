process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js';
import { createRequire } from "module";
import path, { join } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { platform } from 'process';
import { tmpdir } from 'os';
import os from 'os';
import { format } from 'util';
import * as ws from 'ws';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, watch, rmSync } from 'fs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import yargs from 'yargs';
import syntaxerror from 'syntax-error';
import chalk from 'chalk';
import pino from 'pino';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';

const { PHONENUMBER_MCC, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = await import('@adiwajshing/baileys');

const { CONNECTING } = ws;
const { chain } = lodash;
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

protoType();
serialize();

const clearSessions = () => {
    const sessionsPath = './sessions';
    const credentials = ['creds.json'];
    
    try {
        const files = readdirSync(sessionsPath);
        let cleared = 0;
        
        for (const file of files) {
            const filePath = join(sessionsPath, file);
            const isDirectory = statSync(filePath).isDirectory();
            
            if (credentials.some(cred => file.includes(cred))) continue;
            
            try {
                if (isDirectory) {
                    rmSync(filePath, { recursive: true, force: true });
                    cleared++;
                } else {
                    unlinkSync(filePath);
                    cleared++;
                }
            } catch (err) {
                console.error(chalk.red(`Error removing ${file}: ${err.message}`));
            }
        }
        
        if (cleared > 0) {
            console.log(chalk.yellow(`Sessions cleared successfully! Removed ${cleared} items`));
        } else {
            console.log(chalk.red('No sessions required cleaning'));
        }
    } catch (err) {
        console.error(chalk.red(`Error accessing sessions directory: ${err.message}`));
    }
};

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
    return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
};

global.__dirname = function dirname(pathURL) {
    return path.dirname(global.__filename(pathURL, true));
};

global.__require = function require(dir = import.meta.url) {
    return createRequire(dir);
};

global.timestamp = { start: new Date };

const __dirname = global.__dirname(import.meta.url);
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
const dbName = 'database.json';
global.db = new Low(new JSONFile(dbName));

global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
        if (!global.db.READ) {
            clearInterval(this);
            resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
        }
    }, 1 * 1000));
    
    if (global.db.data !== null) return;
    global.db.READ = true;
    await global.db.read().catch(console.error);
    global.db.READ = null;
    global.db.data = {
        users: {},
        chats: {},
        stats: {},
        settings: {},
        bots: {},
        ...(global.db.data || {})
    };
    global.db.chain = chain(global.db.data);
};

loadDatabase();

const authFile = `${opts._[0] || 'sessions'}`;
const { state, saveCreds } = await useMultiFileAuthState(authFile);
const { version, isLatest } = await fetchLatestBaileysVersion();

const connectionOptions = {
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: !global.pairingAuth,
    browser: ['Linux', 'Chrome', ''],
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino().child({
            level: 'silent',
            stream: 'store'
        }))
    }
};

global.conn = makeWASocket(connectionOptions);
conn.isInit = false;
let sessionCleanupDone = false;

if (global.pairingAuth && !conn.authState.creds.registered) {
    let phoneNumber;
    if (!!global.pairingNumber) {
        phoneNumber = global.pairingNumber.replace(/[^0-9]/g, '');
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Please start with your country's WhatsApp code, e.g., 62xxx")));
            process.exit(0);
        }
    } else {
        phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please enter your WhatsApp number: `)));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        
        if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Please start with your country's WhatsApp code, e.g., 62xxx")));
            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please enter your WhatsApp number: `)));
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
            rl.close();
        }
    }

    setTimeout(async () => {
        let code = await conn.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(chalk.black(chalk.bgGreen(`Your Pairing Code: `)), chalk.black(chalk.white(code)));
    }, 3000);
}

if (!opts['test']) {
setInterval(async () => {
  if (global.db.data) await global.db.write().catch(console.error)
}, 30 * 1000)
}

async function connectionUpdate(update) {
    const { receivedPendingNotifications, connection, lastDisconnect, isOnline, isNewLogin } = update;

    if (isNewLogin) conn.isInit = true;
    if (connection == 'connecting') console.log(chalk.yellow('Initializing Neura, please wait...'));
    if (connection == 'open') {
        console.log(chalk.yellow('Connection established successfully!'));
        
        if (!sessionCleanupDone) {
            console.log(chalk.yellow('Initiating session cleanup...'));
            setTimeout(() => {
                clearSessions();
                sessionCleanupDone = true;
            }, 10000); 
        }
        
        const deviceName = os.hostname();
        const message = `\`Neura is now active on ${deviceName}!\``;
        try {
            await this.sendMessage(global.nomorown + `@s.whatsapp.net`, { text: message });
        } catch (err) {
            console.log(chalk.red('Error sending initial message:', err.message));
        }
    }
    if (isOnline == true) console.log(chalk.yellow('Active Status'));
    if (isOnline == false) console.log(chalk.red('Inactive Status'));
    if (receivedPendingNotifications) console.log(chalk.yellow('Awaiting new messages'));
    if (connection == 'close') {
        console.log(chalk.red('Connection terminated, attempting to reconnect...'));
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        if (shouldReconnect) {
            await global.reloadNeura(true);
        } else {
            console.log(chalk.red('Connection terminated due to logout'));
            process.exit(0);
        }
    }
    
    global.timestamp.connect = new Date;
    
    if (global.db.data == null) await global.loadDatabase();
}

process.on('uncaughtException', console.error);

let isInit = true;
let neura = await import('./neura.js');

global.reloadNeura = async function (restatConn) {
    try {
        const Neura = await import(`./neura.js?update=${Date.now()}`).catch(console.error);
        if (Object.keys(Neura || {}).length) neura = Neura;
    } catch (e) {
        console.error(e);
    }
    
    if (restatConn) {
        const oldChats = global.conn.chats;
        try { global.conn.ws.close() } catch {}
        conn.ev.removeAllListeners();
        global.conn = makeWASocket(connectionOptions, { chats: oldChats });
        isInit = true;
    }
    
    if (!isInit) {
        conn.ev.off('messages.upsert', conn.neura);
        conn.ev.off('group-participants.update', conn.participantsUpdate);
        conn.ev.off('groups.update', conn.groupsUpdate);
        conn.ev.off('message.delete', conn.onDelete);
        conn.ev.off('connection.update', conn.connectionUpdate);
        conn.ev.off('creds.update', conn.credsUpdate);
    }

    conn.welcome = '━━━━━━◈ こんにちは ◈━━━━━━\n\n┏━ [ @subject ] ━━\n> ┃ Welcome to our group ✦\n┣━━━━━ INTRO ━━━━\n┃ *Name   :*  \n┃ *Age    :*  \n┃ *Gender :*\n┗━━━━━━━━━━━━━━━━\n\n━━━━━━◈ *Description* ◈━━━━━━\n\n@desc';
    conn.bye = '━━━━━━◈ さよなら ◈━━━━━━  \n@user _has left the group_';
    conn.spromote = '━━━━━━◈ おめでとう ◈━━━━━━\n@user _is now an admin!_';
    conn.sdemote = '━━━━━━◈ ご苦労様 ◈━━━━━━\n@user _is no longer an admin!_';
    conn.sDesc = '━━━━━━◈ 更新完了 ◈━━━━━━\n*The group description has been updated to:*\n\n@desc';
    conn.sSubject = '━━━━━━◈ タイトル変更 ◈━━━━━━\n*The group title has been changed to:* \n@subject';
    conn.sIcon = '━━━━━━◈ アイコン変更 ◈━━━━━━\n_The group icon has been updated!_';
    conn.sRevoke = '━━━━━━◈ リンク更新 ◈━━━━━━\n*The group link has been updated to:* \n@revoke';
    
    conn.neura = neura.neura.bind(global.conn);
    conn.participantsUpdate = neura.participantsUpdate.bind(global.conn);  
    conn.groupsUpdate = neura.groupsUpdate.bind(global.conn);
    conn.onDelete = neura.deleteUpdate.bind(global.conn);
    conn.connectionUpdate = connectionUpdate.bind(global.conn);
    conn.credsUpdate = saveCreds.bind(global.conn);

    conn.ev.on('messages.upsert', conn.neura);
    conn.ev.on('group-participants.update', conn.participantsUpdate);
    conn.ev.on('groups.update', conn.groupsUpdate);
    conn.ev.on('message.delete', conn.onDelete);
    conn.ev.on('connection.update', conn.connectionUpdate);
    conn.ev.on('creds.update', conn.credsUpdate);
    isInit = false;
    return true;
};

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'));
const pluginFilter = filename => /\.js$/.test(filename);
global.plugins = {};

async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename));
      const module = await import(file);
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }
}

filesInit().catch(console.error);

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`reloading plugin '${filename}'`);
      else {
        conn.logger.warn(`deleted plugin '${filename}'`);
        return delete global.plugins[filename];
      }
    } else conn.logger.info(`loading new plugin '${filename}'`);

    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true
    });

    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`);
    else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
      global.plugins[filename] = module.default || module;
    } catch (e) {
      conn.logger.error(`error loading plugin '${filename}\n${format(e)}'`);
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
    }
  }
};

Object.freeze(global.reload);
watch(pluginFolder, global.reload);
await global.reloadNeura();
