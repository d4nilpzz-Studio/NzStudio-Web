# Commands

All commands need the permission `nzkoth.admin` (given to OPs by default).

| Command | Description |
| --- | --- |
| `/nzkoth wand` | Give the selection wand |
| `/nzkoth create <koth> <mode>` | Create a koth from your selection. Modes: `CAPTURE`, `SCORE` |
| `/nzkoth delete <koth>` | Delete a koth (stops it if running) |
| `/nzkoth start <koth>` | Start a koth |
| `/nzkoth stop <koth>` | Stop a running koth |
| `/nzkoth stopall` | Stop every running koth |
| `/nzkoth editor <koth>` | Open the GUI editor of a koth |
| `/nzkoth schedulers` | Open the [scheduler](./06-schedulers.md) GUI |
| `/nzkoth tp <koth>` | Teleport to the koth spawn |
| `/nzkoth list` | List all koths with their mode, state and region |
| `/nzkoth givestarter <koth> <player> [amount]` | Give a starter item. Right-click it to start the koth |
| `/nzkoth top [board]` | Top 10 players of a [leaderboard](./07-leaderboards.md). Default: `alltime` |
| `/nzkoth resetwins <player>` | Reset the wins of a player in every leaderboard |
| `/nzkoth reload` | Reload the config, messages, koths and schedulers |

## Permissions

| Permission | Description | Default |
| --- | --- | --- |
| `nzkoth.admin` | Access to every `/nzkoth` command | `op` |

See also the [placeholders](./04-placeholders.md).
