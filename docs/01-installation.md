# Firebot Settings

Before using the script, make sure custom scripts are enabled in Firebot.

Go to :

```text
Settings
→ Scripts
→ Enable Scripts
```

---

# Command Trigger

Create a command trigger :

```text
!so
```

Enable :

```text
Scan Whole Message
```

This allows the command to read :

```text
!so username
!so @username
```

---

# Effects

Add the following effect :

```text
Run Script
```

Select :

```text
godas_so.js
```

---

# Access Control

For security, the shoutout command should be restricted to moderators.

Go to :

```text
Access Control
→ Permissions
```

Set permission to :

```text
Moderator
```

Recommended :

```text
Broadcaster
Moderator
```

Do not leave the command public unless you want every viewer to trigger shoutouts.
