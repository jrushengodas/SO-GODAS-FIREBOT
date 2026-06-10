const https = require("https");
const fs = require("fs");
const path = require("path");

exports.getScriptManifest = () => ({
    name: "GODAS SO V1.0 - Command",
    description: "Commande !so",
    author: "Godas DEV",
    version: "1.0.0",
    firebotVersion: "5"
});

exports.getDefaultParameters = () => {
    return Promise.resolve({});
};

exports.run = async (runRequest) => {
    const logger = runRequest.modules.logger;
    const vars = runRequest.modules.customVariableManager;

    try {
        logger.info("GODAS SO V1.0 | Commande lancée");

        let target = extractTargetFromMessage(runRequest);

        if (!target) {
            await sendChat(runRequest, "Utilisation : !so pseudo");
            return { success: false };
        }

        const config = await loadConfig(vars, logger);

        if (!config.clientId ||
            !config.accessToken ||
            !config.broadcasterId ||
            !config.moderatorId) {
            await sendChat(runRequest, "❌ GODAS SO non configuré. Lance d'abord le setup.");
            return { success: false };
        }

        const token = config.accessToken.replace(/^oauth:/i, "").trim();

        const userData = await twitchGet(
            `https://api.twitch.tv/helix/users?login=${encodeURIComponent(target)}`,
            config.clientId,
            token
        );

        if (!userData.data || userData.data.length === 0) {
            await sendChat(runRequest, `Impossible de trouver @${target}.`);
            return { success: false };
        }

        const user = userData.data[0];

        const targetBroadcasterId = user.id;
        const login = user.login;
        const displayName = user.display_name || login;

        const channelData = await twitchGet(
            `https://api.twitch.tv/helix/channels?broadcaster_id=${encodeURIComponent(targetBroadcasterId)}`,
            config.clientId,
            token
        );

        let title = "aucun titre trouvé";
        let game = "catégorie inconnue";

        if (channelData.data && channelData.data.length > 0) {
            title = channelData.data[0].title || title;
            game = channelData.data[0].game_name || game;
        }

        logger.info(
            `GODAS SO DEBUG | from=${config.broadcasterId} | to=${targetBroadcasterId} | mod=${config.moderatorId} | target=${login}`
        );

        try {
            await twitchPost(
                `https://api.twitch.tv/helix/chat/shoutouts?from_broadcaster_id=${encodeURIComponent(config.broadcasterId)}&to_broadcaster_id=${encodeURIComponent(targetBroadcasterId)}&moderator_id=${encodeURIComponent(config.moderatorId)}`,
                config.clientId,
                token
            );

            logger.info(`GODAS SO | Shoutout officiel envoyé à @${login}`);
            await setVar(vars, "godas_so_last_status", "official_shoutout_sent");
        } catch (err) {
            logger.info(`GODAS SO | Shoutout officiel impossible : ${err.message}`);
            await setVar(vars, "godas_so_last_status", "official_shoutout_failed");
        }

        const messages = [
            `Allez voir ${displayName} ! https://twitch.tv/${login} Son dernier stream était "${title}" dans la catégorie ${game}.`,
            `Le royaume recommande fortement une visite chez ${displayName}. Retrouvez-le sur https://twitch.tv/${login} où il sévissait récemment dans ${game}.`,
            `Alerte découverte ! ${displayName} a été aperçu dans la catégorie ${game}. Dossier complet ici : https://twitch.tv/${login}`,
            `Les éclaireurs de Godas signalent que ${displayName} continue ses activités sur Twitch. Dernier titre observé : "${title}". https://twitch.tv/${login}`,
            `Transmission interceptée : ${displayName} diffuse régulièrement du ${game}. Venez enquêter : https://twitch.tv/${login}`,
            `Le conseil de Godas hésite encore à classer ${displayName} comme génie ou danger public. À vous de juger : https://twitch.tv/${login}`,
            `Après enquête, il semblerait que ${displayName} soit responsable de streams dans la catégorie ${game}. Les preuves : https://twitch.tv/${login}`,
            `Si vous aimez ${game}, allez jeter un œil à ${displayName} : https://twitch.tv/${login}. Son dernier stream s'appelait "${title}".`,
            `Rapport officiel : ${displayName} a récemment diffusé "${title}" dans ${game}. Plus d'informations : https://twitch.tv/${login}`,
            `Les experts n'ont toujours pas compris ce que prépare ${displayName}, mais ça se passe ici : https://twitch.tv/${login}`
        ];

        const finalMessage = messages[Math.floor(Math.random() * messages.length)];

        await sendAnnouncement(runRequest, finalMessage);

        await setVar(vars, "godas_so_last_target", login);
        await setVar(vars, "godas_so_last_message", finalMessage);
        await incrementCount(vars);

        return { success: true };

    } catch (err) {
        logger.error("GODAS SO V1.0 | ERREUR : " + err.stack);

        try {
            await sendChat(runRequest, "❌ Erreur pendant le shoutout.");
        } catch {}

        return { success: false };
    }
};

function extractTargetFromMessage(runRequest) {
    let raw = "";

    if (runRequest.trigger && runRequest.trigger.metadata) {
        const metadata = runRequest.trigger.metadata;

        raw =
            metadata.commandArgs ||
            metadata.rawArgs ||
            metadata.chatMessage ||
            metadata.message ||
            metadata.rawMessage ||
            "";
    }

    raw = raw.toString().trim();

    raw = raw.replace(/^!so\s+/i, "");
    raw = raw.replace(/^\/so\s+/i, "");

    const parts = raw.split(/\s+/).filter(Boolean);

    let target = "";

    if (parts.length > 0) {
        target = parts[0];
    }

    target = target
        .replace("@", "")
        .replace("https://twitch.tv/", "")
        .replace("http://twitch.tv/", "")
        .replace("twitch.tv/", "")
        .replace(/[^\w]/g, "")
        .trim()
        .toLowerCase();

    return target;
}

async function loadConfig(vars, logger) {
    const configPath = path.join(__dirname, "godas_so_config.json");

    if (fs.existsSync(configPath)) {
        try {
            const raw = fs.readFileSync(configPath, "utf8").replace(/^\uFEFF/, "");
            const config = JSON.parse(raw);

            return {
                clientId: config.clientId || "",
                accessToken: config.accessToken || "",
                broadcasterId: config.broadcasterId || "",
                moderatorId: config.moderatorId || ""
            };
        } catch (err) {
            logger.info("GODAS SO | Config JSON invalide : " + err.message);
        }
    }

    return {
        clientId: await getVar(vars, "godas_so_client_id"),
        accessToken: await getVar(vars, "godas_so_access_token"),
        broadcasterId: await getVar(vars, "godas_so_broadcaster_id"),
        moderatorId: await getVar(vars, "godas_so_moderator_id")
    };
}

function twitchGet(url, clientId, accessToken) {
    return twitchRequest("GET", url, clientId, accessToken);
}

function twitchPost(url, clientId, accessToken) {
    return twitchRequest("POST", url, clientId, accessToken);
}

function twitchRequest(method, url, clientId, accessToken) {
    return new Promise((resolve, reject) => {
        const req = https.request(
            url,
            {
                method,
                headers: {
                    "Client-ID": clientId,
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            },
            (res) => {
                let body = "";

                res.on("data", chunk => {
                    body += chunk;
                });

                res.on("end", () => {
                    if (res.statusCode < 200 || res.statusCode >= 300) {
                        reject(new Error(body || `Twitch API error ${res.statusCode}`));
                        return;
                    }

                    if (!body.trim()) {
                        resolve({});
                        return;
                    }

                    try {
                        resolve(JSON.parse(body));
                    } catch {
                        resolve({});
                    }
                });
            }
        );

        req.on("error", reject);
        req.end();
    });
}

async function sendChat(runRequest, message) {
    const effects = runRequest.modules.effectManager;

    if (effects && typeof effects.runEffect === "function") {
        await effects.runEffect({
            type: "firebot:chat",
            message
        });

        return;
    }

    console.log("[GODAS SO CHAT]", message);
}

async function sendAnnouncement(runRequest, message) {
    const effects = runRequest.modules.effectManager;

    if (effects && typeof effects.runEffect === "function") {
        await effects.runEffect({
            type: "firebot:chat",
            message: `/announce ${message}`
        });

        return;
    }

    console.log("[GODAS SO ANNOUNCE]", message);
}

async function setVar(vars, name, value) {
    if (!vars) return;

    if (typeof vars.setCustomVariable === "function") {
        await vars.setCustomVariable(name, value);
        return;
    }

    if (typeof vars.addCustomVariable === "function") {
        await vars.addCustomVariable(name, value);
    }
}

async function getVar(vars, name) {
    if (!vars) return "";

    try {
        if (typeof vars.getCustomVariable === "function") {
            const value = await vars.getCustomVariable(name);
            return value ? value.toString() : "";
        }
    } catch {}

    return "";
}

async function incrementCount(vars) {
    const currentRaw = await getVar(vars, "godas_so_count");
    const current = parseInt(currentRaw || "0", 10) || 0;

    await setVar(vars, "godas_so_count", String(current + 1));
}