const fs = require("fs"); 
require("dotenv").config();

module.exports = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Darkweb",
    ownerNumber: process.env.OWNER_NUMBER || "2348114226898",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ === "false",
    autoViewStatus: process.env.AUTO_VIEW_STATUS === "true",
    autoReact: process.env.AUTO_REACT === "false",
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUxzS0ZiV1I2MEVuMzJOZGVYVElhNk5mbHNqSUVsWW1PZGpoMnJ3YmtVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYnozZzJJb2pJN3Y4bFZLUFZTTEdKMFhnVkxmYkZUM2JEQUdkOFR0WGhoTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4T1ZqNTRRbGczM1RNWFVQWllpaHE3VVFiM2dyWlZRUnhDK3EzUzZIZlV3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTWhjSThyVDZGQTFZRnQvK0FhOUxzSm9SRWVCOFJ6cGpBeEQ0WnZKNVQ4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlDMWVrZmN0azU2S3N6UHp5Sy8zNU03bUFIOVJrUDFXWWJjbmFEdFptSGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imo2U05DYkprTDZwM1BzSDNCSWszRVA1R2NhenFjQXlFN2hUR1VWTUlqVGs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1BMSnk5QlAzR2pFQXh5Z2d3Rmg5U3NBTnFRdEVsNTkwUXpWWityNlRVcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXlTMVcvWG9PTE9kdTJjUnN0Ykp3T0lPUWs2K2NzaHhGOHdmeExtUm9ncz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJhVUFqOER3aCtpQkoyUVdwYVNva0Rrd2VaYjdHbk04WkhrK1NTUzJmZnBiYVBlTXc1eEtpdnQ2bzQzbGFHRkdrb0EzMGVaRDVVajd1b1UyNVV2UUFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc3LCJhZHZTZWNyZXRLZXkiOiIxbm9xRkJhVVVJMXVZY3NjV2NWT0NPK09HQTlBaytrNmlJYjBlYVN4NGY4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIzRzdXNlY1QSIsIm1lIjp7ImlkIjoiMjM0ODExNDIyNjg5ODozMUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjY4ODIzMTQzMTY1OTcxOjMxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT09Tby9rREVLYUM1THdHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWjEvZkN3Q1dud3hvYVJSMVNQUXUyQkhFSm1WQTdualJndUdub2pRU2xDND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY0VDNHBJVkpRVllQaUJ0UDhCcSt2cUNyQndmT1hhRTFQK2p4QUFJTEtwek5SZWdGVXZ0emVWWGdjdlF0OU1GUDNwMWF2Z1ZuUyt2L0NnWFF4UmFsQ1E9PSIsImRldmljZVNpZ25hdHVyZSI6Im40QVFPRHc5cVZMSk5Mb2Y2aHVJdC94MHRiaDFtdUFJcFhZRXgzKzZEWkdhYzZ2ZGtJbEI2Qmd3T3c5bWpSZkU3eHJRTFFZczJxakxqaGR3NDJsREFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODExNDIyNjg5ODozMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXZGYzd3NBbHA4TWFHa1VkVWowTHRnUnhDWmxRTzU0MFlMaHA2STBFcFF1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzgwODA1NjIsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFCNEFBQThEIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED || "false",
};

let file = require.resolve(__filename); 
fs.watchFile(file, () => {
    fs.unwatchFile(file); 
    console.log(`Update '${__filename}'`); 
    delete require.cache[file];
    require(file); 
});
