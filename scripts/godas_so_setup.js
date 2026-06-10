const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

exports.getScriptManifest = () => ({
    name: "GODAS SO V1.0 - Setup",
    description: "Setup Twitch Shoutout Godas V1.0 pour Firebot",
    author: "Godas DEV",
    version: "1.0.0",
    firebotVersion: "5"
});

exports.getDefaultParameters = () => {
    return Promise.resolve({
        clientId: {
            type: "string",
            description: "Twitch Client ID",
            default: ""
        },

        accessToken: {
            type: "string",
            description: "Twitch Access Token",
            default: ""
        },

        broadcasterId: {
            type: "string",
            description: "Broadcaster ID / ID de la chaîne streamer",
            default: ""
        },

        moderatorId: {
            type: "string",
            description: "Moderator ID / ID du compte qui exécute le shoutout",
            default: ""
        },

        openSuccessPage: {
            type: "boolean",
            description: "Ouvrir la page de confirmation",
            default: true
        }
    });
};

exports.run = async (runRequest) => {
    const logger = runRequest.modules.logger;
    const vars = runRequest.modules.customVariableManager;
    const parameters = runRequest.parameters || {};

    try {
        logger.info("GODAS SO SETUP V1.0 | Script lancé");

        const clientId = (parameters.clientId || "").toString().trim();
        const accessToken = (parameters.accessToken || "").toString().trim();
        const broadcasterId = (parameters.broadcasterId || "").toString().trim();
        const moderatorId = (parameters.moderatorId || "").toString().trim();
        const shouldOpenPage = parameters.openSuccessPage !== false;

        if (!clientId || !accessToken || !broadcasterId || !moderatorId) {
            await setVar(
                vars,
                "godas_so_last_message",
                "❌ Setup incomplet : renseigne Client ID, Access Token, Broadcaster ID et Moderator ID."
            );

            logger.error("GODAS SO SETUP V1.0 | Configuration incomplète.");

            return {
                success: false
            };
        }

        const cleanToken = accessToken.replace(/^oauth:/i, "").trim();

        const configPath = path.join(__dirname, "godas_so_config.json");

        const config = {
            clientId,
            accessToken: cleanToken,
            broadcasterId,
            moderatorId,
            version: "1.0.0",
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(
            configPath,
            JSON.stringify(config, null, 4),
            "utf8"
        );

        await initVars(vars);

        await setVar(vars, "godas_so_client_id", clientId);
        await setVar(vars, "godas_so_access_token", cleanToken);
        await setVar(vars, "godas_so_broadcaster_id", broadcasterId);
        await setVar(vars, "godas_so_moderator_id", moderatorId);

        await setVar(
            vars,
            "godas_so_last_message",
            "✅ GODAS SO configuré avec succès !"
        );

        logger.info("GODAS SO SETUP V1.0 | Config sauvegardée");
        logger.info("GODAS SO SETUP V1.0 | Config path : " + configPath);
        logger.info("GODAS SO SETUP V1.0 | Client ID : " + clientId);
        logger.info("GODAS SO SETUP V1.0 | Access Token : " + maskToken(cleanToken));
        logger.info("GODAS SO SETUP V1.0 | Broadcaster ID : " + broadcasterId);
        logger.info("GODAS SO SETUP V1.0 | Moderator ID : " + moderatorId);

        if (shouldOpenPage) {
            openSetupPageOnce(
                clientId,
                cleanToken,
                broadcasterId,
                moderatorId,
                logger
            );
        } else {
            logger.info("GODAS SO SETUP V1.0 | Page setup désactivée.");
        }

        return {
            success: true
        };

    } catch (err) {
        logger.error("GODAS SO SETUP V1.0 | ERREUR : " + err.stack);

        try {
            await setVar(
                vars,
                "godas_so_last_message",
                "❌ Erreur setup GODAS SO."
            );
        } catch {}

        return {
            success: false
        };
    }
};

async function initVars(vars) {
    await setVar(vars, "godas_so_client_id", "");
    await setVar(vars, "godas_so_access_token", "");
    await setVar(vars, "godas_so_broadcaster_id", "");
    await setVar(vars, "godas_so_moderator_id", "");

    await setVar(vars, "godas_so_last_target", "");
    await setVar(vars, "godas_so_last_message", "");
    await setVar(vars, "godas_so_last_status", "");
    await setVar(vars, "godas_so_count", "0");
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

function maskToken(token) {
    if (!token) return "";

    if (token.length <= 10) {
        return "********";
    }

    return token.substring(0, 5) + "..." + token.substring(token.length - 5);
}

function openSetupPageOnce(clientId, accessToken, broadcasterId, moderatorId, logger) {
    if (global.__GODAS_SO_SETUP_PAGE_OPENED) {
        logger.info("GODAS SO SETUP V1.0 | Page déjà ouverte récemment, ouverture ignorée.");
        return;
    }

    global.__GODAS_SO_SETUP_PAGE_OPENED = true;

    setTimeout(() => {
        global.__GODAS_SO_SETUP_PAGE_OPENED = false;
    }, 10000);

    openSuccessPage(clientId, accessToken, broadcasterId, moderatorId, logger);
}

function openSuccessPage(clientId, accessToken, broadcasterId, moderatorId, logger) {
    const setupPort = 5001;

const mode =
    broadcasterId === moderatorId
        ? "STREAMER ONLY"
        : "STREAMER + BOT";

const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>GODAS SO V1.0</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    background:
        radial-gradient(circle at top,#10382f 0%,#111827 40%,#05070b 100%);
    font-family:Segoe UI,Arial,sans-serif;
    color:white;
    padding:40px;
}

.card{
    width:850px;
    max-width:95vw;
    background:#1f2937;
    border-radius:40px;
    padding:35px;
    text-align:center;
    border:1px solid rgba(0,255,153,.15);
    box-shadow:
        0 0 70px rgba(0,255,153,.22),
        0 0 140px rgba(0,255,153,.08);
}

.logo{
    width:340px;
    height:340px;
    object-fit:cover;
    border-radius:35px;
    box-shadow:0 0 55px rgba(0,255,153,.90);
    display:block;
    margin:0 auto;
}

.badge{
    display:inline-block;
    margin-top:22px;
    padding:10px 18px;
    border-radius:999px;
    background:rgba(0,255,153,.12);
    color:#00ff99;
    font-weight:700;
    font-size:14px;
}

.mode{
    display:inline-block;
    margin-top:12px;
    padding:8px 15px;
    border-radius:999px;
    background:rgba(255,193,7,.12);
    color:#ffc107;
    font-size:13px;
    font-weight:700;
}

h1{
    margin-top:18px;
    font-size:42px;
    color:#00ff99;
    text-shadow:0 0 25px rgba(0,255,153,.4);
}

.subtitle{
    margin-top:10px;
    font-size:18px;
    color:#e5e7eb;
}

.line{
    width:100%;
    height:1px;
    margin:35px 0;
    background:rgba(255,255,255,.08);
}

.grid{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:15px;
    margin-top:10px;
}

.item{
    background:#111827;
    border-radius:18px;
    padding:18px;
    color:#00ff99;
    font-weight:700;
}

.info{
    margin-top:25px;
    background:#111827;
    border-radius:20px;
    padding:25px;
    text-align:left;
    font-family:Consolas, monospace;
    font-size:15px;
    line-height:1.8;
}

.info span{
    color:#00ff99;
}

.warning{
    margin-top:30px;
    color:#ffc107;
    font-weight:700;
    font-size:16px;
}

.links{
    margin-top:35px;
    display:flex;
    justify-content:center;
    flex-wrap:wrap;
    gap:12px;
}

.links a{
    text-decoration:none;
    color:#00ff99;
    background:rgba(0,255,153,.08);
    border:1px solid rgba(0,255,153,.25);
    padding:12px 18px;
    border-radius:999px;
    transition:.2s;
    font-weight:700;
}

.links a:hover{
    transform:translateY(-2px);
    background:rgba(0,255,153,.14);
}

.footer{
    margin-top:35px;
    opacity:.7;
    font-size:14px;
}

.version{
    color:#00ff99;
    font-weight:bold;
}

</style>
</head>

<body>

<div class="card">

<img
class="logo"
src="https://raw.githubusercontent.com/jrushengodas/SO-GODAS-STREAMERBOT-/main/assets/logo.jpg"
alt="Godas SO Logo">

<div class="badge">
GODAS SO V1.0
</div>

<br>

<div class="mode">
${mode}
</div>

<h1>✅ Setup réussi</h1>

<div class="subtitle">
Configuration Twitch Shoutout sauvegardée.
</div>

<div class="line"></div>

<div class="grid">

<div class="item">
✅ Variables Firebot initialisées
</div>

<div class="item">
✅ Twitch API prête
</div>

<div class="item">
✅ Official Shoutout prêt
</div>

<div class="item">
✅ Twitch Announcement prêt
</div>

</div>

<div class="info">

<span>Client ID</span> : ${clientId}<br>

<span>Access Token</span> : ${maskToken(accessToken)}<br>

<span>Broadcaster ID</span> : ${broadcasterId}<br>

<span>Moderator ID</span> : ${moderatorId}<br>

<span>Mode</span> : ${mode}

</div>

<div class="warning">
⚠️ Le shoutout officiel Twitch fonctionne uniquement si le stream est live avec au moins 1 viewer.
</div>

<div class="links">

<a href="https://twitchtokengenerator.com/" target="_blank">
🔑 Token Generator
</a>

<a href="https://api.ivr.fi/v2/twitch/user?login=PSEUDO" target="_blank">
🆔 Twitch ID Finder
</a>

<a href="https://github.com/jrushengodas/SO-GODAS-STREAMERBOT-" target="_blank">
📖 Documentation
</a>

</div>

<div class="footer">
<span class="version">GODAS SO V1.0</span>
<br>
Firebot V5 Compatible
<br>
Developed by Godas DEV
</div>

</div>

</body>
</html>
`;

    const server = http.createServer((req, res) => {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store"
        });

        res.end(html);

        setTimeout(() => {
            server.close();
        }, 1000);
    });

    server.on("error", (err) => {
        logger.info("GODAS SO SETUP V1.0 | Page setup impossible : " + err.message);
    });

    server.listen(setupPort, "127.0.0.1", () => {
        const url = `http://127.0.0.1:${setupPort}/`;

        logger.info("GODAS SO SETUP V1.0 | Ouverture page setup : " + url);

        try {
            exec(`start "" "${url}"`);
        } catch (err) {
            logger.info("GODAS SO SETUP V1.0 | Ouverture navigateur impossible : " + err.message);
        }
    });
}