import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'
import canvafy from "canvafy"
const printMessage = (await import('./lib/print.js')).default
const { proto } = (await import('@adiwajshing/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function() {
  clearTimeout(this)
  resolve()
}, ms))

export async function neura(chatUpdate) {
  this.msgqueque = this.msgqueque || []
  if (!chatUpdate)
    return
  this.pushMessage(chatUpdate.messages).catch(console.error)
  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m)
    return
  if (global.db.data == null)
    await global.loadDatabase()
  try {
    m = smsg(this, m) || m
    if (!m)
      return
    m.exp = 0
    m.limit = false
    try {
      let user = global.db.data.users[m.sender]
      if (typeof user !== 'object')
        global.db.data.users[m.sender] = {}
      if (user) {
        if (!isNumber(user.money))
          user.money = 0
        if (!isNumber(user.exp))
          user.exp = 0
        if (!isNumber(user.chat))
          user.chat = 0  
        if (!isNumber(user.chatTotal))
          user.chatTotal = 0
        if (!isNumber(user.limit))
          user.limit = 25
        if (!isNumber(user.freelimit))
          user.freelimit = 0
        if (!isNumber(user.lastclaim))
          user.lastclaim = 0
        if (!isNumber(user.skata))
          user.skata = 0
        if (!isNumber(user.joinlimit))
          user.joinlimit = 0
        if (!isNumber(user.pc))
          user.pc = 0
        if (!isNumber(user.lastseen))
          user.lastseen = 0
        if (!isNumber(user.pacaranTime))
          user.pacaranTime = 0
        if (!('registered' in user))
          user.registered = false
        if (!('gender' in user))
          user.gender = ""
        if (!('pacar' in user))
          user.pacar = ""
        if (!('waifu' in user)) 
          user.waifu = ""
        if (!('husbu' in user))
          user.husbu = ""
        if (!('tembak' in user))
          user.tembak = ""
        if (!user.registered) {
          if (!('name' in user))
            user.name = m.name
          if (!isNumber(user.age))
            user.age = -1
          if (!isNumber(user.regTime))
            user.regTime = -1
        }
        if (!isNumber(user.lastkencan))
          user.lastkencan = -1
        if (!isNumber(user.lastkencani))
          user.lastkencani = -1
        if (!isNumber(user.kepercayaanwaifu))
          user.kepercayaanwaifu = 0
        if (!isNumber(user.kepercayaanhusbu)) 
          user.kepercayaanhusbu = 0
        if (!isNumber(user.afk))
          user.afk = -1
        if (!isNumber(user.unbanwa))
          user.unbanwa = 0
        if (!('unreg' in user))
          user.unreg = false
        if (!('afkReason' in user))
          user.afkReason = ''
        if (!('banned' in user))
          user.banned = false  
        if (!isNumber(user.bannedTime))
          user.bannedTime = 0
        if (!'WarnReason' in user)
          user.WarnReason = ''
        if (!isNumber(user.warning))
          user.warning = 0
        if (!isNumber(user.level)) 
          user.level = 0
        if (!('role' in user))
          user.role = 'Novice'
        if (!('skill' in user))
          user.skill = ''
        if (!isNumber(user.chip))
          user.chip = 0
        if (!isNumber(user.atm))
          user.atm = 0
        if (!isNumber(user.fullatm))
          user.fullatm = 0
        if (!isNumber(user.bank))
          user.bank = 0
        if (!isNumber(user.health))
          user.health = 100
        if (!isNumber(user.potion))
          user.potion = 0
        if (!isNumber(user.trash))
          user.trash = 0
        if (!isNumber(user.wood))
          user.wood = 0
        if (!isNumber(user.rock))
          user.rock = 0
        if (!isNumber(user.string))
          user.string = 0
        if (!isNumber(user.petfood))
          user.petfood = 0
        if (!isNumber(user.emerald))
          user.emerald = 0
        if (!isNumber(user.diamond))
          user.diamond = 0
        if (!isNumber(user.gold))
          user.gold = 0
        if (!isNumber(user.botol))
          user.botol = 0
        if (!isNumber(user.kardus))
          user.kardus = 0
        if (!isNumber(user.kaleng))
          user.kaleng = 0
        if (!isNumber(user.gelas))
          user.gelas = 0
        if (!isNumber(user.plastik))
          user.plastik = 0
        if (!isNumber(user.iron))
          user.iron = 0
        if (!isNumber(user.common))
          user.common = 0
        if (!isNumber(user.uncommon))
          user.uncommon = 0
        if (!isNumber(user.arcane))
          user.arcane = 0
        if (!isNumber(user.sovereign))
          user.sovereign = 0
        if (!isNumber(user.umpan))
          user.umpan = 0
        if (!isNumber(user.pet))
          user.pet = 0
        if (!isNumber(user.paus))
          user.paus = 0
        if (!isNumber(user.kepiting))
          user.kepiting = 0
        if (!isNumber(user.gurita))
          user.gurita = 0
        if (!isNumber(user.cumi))
          user.cumi = 0
        if (!isNumber(user.buntal))
          user.buntal = 0
        if (!isNumber(user.dory))
          user.dory = 0
        if (!isNumber(user.lumba))
          user.lumba = 0
        if (!isNumber(user.lobster))
          user.lobster = 0
        if (!isNumber(user.hiu))
          user.hiu = 0
        if (!isNumber(user.udang))
          user.udang = 0
        if (!isNumber(user.orca))
          user.orca = 0
        if (!isNumber(user.banteng))
          user.banteng = 0
        if (!isNumber(user.gajah))
          user.gajah = 0
        if (!isNumber(user.harimau))
          user.harimau = 0
        if (!isNumber(user.kambing))
          user.kambing = 0
        if (!isNumber(user.panda))
          user.panda = 0
        if (!isNumber(user.buaya))
          user.buaya = 0
        if (!isNumber(user.kerbau))
          user.kerbau = 0
        if (!isNumber(user.sapi))
          user.sapi = 0
        if (!isNumber(user.monyet))
          user.monyet = 0
        if (!isNumber(user.babihutan))
          user.babihutan = 0
        if (!isNumber(user.babi))
          user.babi = 0
        if (!isNumber(user.ayam))
          user.ayam = 0
        if (!isNumber(user.ojek))
          user.ojek = 0
         
        if (!isNumber(user.polisi))
          user.polisi = 0
        if (!isNumber(user.roket))
          user.roket = 0
        if (!isNumber(user.taxy))
          user.taxy = 0
        if (!isNumber(user.lastbunuhi))
          user.lastbunuhi = 0
        if (!isNumber(user.lastadventure))
          user.lastadventure = 0
        if (!isNumber(user.lastkill))
          user.lastkill = 0
        if (!isNumber(user.lastmisi))
          user.lastmisi = 0
        if (!isNumber(user.lastdungeon))
          user.lastdungeon = 0
        if (!isNumber(user.lastwar))
          user.lastwar = 0
        if (!isNumber(user.lastsda))
          user.lastsda = 0
        if (!isNumber(user.lastduel))
          user.lastduel = 0
        if (!isNumber(user.lastmining))
          user.lastmining = 0
        if (!isNumber(user.lasthunt))
          user.lasthunt = 0
        if (!isNumber(user.lastgift))
          user.lastgift = 0
        if (!isNumber(user.lastberkebon))
          user.lastberkebon = 0
        if (!isNumber(user.lastdagang))
          user.lastdagang = 0
        if (!isNumber(user.lasthourly))
          user.lasthourly = 0
        if (!isNumber(user.lastbansos))
          user.lastbansos = 0
        if (!isNumber(user.lastrampok))
          user.lastrampok = 0
        if (!isNumber(user.lastclaim))
          user.lastclaim = 0
        if (!isNumber(user.lastnebang))
          user.lastnebang = 0
        if (!isNumber(user.lastweekly))
          user.lastweekly = 0
        if (!isNumber(user.lastmonthly))
          user.lastmonthly = 0
        if (!isNumber(user.lastopenbox))
          user.lastopenbox = 0
        if (!isNumber(user.apel))
          user.apel = 0
        if (!isNumber(user.anggur))
          user.anggur = 0
        if (!isNumber(user.jeruk))
          user.jeruk = 0
        if (!isNumber(user.mangga))
          user.mangga = 0
        if (!isNumber(user.pisang))
          user.pisang = 0
        if (!isNumber(user.makanan))
          user.makanan = 0
        if (!isNumber(user.bibitanggur))
          user.bibitanggur = 0
        if (!isNumber(user.bibitpisang))
          user.bibitpisang = 0
        if (!isNumber(user.bibitapel))
          user.bibitapel = 0
        if (!isNumber(user.bibitmangga))
          user.bibitmangga = 0
        if (!isNumber(user.bibitjeruk))
          user.bibitjeruk = 0
        if (!isNumber(user.horse))
          user.horse = 0
        if (!isNumber(user.horseexp))
          user.horseexp = 0
        if (!isNumber(user.cat))
          user.cat = 0
        if (!isNumber(user.catexp))
          user.catexp = 0
        if (!isNumber(user.fox))
          user.fox = 0
        if (!isNumber(user.foxhexp))
          user.foxexp = 0
        if (!isNumber(user.dogexp))  
          user.dogexp = 0
        if (!isNumber(user.robo))
          user.robo = 0
        if (!isNumber(user.roboexp))
          user.roboexp = 0
        if (!isNumber(user.horselastfeed))
          user.horselastfeed = 0
        if (!isNumber(user.catlastfeed))
          user.catlastfeed = 0
        if (!isNumber(user.robolastfeed))
          user.robolastfeed = 0
        if (!isNumber(user.foxlastfeed))
          user.foxlastfeed = 0
        if (!isNumber(user.doglastfeed))
          user.doglastfeed = 0
        if (!isNumber(user.robo))
          user.robo = 0
        if (!isNumber(user.robodurability))
          user.robodurability = 0
        if (!isNumber(user.armor))
          user.armor = 0
        if (!isNumber(user.armordurability))
          user.armordurability = 0
        if (!isNumber(user.sword))
          user.sword = 0
        if (!isNumber(user.sworddurability))
          user.sworddurability = 0
        if (!isNumber(user.pickaxe))
          user.pickaxe = 0
        if (!isNumber(user.pickaxedurability))
          user.pickaxedurability = 0
        if (!isNumber(user.fishingrod))
          user.fishingrod = 0
        if (!isNumber(user.fishingroddurability))
          user.fishingroddurability = 0
        if (!('premium' in user))
          user.premium = false
        if (!('autolevelup' in user))
          user.autolevelup = true
        if (!('autodownload' in user))
          user.autodownload = false
        if (!('sticker' in user))
          user.sticker = {}
        if (!('invest' in user))
          user.invest = {}
        if (!isNumber(user.premiumTime))
          user.premiumTime = 0
        if (!isNumber(user.joinlimit))
          user.joinlimit = 0
        if (!isNumber(user.ratings))
          user.ratings = 0
      } else global.db.data.users[m.sender] = {
        money: 0,
        exp: 0,
        limit: 25,
        chat: 0,
        chatTotal: 0, 
        freelimit: 0,
        lastclaim: 0,
        skata: 0,
        registered: false, 
        pacar: "",
        tembak: "",
        gender: "",
        husbu: "",
        waifu: "",
        kepercayaanwaifu: 0,
        kepercayaanhusbu: 0,
        lastkencan: -1,
        lastkencani: -1,
        pacaranTime: 0,
        name: m.name,
        pc: 0,
        lastseen: 0,
        joinlimit: 1,
        age: -1,
        regTime: -1,
        unreg: false,
        afk: -1,
        unbanwa: 0,
        afkReason: '',
        banned: false,
        bannedTime: 0,
        warning: 0,
        level: 0,
        role: 'Novice',
        skill: '',
        WarnReason: '',

        chip: 0,
        bank: 0, 
        atm: 0,
        fullatm: 0,
        health: 100,
        potion: 10,
        trash: 0,
        wood: 0,
        rock: 0,
        string: 0,
        emerald: 0,
        diamond: 0,
        gold: 0,
        iron: 0,
        common: 0,
        uncommon: 0,
        arcane: 0,
        sovereign: 0,
        umpan: 0,
        pet: 0,
        horse: 0,
        horseexp: 0,
        horselastfeed: 0,
        cat: 0,
        catexp: 0,
        catlastfeed: 0,
        fox: 0,
        foxexp: 0, 
        foxlastfeed: 0,
        robo: 0,
        roboexp: 0,
        robolastfeed: 0,
        dog: 0,
        dogexp: 0,
        doglastfeed: 0,

        paus: 0,
        kepiting: 0,
        gurita: 0,
        cumi: 0,
        buntal: 0,
        dory: 0,
        lumba: 0,
        lobster: 0,
        hiu: 0,
        udang: 0,
        ikan: 0,
        orca: 0,
        banteng: 0,
        harimau: 0,
        gajah: 0,
        kambing: 0,
        buaya: 0,
        kerbau: 0,
        sapi: 0,
        monyet: 0,
        babi: 0,
        ayam: 0,

        ojek: 0,
        bingo: 0,
        polisi: 0,
        roket: 0,
        taxy: 0,

        armor: 0,
        armordurability: 0,
        sword: 0,
        sworddurability: 0,
        pickaxe: 0,
        pickaxedurability: 0,
        fishingrod: 0,
        fishingroddurability: 0,
        robo: 0,
        robodurability: 0,
        apel: 20,
        pisang: 0,
        anggur: 0,
        mangga: 0,
        jeruk: 0,

        lastbunuhi: 0,
        lastadventure: 0,
        lastkill: 0,
        lastmisi: 0,
        lastdungeon: 0,
        lastwar: 0,
        lastsda: 0,
        lastduel: 0,
        lastmining: 0,
        lasthunt: 0,
        lastgift: 0,
        lastberkebon: 0,
        lastdagang: 0,
        lasthourly: 0,
        lastbansos: 0,
        lastrampok: 0,
        lastclaim: 0,
        lastnebang: 0,
        lastweekly: 0,
        lastmonthly: 0,
        lastopenbox: 0,

        premium: false,
        autolevelup: true,
        autodownload: false,
        sticker: {},
        invest: {},
        premiumTime: 0,
      }
      let chat = global.db.data.chats[m.chat]
      if (typeof chat !== 'object')
        global.db.data.chats[m.chat] = {}
      if (chat) {
        if (!('isBanned' in chat))
          chat.isBanned = false
        if (!('isBannedTime' in chat))
          chat.isBannedTime = false
        if (!('mute' in chat))
          chat.mute = false
        if (!('adminOnly' in chat))
          chat.adminOnly = false

        if (!('welcome' in chat))
          chat.welcome = false
        if (!('detect' in chat))
          chat.detect = false
        if (!('sWelcome' in chat))
          chat.sWelcome = ''
        if (!('sBye' in chat)) 
          chat.sBye = ''
        if (!('sPromote' in chat))
          chat.sPromote = ''
        if (!('sDemote' in chat))
          chat.sDemote = ''

        if (!('antidelete' in chat))
          chat.antidelete = false
        if (!('antiNsfw' in chat))
          chat.antiNsfw = true
        if (!('antiLinks' in chat))
          chat.antiLinks = false
        if (!('antiFoto' in chat))
          chat.antiFoto = false
        if (!('antiLinkGc' in chat))
          chat.antiLinkGc = false
        if (!('antiSticker' in chat))
          chat.antiSticker = false
        if (!('antiLinkWa' in chat))
          chat.antiLinkWa = false
        if (!('antiVirtex' in chat))
          chat.antiVirtex = false
        if (!('antiToxic' in chat))
          chat.antiToxic = false
        if (!('antiBadword' in chat))
          chat.antiBadword = false
        if (!('pembatasan' in chat))
          chat.pembatasan = false
        if (!('viewonce' in chat))
          chat.viewonce = false
        if (!('simi' in chat))
          chat.simi = false
        if (!('nsfw' in chat))
          chat.nsfw = false
        if (!('rpg' in chat))
          chat.rpg = true 
        if (!('game' in chat))
          chat.game = true
        if (!('teks' in chat))
          chat.teks = false

        if (!('autolevelup' in chat))
          chat.autolevelup = true
        if (!('autoClose' in chat))
          chat.autoClose = false
        if (!('autodownload' in chat))
          chat.autodownload = false
        if (!('animeUpdate' in chat))
          chat.animeUpdate = false
        if (!('youtubeUpdate' in chat))
          chat.youtubeUpdate = false
        if (!('komikUpdate' in chat))
          chat.komikUpdate = false
        if (!('gempaUpdate' in chat))
          chat.gempaUpdate = false
        if (!isNumber(chat.expired))
          chat.expired = 0

        if (!('store' in chat))
          chat.store = {}
        if (!('member' in chat))
          chat.member = {}
        if (!('komikUpdateList' in chat))
          chat.komikUpdateList = []
        if (!('animeUpdateList' in chat))
          chat.animeUpdateList = []
        if (!('gempaUpdateList' in chat))
          chat.gempaUpdateList = []
      } else global.db.data.chats[m.chat] = {
        isBanned: false,
        isBannedTime: false,
        mute: false,
        adminOnly: false,

        welcome: false,
        detect: false,
        sWelcome: '',
        sBye: '',
        sPromote: '',
        sDemote: '',

        antidelete: false,
        antiLinks: false,
        antiFoto: false,
        antiNsfw: true,
        antiLinkGc: false,
        antiVn: false,
        antiLinkWa: false,
        antiSticker: false,
        antiToxic: false,
        antiVirtex: false,
        antiBadword: false,
        pembatasan: false,
        viewonce: false,
        simi: false, 
        nsfw: false,
        rpg: true,
        game: true,
        teks: true,

        autolevelup: true,
        autoClose: false,
        autodownload: false,
        youtubeUpadte: false,
        animeUpdate: false,
        komikUpdate: false,
        gempaUpdate: false,
        expired: 0,

        store: {},
        komikUpdateList: [],
        animeUpdateList: [],
        gempaUpdateList: [],
        youtubeUpdateList: [],
        member: {}
      }
      let settings = global.db.data.settings[this.user.jid]
      if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
      if (settings) {
        if (!('self' in settings)) settings.self = false
        if (!('autoread' in settings)) settings.autoread = true
        if (!('composing' in settings)) settings.composing = true
        if (!('restrict' in settings)) settings.restrict = false
        if (!('autorestart' in settings)) settings.autorestart = false
        if (!isNumber(settings.restartDB)) settings.restartDB = 0
        if (!('backup' in settings)) settings.backup = false
        if (!isNumber(settings.backupDB)) settings.backupDB = 0
        if (!('cleartmp' in settings)) settings.cleartmp = true
        if (!('clearsession' in settings)) settings.clearsession = true
        if (!isNumber(settings.lastcleartmp)) settings.lastcleartmp = 0
        if (!isNumber(settings.lastclearsession)) settings.lastclearsession = 0
        if (!isNumber(settings.status)) settings.status = 0
        if (!('anticall' in settings)) settings.anticall = true
        if (!('autoRestock' in settings)) settings.autoRestock = false
        if (!isNumber(settings.autoRestockCD)) settings.autoRestockCD = 0
        if (!isNumber(settings.expiredCD)) settings.expiredCD = 0
        if (!isNumber(settings.premiumCD)) settings.premiumCD = 0
        if (!('loading' in settings)) settings.loading = true
        if (!('adReply' in settings)) settings.adReply = false 
        if (!('smlcap' in settings)) settings.smlcap = true
        if (!isNumber(settings.dailyReset)) settings.dailyReset = 0
      } else global.db.data.settings[this.user.jid] = {
        self: false,
        autoread: true,
        composing: true,
        restrict: false,
        autorestart: false, 
        restartDB: 0,
        backup: false,
        backupDB: 0,
        cleartmp: true,
        clearsession: true,
        lastcleartmp: 0,
        lastclearsession: 0,
        status: 0,
        anticall: true,
        autoRestock: false,
        autoRestockCD: 0,
        expiredCD: 0,
        premiumCD: 0,
        loading: true,
        adReply: false,
        smlcap: true,
        dailyReset: 0
      }

      let bot = global.db.data.bots
      let stock = {
        chip: 100000,
        potion: 1000000,
        trash: 1000000,
        wood: 1000000,
        rock: 1000000,
        string: 1000000,
        iron: 1000000,
        diamond: 100000,
        emerald: 100000,
        gold: 100000,
        common: 1000000,
        uncommon: 1000000, 
        arcane: 100000,
        sovereign: 100000,
        petfood: 1000000,
        pet: 1000000,
        anggur: 1000000,
        apel: 1000000,
        jeruk: 1000000,
        mangga: 1000000,
        pisang: 1000000,
        bibitanggur: 1000000,
        bibitapel: 1000000,
        bibitjeruk: 1000000,
        bibitmangga: 1000000,
        bibitpisang: 1000000,
        umpan: 1000000
      }

      let menuthumb = {
        menuai: 'https://tmpfiles.org/dl/19317038/1736606452722.jpg',
        menuinfo: '',
        menutools: 'https://files.catbox.moe/h6l733.jpg',
        menu: 'https://files.catbox.moe/hprlja.jpg',
        menumain: '',
        menuinternet: 'https://files.catbox.moe/q29c4n.jpg',
        menuprem: '',
        menusticker: 'https://files.catbox.moe/hq8k0w.jpg',
        menurpg: '',
        menuanime: '',
        menudownload: 'https://files.catbox.moe/m2unrk.jpg',
        menufun: '',
        menugame: 'https://files.catbox.moe/0gwgj6.jpg',
        menuowner: 'https://files.catbox.moe/ur0kod.jpg',
        menuanonymous: '',
        menuquotes: '',
        menumaker: 'https://files.catbox.moe/cotxd3.jpg',
        menugroup: 'https://files.catbox.moe/utknls.jpg',
        menuislam: 'https://files.catbox.moe/bekotc.jpg',
        menuall: 'https://files.catbox.moe/hq8k0w.jpg',
        menupremium: '',
      }

      let menugif = {
        menuai: '',
        menuinfo: '',
        menutools: '',
        menu: '',
        menumain: '',
        menuinternet: '',
        menuprem: '',
        menusticker: '',
        menurpg: '',
        menuanime: '',
        menudownload: '',
        menufun: '', 
        menugame: '',
        menuowner: '',
        menuanonymous: '',
        menuquotes: '',
        menumaker: '',
        menugroup: '',
        menuislam: '',
        menuall: '',
        group: '',
      }

      let info = {
        ownername: 'Ryzxell',
        nomorown: '62895324429899',
        nomorbot: '6283148375193',
        namabot: 'NeuraAi',
        wm: 'Neura',
        author: 'Ryzxell',
        chtext: '',
        versi: 'V1.0.0',
      }

      let link = {
        group: 'https://chat.whatsapp.com/EcI1kxO1A7KFfAOH42EBtv',
        ig: 'https://instagram.com/genshinimpact',
        gh: 'https://github.com/Shouya28',
        tt: 'https://www.tiktok.com/@shou.yaaa?_t=ZS-8sQBVVJlfko&_r=1',
        chid: '120363368059348079@newsletter',
        chlink: 'https://whatsapp.com/channel/0029Vb0aYgB2f3ELsvVHB00M',
        tautanwa: 'https://wa.me/62895324429899',
        website: 'https://ryzxell-dev.vercel.app',
      }

      let invest = {
        cooldown: 0,
        item: {
          bitcoin: {
            name: "Bitcoin",
            hargaBefore: 5666,
            harga: 5666,
            stock: 10000
          },
          polygon: {
            name: "Polygon", 
            hargaBefore: 1222,
            harga: 1222,
            stock: 10000
          },
          dogecoin: {
            name: "Dogecoin",
            hargaBefore: 122,
            harga: 122,
            stock: 10000
          },
          etherium: {
            name: "Etherium",
            hargaBefore: 4561,
            harga: 4561,
            stock: 10000
          },
          solana: {
            name: "Solana",
            hargaBefore: 4561,
            harga: 4561,
            stock: 10000
          }
        }
      }
      if (typeof bot !== 'object') global.db.data.bots = {}
      if (bot) {
        if (!('menfess' in bot)) bot.menfess = {}
        if (!('anonymous' in bot)) bot.anonymous = {}
        if (!('menugif' in bot)) bot.menugif = menugif
        if (!('gcJoin' in bot)) bot.gcJoin = []
        if (!('menuthumb' in bot)) bot.menuthumb = menuthumb
        if (!('absen' in bot)) bot.absen = {}
        if (!('input' in bot))
          bot.input = {}
        if (!('logs' in bot)) bot.logs = {}
        if (!('ultah' in bot)) bot.ultah = {}
        if (!('invest' in bot)) bot.invest = invest
        if (!('stock' in bot)) bot.stock = stock
        if (!('owner' in bot)) bot.owner = []
        if (!('info' in bot)) bot.info = info
        if (!('alias' in bot))
          bot.alias = {}
        if (!('animeUpdate' in bot))
          bot.animeUpdate = []
       if (!('gempaUpdate' in bot))
          bot.gempaUpdate = []
        if (!('komikUpdate' in bot))
          bot.komikUpdate = []
        if (!('blockcmd' in bot)) bot.blockcmd = []
        if (!('link' in bot)) bot.link = link
      } else global.db.data.bots = {
        menfess: {},
        alias: {},
        blockcmd: [],
        input: {},
        komikUpdate: [],
        gcJoin: [],
        animeUpdate: [],
        gempaUpdate: [],
        anonymous: {},
        absen: {},
        logs: {},
        ultah: {},
        link: link,
        menuthumb: menuthumb,
        menugif: menugif,
        info: info,
        invest: invest,
        stock: stock,
        owner: []
      }

      let member = global.db.data.chats[m.chat].member[m.sender]
      if (typeof member !== 'object') global.db.data.chats[m.chat].member[m.sender] = {}
      if (member) {
        if (!isNumber(member.warn)) member.warn = 0
        if (!('blacklist' in member)) member.blacklist = false
        if (!isNumber(member.blacklistTime)) member.blacklistTime = 0
        if (!isNumber(member.chat)) member.chat = 0
        if (!isNumber(member.chatTotal)) member.chatTotal = 0
        if (!isNumber(member.lastseen)) member.lastseen = 0
      } else global.db.data.chats[m.chat].member[m.sender] = {
        warn: 0,
        blacklist: false,
        blacklistTime: 0,
        chat: 0,
        chatTotal: 0,
        lastseen: 0
      }

    } catch (e) {
      console.error(e)
    }

    const isMods = global.owner.filter(([number, _, isDeveloper]) => number && isDeveloper).map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || global.db.data.bots.owner.filter(([number, _, isDeveloper]) => number && isDeveloper).map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isOwner = m.fromMe || isMods || global.owner.filter(([number, _, isDeveloper]) => number && !isDeveloper).map(([number]) => number).map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isPrems = isOwner || new Date() - global.db.data.users[m.sender].premiumTime < 0
    
    const d = new Date(new Date + 3600000)
    const date = d.toLocaleDateString('id', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    const _command = m.text.substring(1, 10)

    this.suit = this.suit || {}
    const roomSuit = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
    const roomMenfess = Object.values(global.db.data.bots.menfess).find(v => v.status === false && v.penerima == m.sender)

    if (!m.fromMe && opts['self'] && !isOwner) return
    if (opts['pconly'] && m.chat.endsWith('g.us') && !isOwner) return
   if (!m.chat.endsWith('g.us') && !isPrems && new Date() * 1 - global.db.data.users[m.sender].pc > 21600000 && !/terima|tolak|owner|sewa(bot)?|prem(ium)?|(ww|werewolf)pc|menfess|men(fes|fess)|con(fes|fess)/i.test(_command) && !roomSuit && !roomMenfess) return 
   
    if (typeof m.text !== 'string')
      m.text = ''
    if (opts['queque'] && m.text && !(isMods || isPrems)) {
  let queque = this.msgqueque,
    time = 1000 * 5
  const previousID = queque[queque.length - 1]
  queque.push(m.id || m.key.id)
  setInterval(async function() {
    if (queque.indexOf(previousID) === -1) clearInterval(this)
    await delay(time)
  }, time)
}

if (m.isBaileys) return;
if (_command) {
  m.exp += Math.ceil(Math.random() * 10);
}

    let usedPrefix
    let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]
    let _chat = global.db.data && global.db.data.chats && global.db.data.chats[m.chat]

    const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
    const participants = (m.isGroup ? groupMetadata.participants : []) || []
    const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {}
    const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} 
    const isRAdmin = user?.admin == 'superadmin' || false
    const isAdmin = isRAdmin || user?.admin == 'admin' || false 
    const isBotAdmin = bot?.admin || false 
    const isBlacklist = m.isGroup ? Object.entries(_chat.member).find(v => v[1].blacklist && v[0] == m.sender) : false

    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
    for (let name in global.plugins) {
      let plugin = global.plugins[name]
      if (!plugin)
        continue
      if (plugin.disabled)
        continue
      const __filename = join(___dirname, name)
      if (typeof plugin.all === 'function') {
        try {
          await plugin.all.call(this, m, {
            chatUpdate,
            __dirname: ___dirname,
            __filename
          })
        } catch (e) {
          console.error(e)
          for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
            let data = (await conn.onWhatsApp(jid))[0] || {}
            if (data.exists)
              m.reply(`*Plugin:* ${name}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid)
          }
        }
      }
      if (!opts['restrict'])
        if (plugin.tags && plugin.tags.includes('admin')) {
          continue
        }
      const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      const prefix = new RegExp('^[' + (opts['prefix'] || '‎\/!#.\\').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
      let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : prefix
      let match = (_prefix instanceof RegExp ? 
                [[_prefix.exec(m.text), _prefix]] :
        Array.isArray(_prefix) ? 
        _prefix.map(p => {
          let re = p instanceof RegExp ? 
            p :
            new RegExp(str2Regex(p))
          return [re.exec(m.text), re]
        }) :
        typeof _prefix === 'string' ? 
                [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] : [[[], new RegExp]]
      ).find(p => p[1])
      if (typeof plugin.before === 'function') {
        if (await plugin.before.call(this, m, {
            match,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isMods,
            isOwner,
            isRAdmin,
            isAdmin,
            isBotAdmin,
            isPrems,
            chatUpdate,
            __dirname: ___dirname,
            __filename
          }))
          continue
      }
      if (typeof plugin !== 'function')
        continue

      if ((usedPrefix = (match[0] || '')[0])) {
        let noPrefix = m.text.replace(usedPrefix, '')
        let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
        args = args || []
        let _args = noPrefix.trim().split` `.slice(1)
        let text = _args.join` `
        command = (command || '').toLowerCase()
        let fail = plugin.fail || global.dfail 
        let isAccept = plugin.command instanceof RegExp ? 
          plugin.command.test(command) :
          Array.isArray(plugin.command) ? 
          plugin.command.some(cmd => cmd instanceof RegExp ? 
            cmd.test(command) : cmd === command) : typeof plugin.command === 'string' ? 
          plugin.command === command : false

        if (!isAccept)
          continue
        m.plugin = name
        if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
          let chat = global.db.data.chats[m.chat]
          let user = global.db.data.users[m.sender]
          if (name != 'group-info.js' && !isAdmin && chat?.adminOnly)
            return
          if (name != 'group-modebot.js' && name != 'owner-unbanchat.js' && name != 'owner-exec.js' && name != 'owner-exec2.js' && name != 'tool-delete.js' && (chat?.isBanned || chat?.mute))
            return
          if (name != 'owner-unbanuser.js' && name != 'info-cekbanned.js' && user?.banned)
            return
          if (name != 'group-listblacklist.js' && isBlacklist)
            return
        }
        const _setting = global.db.data.settings[this.user.jid]

        if (_setting.composing)
          await this.sendPresenceUpdate('composing', m.chat).catch(() => {})

        if (_setting.autoread)
          await this.readMessages([m.key]).catch(() => {})

        if (plugin.mods && !isMods) {
          fail('mods', m, this)
          continue
        }
        if (plugin.owner && !isOwner) {
          fail('owner', m, this)
          continue
        }
        if (plugin.premium && !isPrems) {
          fail('premium', m, this)
          continue
        }
        if (plugin.group && !m.isGroup) {
          fail('group', m, this)
          continue
        } else if (plugin.botAdmin && !isBotAdmin) {
          fail('botAdmin', m, this)
          continue
        } else if (plugin.admin && !isAdmin) {
          fail('admin', m, this)
          continue
        }
        if (plugin.private && m.isGroup) {
          fail('private', m, this)
          continue
        }
        if (plugin.register && !_user.registered) {
          fail('unreg', m, this)
          continue
        }
        if (plugin.onlyprem && !m.isGroup && !isPrems) {
          fail('onlyprem', m, this)
          continue
        }
        if (plugin.rpg && m.isGroup && !global.db.data.chats[m.chat].rpg) {
          fail('rpg', m, this)
          continue
        }
        if (plugin.game && m.isGroup && !global.db.data.chats[m.chat].game) {
          fail('game', m, this)
          continue
        }
        if (plugin.nsfw && m.isGroup && !global.db.data.chats[m.chat].nsfw) {
          fail('nsfw', m, this)
          continue
        }
        m.isCommand = true
        let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 
        if (xp > 200)
          m.reply('Ngecit -_-') 
        else
          m.exp += xp
        if (plugin.limit && !isPrems && _user.limit < plugin.limit * 1) {
          fail('limitExp', m, this)
          continue
        }
        if (global.db.data.bots.blockcmd.includes(command) || plugin.error >= 5) {
          if (!global.db.data.bots.blockcmd.includes(command)) {
            plugin.error = 0
            global.db.data.bots.blockcmd.push(command);
          }
          
          m.reply(
  "*[ Warning ]*\n _Oops, the feature is currently down due to a *bug/error*.\nPlease wait for the owner to fix it. ><_"
);
          continue;
        }
if (plugin.level > _user.level) {
  this.adReply(
    m.chat,
    `Your level must be above ${plugin.level} to use this command.`,
    'ACCESS DENIED',
    global.infoo.wm,
    global.denied,
    "",
    m,
    false
  );
  continue;
}

if (plugin.age > _user.age) {
  this.adReply(
    m.chat,
    `Your age must be above ${plugin.age} to use this command.`,
    'ACCESS DENIED',
    global.infoo.wm,
    global.denied,
    global.linkk.website,
    m,
    false
  );
  continue;
}
        let extra = {
          match,
          usedPrefix,
          noPrefix,
          _args,
          args,
          command,
          text,
          conn: this,
          participants,
          groupMetadata,
          user,
          bot,
          isMods,
          isOwner,
          isRAdmin,
          isAdmin,
          isBotAdmin,
          isPrems,
          chatUpdate,
          __dirname: ___dirname,
          __filename
        }
        try {
          await plugin.call(this, m, extra)
          if (!isPrems)
            m.limit = m.limit || plugin.limit || false
        } catch (e) {
          m.error = e
          console.error(e)
          if (e) {
            let text = format(e)
            if (e.name)
              for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                let data = (await conn.onWhatsApp(jid))[0] || {}
                if (data.exists)
                  m.reply(`*Plugin:* ${m.plugin}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n*Error Logs:*\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
              }
             
            plugin.error += 1;
            m.reply(global.error);
   }
      } finally {
        if (typeof plugin.after === 'function') {
          try {
            await plugin.after.call(this, m, extra)
          } catch (e) {
            console.error(e)
          }
        }
      }
      break
    }
  }
} catch (e) {
  console.error(e)
} finally {
  if (opts['queque'] && m.text) {
  const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
  if (quequeIndex !== -1)
    this.msgqueque.splice(quequeIndex, 1)
}
  let user,
    stats = global.db.data.stats
  if (m) {
    if (m.sender && (user = global.db.data.users[m.sender])) {
      user.exp += m.exp
      user.limit -= m.limit * 1
    }

    let stat
    if (m.plugin) {
      let now = +new Date
      if (m.plugin in stats) {
        stat = stats[m.plugin]
        if (!isNumber(stat.total))
          stat.total = 1
        if (!isNumber(stat.success))
          stat.success = m.error != null ? 0 : 1
        if (!isNumber(stat.last))
          stat.last = now
        if (!isNumber(stat.lastSuccess))
          stat.lastSuccess = m.error != null ? 0 : now
      } else
        stat = stats[m.plugin] = {
          total: 1,
          success: m.error != null ? 0 : 1,
          last: now,
          lastSuccess: m.error != null ? 0 : now
        }
      stat.total += 1
      stat.last = now
      if (m.error == null) {
        stat.success += 1
        stat.lastSuccess = now
      }
    }
  }

  try {
    if (!opts['noprint']) await printMessage(m, this)
  } catch (e) {
    console.log(m, m.quoted, e)
  }
  let _user = global.db.data.users[m.sender]
  let _chat = global.db.data.chats[m.chat]

  _user.chat++
  _user.chatTotal++
  _user.lastseen = new Date() * 1

  if (m.isGroup) {
    _chat.member[m.sender].chat += 1
    _chat.member[m.sender].chatTotal += 1
    _chat.member[m.sender].lastseen = new Date() * 1
  }
}
}

export async function participantsUpdate({ id, participants, action }) {
  if (this.isInit)
    return
  let chat = global.db.data.chats[id] || {}
  let text = ''
  let d = new Date(new Date + 3600000)
  let locale = 'id'
  let date = d.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
  switch (action) {
    case 'add': {
      if (chat.welcome) {
        let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
        for (let user of participants) {
          let name = global?.db?.data?.users?.[user]?.registered ? global?.db?.data?.users?.[user]?.name : this.getName(user)
          let pp = await this.profilePictureUrl(user, 'image').catch(_ => `https://files.catbox.moe/i3fvd1.jpg`)
          let img = await welcomeBanner(pp, name, await this.getName(id), "welcome")
          text = chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user'
          text = text.replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || 'unknow').replace('@user', "@" + user.split("@")[0])
          this.adReply(id, text.trim(), "W E L C O M E  U S E R", global.infoo.wm, img, global.linkk.ig, false, true, false, { smlcap: false })
        }
      }
      break
    }
    case 'remove': {
      if (chat.welcome) {
        let groupMetadata = await this.groupMetadata(id) || (conn.chats[id] || {}).metadata
        for (let user of participants) {
          let name = global?.db?.data?.users?.[user]?.registered ? global?.db?.data?.users?.[user]?.name : this.getName(user)
          let pp = await this.profilePictureUrl(user, 'image').catch(_ => `https://files.catbox.moe/i3fvd1.jpg`)
          let img = await welcomeBanner(pp, name, await this.getName(id), "bye")
          text = chat.sBye || this.bye || conn.bye || 'Bye @user'
          text = text.replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || 'unknow').replace('@user', "@" + user.split("@")[0])
          this.adReply(id, text.trim(), "GOODBYE  U S E R", global.infoo.wm, img, global.linkk.ig, false, true, false, { smlcap: false })
        }
      }
      break
    }
    case 'promote':
      text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
    case 'demote':
      if (!text) text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
      text = text.replace('@user', '@' + participants[0].split('@')[0])
      if (chat.detect)
        this.reply(id, text, false)
      break
  }
}

export async function groupsUpdate(groupsUpdate) {
  for (const groupUpdate of groupsUpdate) {
    const id = groupUpdate.id
    if (!id) continue
    let chats = global.db.data.chats[id],
      text = ''
    if (!chats?.detect) continue
    if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
    if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
    if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
    if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
    if (!text) continue
    await this.reply(id, text, false)
  }
}

export async function deleteUpdate(message) {
  try {
    const { fromMe, id, participant } = message
    if (fromMe)
      return
    let msg = this.serializeM(this.loadMessage(id))
    if (!msg)
      return
    let chat = global.db.data.chats[msg.chat] || {}
    if (!chat.antidelete)
      return
    await this.reply(msg.chat, `
✦ *Detected @${participant.split`@`[0]} has deleted the message*
> To turn off this feature, type
> *.enable delete*
`.trim(), msg, { mentions: [participant] })
    this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
  } catch (e) {
    console.error(e)
  }
}

global.dfail = (type, m, conn) => {
  let msg = {
    owner: global.msg.owner,
    mods: global.msg.mods,
    premium: global.msg.premium,
    group: global.msg.group,
    private: global.msg.private,
    admin: global.msg.admin,
    botAdmin: global.msg.botAdmin,
    segel: global.msg.segel,
    onlyprem: global.msg.onlyprem,
    nsfw: global.msg.nsfw,
    rpg: global.msg.rpg,
    game: global.msg.game,
    limitExp: global.msg.limitExp,
    restrict: global.msg.restrict,
    unreg: global.msg.unreg
  } [type]
  if (msg) return conn.adReply(m.chat, msg, 'D E C L I N E', global.infoo.wm, global.denied, "", m, false)
}

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
  unwatchFile(file)
  console.log(chalk.blueBright("Update 'neura.js'"))
  if (global.reloadneura) console.log(await global.reloadneura())
})


async function welcomeBanner(avatar, name, subject, type) {
  const title = (type == "welcome" ? "Halo, " : "Sayonara, ") + name
  const desc = (type == "welcome" ? "" : "") + subject
  const background = ["https://files.catbox.moe/impym5.jpg", "https://files.catbox.moe/pn9s2r.jpg"]
  const welcome = await new canvafy.WelcomeLeave()
    .setAvatar(avatar)
    .setBackground("image", background.getRandom())
    .setTitle(title.split("").length > 20 ? (title.substring(0, 16) + "..") : title)
    .setDescription(desc)
    .setBorder("#2a2e35")
    .setAvatarBorder("#2a2e35")
    .build();
  return welcome
}