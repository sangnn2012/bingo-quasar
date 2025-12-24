# Roadmap

Future feature ideas for the Bingo Lô Tô game.

## Gameplay

| Feature       | Description                                                         | Priority |
| ------------- | ------------------------------------------------------------------- | -------- |
| Number caller | Auto-call random numbers with voice/sound, Vietnamese announcements | High     |
| Win detection | Auto-detect when a row/board is complete, show celebration          | High     |
| Game history  | Track called numbers, show which are remaining                      | Medium   |
| Reset board   | Clear all ticks without regenerating numbers                        | Medium   |

## Persistence

| Feature             | Description                          | Priority |
| ------------------- | ------------------------------------ | -------- |
| Save game state     | LocalStorage to resume after refresh | High     |
| Save preferences    | Remember color/icon choices          | High     |
| Multiple game slots | Save/load different board sets       | Low      |

## UI/UX

| Feature       | Description                           | Priority |
| ------------- | ------------------------------------- | -------- |
| Dark mode     | Toggle light/dark theme               | Medium   |
| Print view    | CSS for printing physical tickets     | Medium   |
| Animations    | Confetti on win, tile flip animations | Low      |
| Sound effects | Click sounds, win fanfare             | Low      |

## Mobile/PWA

| Feature      | Description                     | Priority |
| ------------ | ------------------------------- | -------- |
| PWA support  | Install as app, offline play    | High     |
| Vibration    | Haptic feedback on tile tap     | Low      |
| Share boards | Generate shareable link/QR code | Medium   |

## Advanced

| Feature            | Description                           | Priority |
| ------------------ | ------------------------------------- | -------- |
| Multiplayer        | Host a game room, sync called numbers | Low      |
| Custom board count | Generate 1-4 boards per player        | Medium   |
| Statistics         | Track wins, games played              | Low      |

## Suggested Starting Points

1. **Number caller** - Core bingo functionality
2. **Win detection** - Makes the game complete
3. **Save preferences** - Quick win for UX
4. **PWA support** - Better mobile experience
