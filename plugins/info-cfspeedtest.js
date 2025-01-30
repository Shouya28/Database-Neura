/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import https from "https";
import { performance } from "perf_hooks";

const neura = async (m, { conn }) => {
  const [ping, serverLocationData, { ip, loc, colo }] = await Promise.all([
    measureLatency(),
    fetchServerLocationData(),
    fetchCfCdnCgiTrace(),
  ]);

  const city = serverLocationData[colo];
  const maskedIp = ip ? `${ip.slice(0, 7)}***` : "Unknown";

  let output = "乂 *CF Speed Test*\n";
  output += logInfo("Server location", `${city} (${colo})`);
  output += logInfo("Your IP", `${maskedIp} (${loc})`);
  output += logLatency(ping);
  output += logSpeedTestResult("100kB", await measureDownload(101e3, 10));
  output += logSpeedTestResult("1MB", await measureDownload(1001e3, 8));
  output += logSpeedTestResult("10MB", await measureDownload(10001e3, 6));
  output += logSpeedTestResult("25MB", await measureDownload(25001e3, 4));
  output += logSpeedTestResult("100MB", await measureDownload(100001e3, 1));
  output += logDownloadSpeed([
    ...(await measureDownload(101e3, 10)),
    ...(await measureDownload(1001e3, 8)),
    ...(await measureDownload(10001e3, 6)),
    ...(await measureDownload(25001e3, 4)),
    ...(await measureDownload(100001e3, 1)),
  ]);
  output += logUploadSpeed([
    ...(await measureUpload(11e3, 10)),
    ...(await measureUpload(101e3, 10)),
    ...(await measureUpload(1001e3, 8)),
  ]);
  output += "";
  
  await conn.reply(m.chat, output, fwa);
};

neura.help = ["cfspeedtest"];
neura.tags = ["info"];
neura.command = /^(cfspeedtest)$/i;
neura.error = 0;

export default neura;

function average(values) {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function median(values) {
  values.sort((a, b) => a - b);
  const half = Math.floor(values.length / 2);
  return values.length % 2 ? values[half] : (values[half - 1] + values[half]) / 2;
}

function quartile(values, percentile) {
  values.sort((a, b) => a - b);
  const pos = (values.length - 1) * percentile;
  const base = Math.floor(pos);
  const rest = pos - base;
  return values[base + 1] !== undefined ? values[base] + rest * (values[base + 1] - values[base]) : values[base];
}

function jitter(values) {
  const jitters = [];
  for (let i = 0; i < values.length - 1; i++) {
    jitters.push(Math.abs(values[i] - values[i + 1]));
  }
  return average(jitters);
}

async function get(hostname, path) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, path, method: "GET" }, (res) => {
      const body = [];
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => resolve(Buffer.concat(body).toString()));
    });
    req.on("error", reject);
    req.end();
  });
}

async function fetchServerLocationData() {
  const data = await get("speed.cloudflare.com", "/locations");
  return JSON.parse(data).reduce((acc, { iata, city }) => ({ ...acc, [iata]: city }), {});
}

async function fetchCfCdnCgiTrace() {
  const text = await get("speed.cloudflare.com", "/cdn-cgi/trace");
  return text.split("\n").reduce((acc, line) => {
    const [key, value] = line.split("=");
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});
}

function request(options, data = "") {
  return new Promise((resolve, reject) => {
    const started = performance.now();
    let dnsLookup, tcpHandshake, sslHandshake, ttfb, ended;

    const req = https.request(options, (res) => {
      res.once("readable", () => (ttfb = performance.now()));
      res.on("data", () => {});
      res.on("end", () => {
        ended = performance.now();
        resolve([
          started,
          dnsLookup,
          tcpHandshake,
          sslHandshake,
          ttfb,
          ended,
          parseFloat(res.headers["server-timing"]?.slice(22) || 0),
        ]);
      });
    });

    req.on("socket", (socket) => {
      socket.on("lookup", () => (dnsLookup = performance.now()));
      socket.on("connect", () => (tcpHandshake = performance.now()));
      socket.on("secureConnect", () => (sslHandshake = performance.now()));
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function download(bytes) {
  return request({
    hostname: "speed.cloudflare.com",
    path: `/__down?bytes=${bytes}`,
    method: "GET",
  });
}

function upload(bytes) {
  const data = "0".repeat(bytes);
  return request(
    {
      hostname: "speed.cloudflare.com",
      path: "/__up",
      method: "POST",
      headers: { "Content-Length": Buffer.byteLength(data) },
    },
    data
  );
}

function measureSpeed(bytes, duration) {
  return (8 * bytes) / (duration / 1e3) / 1e6;
}

async function measureLatency() {
  const measurements = [];
  for (let i = 0; i < 20; i++) {
    const response = await download(1e3);
    measurements.push(response[4] - response[0] - response[6]);
  }
  return [
    Math.min(...measurements),
    Math.max(...measurements),
    average(measurements),
    median(measurements),
    jitter(measurements),
  ];
}

async function measureDownload(bytes, iterations) {
  const measurements = [];
  for (let i = 0; i < iterations; i++) {
    const response = await download(bytes);
    const transferTime = response[5] - response[4];
    measurements.push(measureSpeed(bytes, transferTime));
  }
  return measurements;
}

async function measureUpload(bytes, iterations) {
  const measurements = [];
  for (let i = 0; i < iterations; i++) {
    const response = await upload(bytes);
    const transferTime = response[6];
    measurements.push(measureSpeed(bytes, transferTime));
  }
  return measurements;
}

function logInfo(text, data) {
  return `- ${text}: ${data}\n`;
}

function logLatency(data) {
  return `- Latency: ${data[3].toFixed(2)} ms\n- Jitter: ${data[4].toFixed(2)} ms\n`;
}

function logSpeedTestResult(size, test) {
  return `- ${size} speed: ${median(test).toFixed(2)} Mbps\n`;
}

function logDownloadSpeed(tests) {
  return `- Download speed (90th percentile): ${quartile(tests, 0.9).toFixed(2)} Mbps\n`;
}

function logUploadSpeed(tests) {
  return `- Upload speed (90th percentile): ${quartile(tests, 0.9).toFixed(2)} Mbps\n`;
}