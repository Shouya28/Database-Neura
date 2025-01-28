/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
const neura = m => m;
function calculateSimilarity(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  if (str1 === str2) return 1;
  if (str1.length < 2 || str2.length < 2) return 0;

  let pairs1 = new Set();
  let pairs2 = new Set();

  for (let i = 0; i < str1.length - 1; i++) {
    pairs1.add(str1.slice(i, i + 2));
  }

  for (let i = 0; i < str2.length - 1; i++) {
    pairs2.add(str2.slice(i, i + 2));
  }

  const intersection = new Set([...pairs1].filter(x => pairs2.has(x)));
  const union = new Set([...pairs1, ...pairs2]);

  return (2.0 * intersection.size) / (pairs1.size + pairs2.size);
}

function findClosestCommand(input, commands) {
  let bestMatch = '';
  let highestSimilarity = 0;

  for (const cmd of commands) {
    const similarity = calculateSimilarity(input, cmd);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = cmd;
    }
  }

  return {
    command: bestMatch,
    similarity: highestSimilarity * 100
  };
}

neura.before = async function(m, { match }) {
  try {
    const prefix = (match[0] || '')[0];
    if (!prefix) return;

    const inputCommand = m.text.replace(prefix, '').trim().split(' ')[0];
    const availableCommands = Object.values(global.plugins)
      .filter(v => v.help && !v.disabled)
      .map(v => v.help)
      .flat(1);

    if (availableCommands.includes(inputCommand)) return;

    const suggestion = findClosestCommand(inputCommand, availableCommands);

    if (suggestion.similarity > 70) { 
      const message = `Apakah anda sedang mencari menu berikut ini?\n\n` +
        `◦ Name Command: *${prefix}${suggestion.command}*\n` +
        `◦ Hasil Kesamaan: *${Math.round(suggestion.similarity)}%*`;

      await m.reply(message);
    }
  } catch (error) {
    console.error('Error in command suggestion:', error);
  }
};

export default neura;