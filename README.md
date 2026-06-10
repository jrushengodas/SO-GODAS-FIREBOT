# Godas Twitch Shoutout pour Streamer.bot

Commande `!so` pour Streamer.bot avec :

- annonce Twitch personnalisée ;
- messages aléatoires ;
- récupération des infos Twitch via API Helix ;
- vrai Shoutout officiel Twitch ;
- configuration par arguments Streamer.bot ;
- compatible compte streamer seul ou compte bot modérateur.

## Exemple

```txt
!so jungpoo97
!so @jungpoo97
```

Le script envoie une annonce Twitch avec un message aléatoire, puis tente aussi le shoutout officiel Twitch.

## Installation

Dans Streamer.bot :

```txt
Actions → Add → Name : Godas Shoutout
```

Ajoutez un trigger de commande Twitch :

```txt
!so
```

Argument :

```txt
input0
Auto Type
Required : Yes
```

## Arguments à créer avant Execute Code

Ajoutez ces sub-actions avant `Execute Code` :

```txt
Set Argument : godas_so_client_id
Set Argument : godas_so_access_token
Set Argument : godas_so_broadcaster_id
Set Argument : godas_so_moderator_id
```

Ordre recommandé :

```txt
1. Set Argument godas_so_client_id
2. Set Argument godas_so_access_token
3. Set Argument godas_so_broadcaster_id
4. Set Argument godas_so_moderator_id
5. Execute Code
```

Collez ensuite le contenu de :

```txt
src/GodasShoutout.cs
```

## Récupérer le Client ID et l'Access Token

Méthode rapide :

https://twitchtokengenerator.com/

Connectez-vous avec le compte qui exécutera le shoutout.

Scopes recommandés :

```txt
chat:read
chat:edit
moderator:manage:shoutouts
moderator:read:shoutouts
```

Copiez :

```txt
Client ID
Access Token
```

Puis mettez-les dans les arguments Streamer.bot :

```txt
godas_so_client_id
godas_so_access_token
```

Le token peut être collé avec ou sans `oauth:`.

## Récupérer les IDs Twitch

Le `Broadcaster ID` et le `Moderator ID` ne sont pas des pseudos. Ce sont des IDs numériques Twitch.

Méthode rapide :

```txt
https://api.ivr.fi/v2/twitch/user?login=PSEUDO
```

Exemple :

```txt
https://api.ivr.fi/v2/twitch/user?login=je_rush_en_godas
```

Dans la réponse JSON, récupérez :

```json
"id": "247012777"
```

## Configuration avec un seul compte Twitch

Si vous utilisez votre compte streamer pour tout :

```txt
godas_so_broadcaster_id = ID du streamer
godas_so_moderator_id = ID du streamer
```

Les deux valeurs sont identiques.

## Configuration avec un compte bot

Si vous utilisez un compte bot séparé :

```txt
godas_so_broadcaster_id = ID du streamer
godas_so_moderator_id = ID du bot
```

Important : le compte bot doit être modérateur de la chaîne.

## Important sur le Shoutout officiel Twitch

Le script envoie toujours l'annonce personnalisée.

En revanche, le shoutout officiel Twitch peut être refusé par Twitch si :

```txt
The broadcaster is not streaming live or does not have one or more viewers.
```

Cela signifie que la chaîne n'est pas en live ou n'a pas au moins 1 viewer.

Dans ce cas, le script n'est pas cassé : Twitch bloque simplement le shoutout officiel hors live.

## Erreurs courantes

### 400 Bad Request

Cause possible :

```txt
La chaîne n'est pas en live ou n'a pas au moins 1 viewer.
```

### 403 Forbidden

Causes possibles :

```txt
- le token n'a pas les scopes nécessaires ;
- le moderator_id ne correspond pas au compte du token ;
- le compte bot n'est pas modérateur de la chaîne.
```

### Configuration manquante

Vérifiez que les arguments existent avant `Execute Code` :

```txt
godas_so_client_id
godas_so_access_token
godas_so_broadcaster_id
godas_so_moderator_id
```

## Personnaliser les messages

Dans `src/GodasShoutout.cs`, modifiez le tableau :

```csharp
string[] messages =
{
    "...",
    "..."
};
```

Variables déjà utilisées dans le code :

```txt
displayName
login
title
game
```

## Licence

MIT
