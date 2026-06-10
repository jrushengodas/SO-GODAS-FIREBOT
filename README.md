<p align="center">
  <img src="https://raw.githubusercontent.com/jrushengodas/SO-GODAS-STREAMERBOT-/main/assets/logo.jpg" width="400">
</p>

<h1 align="center">Godas Twitch Shoutout</h1>

<p align="center">
  Advanced Twitch Shoutout System for Firebot V5
  <br>
  Official Twitch Shoutouts + Announcements + Randomized Messages
</p>

<p align="center">
  <a href="https://github.com/jrushengodas/SO-GODAS-STREAMERBOT-/releases/latest/download/godas-twitch-shoutout.zip">
    <img src="https://img.shields.io/badge/⬇️_DOWNLOAD-COMPLETE_PACKAGE-00ff99?style=for-the-badge&logo=github&logoColor=white">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-stable-green">
  <img src="https://img.shields.io/badge/version-1.0-blue">
  <img src="https://img.shields.io/badge/Firebot_V5-compatible-purple">
  <img src="https://img.shields.io/badge/Twitch_API-supported-red">
  <img src="https://img.shields.io/badge/Open_Source-yes-orange">
</p>

---

# Features

```text
✅ !so command
✅ Official Twitch Shoutout
✅ Twitch Announcement
✅ Randomized messages
✅ Twitch Helix API integration
✅ Automatic user lookup
✅ Automatic category lookup
✅ Automatic stream title lookup
✅ Scan Whole Message support
✅ Firebot V5 compatible
✅ Streamer-only setup supported
✅ Streamer + Bot setup supported
✅ Setup Wizard included
✅ Easy configuration
```

---

# What It Does

When a moderator executes :

```text
!so username
```

The system automatically :

```text
✅ Retrieves Twitch user information
✅ Retrieves stream category
✅ Retrieves channel title
✅ Sends a Twitch Announcement
✅ Attempts an Official Twitch Shoutout
✅ Uses randomized custom messages
```

---

# Architecture

```text
Moderator
   ↓
Firebot V5
   ↓
Godas SO
   ↓
Twitch Helix API
   ↓
Announcement + Official Shoutout
```

---

# Commands

```text
!so username
!so @username
```

Examples :

```text
!so jungpoo97
!so @jungpoo97
```

---

# Message Examples

```text
The kingdom strongly recommends a visit to Benjyyi.

Godas scouts have spotted Benjyyi streaming again.

Transmission intercepted. Benjyyi was recently seen playing Sea of Thieves.

Investigation opened. Evidence points toward Benjyyi.

The council is still debating whether Benjyyi is a genius or a public danger.
```

Messages are randomized automatically.

---

# Compatibility

```text
✅ Firebot V5
✅ Twitch Helix API
✅ Twitch Announcements
✅ Official Twitch Shoutouts
✅ Streamer Account Only
✅ Streamer + Bot Setup
```

---

# Requirements

```text
- Firebot V5
- Scripts Enabled
- Twitch Account
- Twitch API Client ID
- Twitch Access Token
```

---

# Installation

## 1. Enable Scripts

Go to :

```text
Settings
→ Scripts
→ Enable Scripts
```

---

## 2. Import Files

Copy :

```text
godas_so_setup.js
godas_so.js
```

to your Firebot scripts folder.

---

## 3. Run Setup

Launch :

```text
GODAS SO V1.0 - Setup
```

Fill in :

```text
Client ID
Access Token
Broadcaster ID
Moderator ID
```

Then execute the setup.

---

## 4. Create Command

Create a command :

```text
!so
```

Enable :

```text
Scan Whole Message
```

---

## 5. Access Control

Recommended permission :

```text
Moderator
```

or

```text
Broadcaster + Moderator
```

---

## 6. Add Effect

Add :

```text
Run Script
```

Select :

```text
godas_so.js
```

No argument mapping is required.

---

# Twitch Token

Generate a token :

```text
https://twitchtokengenerator.com/
```

Required scopes :

```text
chat:read
chat:edit
moderator:manage:shoutouts
moderator:read:shoutouts
```

Copy :

```text
Client ID
Access Token
```

---

# Twitch IDs

Retrieve Twitch IDs :

```text
https://api.ivr.fi/v2/twitch/user?login=PSEUDO
```

Example :

```text
https://api.ivr.fi/v2/twitch/user?login=je_rush_en_godas
```

Response :

```json
{
  "id":"247012777"
}
```

The returned value is the Twitch ID.

---

# Streamer Only Setup

If you use your streamer account only :

```text
Broadcaster ID = Streamer ID
Moderator ID = Streamer ID
```

Example :

```text
247012777
247012777
```

Both values are identical.

---

# Streamer + Bot Setup

If you use a dedicated bot account :

```text
Broadcaster ID = Streamer ID
Moderator ID = Bot ID
```

Important :

```text
The bot account MUST be moderator.
```

Example :

```text
Streamer : je_rush_en_godas
Bot      : je_bot_en_godas
```

---

# Official Twitch Shoutout Rules

Twitch only allows official shoutouts when :

```text
✅ Stream is live
✅ At least one viewer is present
✅ Correct moderator permissions
✅ Correct scopes
✅ Correct moderator account
```

---

# Technologies

```text
- Firebot V5
- JavaScript
- Node.js
- Twitch Helix API
```

---

# Credits

### Development

```text
Godas DEV
```

<p align="center">
  <strong>Godas Twitch Shoutout</strong>
  <br>
  Developed by <strong>Godas DEV</strong>
  <br><br>
  <img src="https://img.shields.io/badge/GODAS-DEV-00ff99?style=for-the-badge">
</p>
