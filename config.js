import { watchFile, unwatchFile } from "fs";
import fs from 'fs';
import chalk from "chalk";
import { fileURLToPath } from "url";

global.owner = [["62895324429899", "Ryzxell", true]],
  global.pairingNumber = "6283148375193",
  global.pairingAuth = true,
  global.nomorown = "62895324429899";

global.stickpack = "Made with";
global.stickauth = "Neura";

global.wait = "✦ Tunggu sebentar yaa~";
global.error = "*Sorry, something went wrong* (˚ ˃̣̣̥⌓˂̣̣̥ )";

global.msg = {
  owner: '*ACCESS DENIED*\n> Sorry this feature is for owners only!',
  premium: '*ACCESS DENIED*\n> Sorry, this feature is only for premium users.\n> Upgrade to *Premium* now by typing *.buyprem* ツ',
  group: '*ACCESS DENIED*\n> Sorry, this feature can only be used within a Group.',
  private: '*ACCESS DENIED*\n> Sorry, this feature can only be used in private chat.',
  admin: '*ACCESS DENIED*\n> Sorry, this feature is only for group admins ツ',
  botAdmin: '*Sorry bot not admin*\n>Make bot as admin to use this feature ツ',
  onlyprem: '\`Only premium users can use this feature.Only premium users can use this feature in private chat. ツ`',
  rpg: '*ACCESS DENIED*\n> Sorry, admin turned off the RPG feature in this group ツ',
  game: '*ACCESS DENIED*\n> Sorry admin turned off the game feature in this group ツ',
  limitExp: '*limit has been reached (˚ ˃̣̣̥⌓˂̣̣̥ ) ‧º*\n> To get a limit, you can buy it by typing .buy limit or waiting for the limit to refresh every day.',
  unreg: '✦ *Hi user, you are not registered in the bot database*\n> type .daftar nama.umur.gender\n> example: .daftar Shouya.17.cowok\n\n*If you want to register automatically*\n> type @verify'
};

global.denied = "https://files.catbox.moe/frlknp.jpg";
global.thumbnail = ["https://files.catbox.moe/upnh15.jpg", "https://files.catbox.moe/ckzdif.jpg", "https://files.catbox.moe/e8zpev.jpg", "https://files.catbox.moe/zuhole.jpg", "https://files.catbox.moe/m0cnre.jpg", "https://files.catbox.moe/watxj0.jpg", "https://files.catbox.moe/ljj4ml.jpg", "https://files.catbox.moe/44bgsm.jpg"];
global.thumb = ["https://files.catbox.moe/l6swfz.jpg",
  "https://files.catbox.moe/o4eh3u.jpg",
  "https://files.catbox.moe/eb4czb.jpg",
  "https://files.catbox.moe/iap3h0.jpg",
  "https://files.catbox.moe/01z5vn.jpg",
  "https://files.catbox.moe/pfl40n.jpg",
  "https://files.catbox.moe/0x7kmh.jpg"];

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.blueBright("Update 'config.js'"));
  import(`${file}?update=${Date.now()}`);
});