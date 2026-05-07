# roasting-bot

A Discord bot with a `!l` command for light roast lines.

## Behavior

- `!l @user`  
  Sends a random roast line.
- `!l @user optional description`  
  Sends a roast line that uses the description (not random).

Example:

```text
!l @ivan your "top-tier strategy" was copy-paste from Stack Overflow
```

## 1. Create a Discord bot

1. Open: https://discord.com/developers/applications
2. Create **New Application**.
3. Go to **Bot** tab, click **Add Bot**.
4. Turn on these **Privileged Gateway Intents**:
   - Message Content Intent
5. Copy the bot token.

## 2. Invite bot to your server

1. In the app page, open **OAuth2** -> **URL Generator**.
2. Select scopes:
   - `bot`
3. Select permissions:
   - `Send Messages`
   - `Read Message History`
   - `View Channels`
4. Open generated URL and invite the bot to your server.

## 3. Install locally

```bash
npm install
```

## 4. Configure environment

Create `.env` from `.env.example`, then fill your token:

```env
DISCORD_TOKEN=your_bot_token_here
```

## 5. Run bot

```bash
npm start
```

If successful, terminal prints:

```text
Bot is online as <bot-name>#<tag>
```

## Keep it online from your laptop

- Your laptop must stay **on**, connected to internet, and keep this process running.
- If you close terminal, bot stops.
- For auto-restart, use a process manager like PM2:

```bash
npm install -g pm2
pm2 start index.js --name roasting-bot
pm2 save
```

After reboot:

```bash
pm2 resurrect
```

## Notes

- This bot is intentionally light and playful. Avoid harassment or hate speech.
- You can edit roast lines in `index.js`.
