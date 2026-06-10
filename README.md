<p align="center">
  <img src="https://raw.githubusercontent.com/jrushengodas/YTM-GODAS-STREAMERBOT/main/assets/logo.jpg" width="400">
</p>

<h1 align="center">Godas Twitch Shoutout</h1>

<p align="center">
  Advanced Twitch Shoutout System for Firebot
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
  <img src="https://img.shields.io/badge/Firebot-compatible-purple">
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
✅ Auto user lookup
✅ Auto category lookup
✅ Auto stream title lookup
✅ Firebot compatible
✅ Streamer-only setup supported
✅ Streamer + Bot setup supported
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
Firebot
   ↓
Godas Shoutout
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

Example :

```text
!so jungpoo97
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
✅ Firebot
✅ Twitch Helix API
✅ Twitch Announcements
✅ Official Twitch Shoutouts
✅ Streamer Account Only
✅ Streamer + Bot Setup
```

---

# Requirements

```text
- Firebot
- Twitch Account
- Twitch API Client ID
- Twitch Access Token
- Newtonsoft.Json
```

---

# Installation

## 1. Create Command

Create a Twitch command :

```text
!so
```

Add argument :

```text
input0
Auto Type
Required = Yes
```

---

## 2. Add Arguments

Create the following arguments :

```text
godas_so_client_id
godas_so_access_token
godas_so_broadcaster_id
godas_so_moderator_id
```

Recommended order :

```text
Set Argument godas_so_client_id
Set Argument godas_so_access_token
Set Argument godas_so_broadcaster_id
Set Argument godas_so_moderator_id
Execute Code
```

---

## 3. Import Script

Import the included C# code into your Firebot action.

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

Configure :

```text
godas_so_client_id
godas_so_access_token
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

The value returned is the Twitch ID.

---

# Streamer Only Setup

If you use your streamer account only :

```text
godas_so_broadcaster_id = Streamer ID
godas_so_moderator_id = Streamer ID
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
godas_so_broadcaster_id = Streamer ID
godas_so_moderator_id = Bot ID
```

Important :

```text
The bot account MUST be moderator.
```

Example :

```text
Streamer : je_rush_en_godas
Bot      : je_bot_en_godas

godas_so_broadcaster_id = Streamer ID
godas_so_moderator_id = Bot ID
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

# Technologies

```text
- Firebot
- C#
- Twitch Helix API
- Newtonsoft.Json
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
