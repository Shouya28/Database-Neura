let neura = m => m;
const neura = async (m) => {
  
const data = global.owner.filter(([id, isCreator]) => id && isCreator);
this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m);
}

neura.help = ["owner"];
neura.tags = ["info"];
neura.command = ["owner", "developer"];

export default neura
