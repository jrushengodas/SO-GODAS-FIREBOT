# 🔑 TWITCH IDS & TOKEN

Le système utilise :

```text
Client ID
Access Token
Broadcaster ID
Moderator ID
```

---

# Générer un Token

Aller sur :

```text
https://twitchtokengenerator.com
```

---

# Scopes requis

```text
chat:read
chat:edit
moderator:manage:shoutouts
moderator:read:shoutouts
```

---

# Copier

```text
Client ID
Access Token
```

---

# Trouver un Twitch ID

Aller sur :

```text
https://api.ivr.fi/v2/twitch/user?login=PSEUDO
```

Exemple :

```text
https://api.ivr.fi/v2/twitch/user?login=je_rush_en_godas
```

Réponse :

```json
{
  "id":"247012777"
}
```

---

# Streamer Only

```text
Broadcaster ID = Streamer ID
Moderator ID = Streamer ID
```

---

# Streamer + Bot

```text
Broadcaster ID = Streamer ID
Moderator ID = Bot ID
```

Le bot doit être modérateur.

---

# Important

Le token doit être généré par le compte correspondant au :

```text
Moderator ID
```

Sinon Twitch retournera :

```text
403 Forbidden
```
