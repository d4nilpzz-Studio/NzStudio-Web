# Editing a Koth

You can edit a koth with the GUI editor or in its file `plugins/NzKoth/koths/<koth>.yml` (run `/nzkoth reload` after editing the file).

```bash
/nzkoth editor <koth>
```

## Modes

 - `CAPTURE`

Stay in the koth zone for the whole capture time without anyone else inside. If another player enters, the koth is **contested** and the timer pauses. If you leave, the timer resets (see `reset-on-leave`). The first player to finish the capture time wins.

 - `SCORE`

For every second a player is alone in the zone, they gain 1 point. When the zone is contested nobody gets points. If you get knocked out, your points stay. The koth ends when a player reaches the target score or the max time runs out, and the winner is the player with the most points.

## GUI editor

| Option | Description | Default |
| --- | --- | --- |
| Mode | Switch between `CAPTURE` and `SCORE` | - |
| Capture time | Seconds a player has to hold the zone to win (`CAPTURE`) | `300` |
| Target score | Points a player needs to win (`SCORE`) | `300` |
| Max time | Max duration of the koth in seconds (`SCORE`) | `900` |
| Boss bar | `show` / `hide` | `show` |
| Broadcast | `enable` / `disable` the chat messages | `enable` |
| Hologram | `enable` / `disable` the hologram above the zone | `enable` |
| View distance | Blocks around the koth where players see the boss bar, scoreboard and messages. `-1` = the whole world | `-1` |
| Winner crown | `enable` / `disable` | `enable` |
| Crown model | Item and custom model data of the crown. Press `Q` to reset to the resource pack crown | resource pack |
| Crown glow | Full bright crown | `enable` |
| Crown enchant glint | Enchant glint on the crown | `disable` |
| Crown outline | Glowing outline and its color: `gold`, `yellow`, `red`, `aqua`, `green`, `light_purple`, `white`, `blue` | `enable`, `gold` |
| Crown height | Blocks above the winner's head | `2.2` |
| Rewards | Opens the [rewards](./05-rewards.md) editor | - |

## File only options

These options are only in the koth file:

```yaml
settings:
  display-name: '<red>Castle'  # MiniMessage name used in holograms and placeholders
  reset-on-leave: true         # CAPTURE: reset the timer when the capturer leaves
  team-mode: false             # Show the capturer's team (see Configuration > Teams)
display:
  scoreboard: true
  same-world-only: false       # Only players in the koth world see it
crown:
  spin-ticks: 40               # Ticks for a full spin of the crown
```

How long the crown stays over the winner is set in `config.yml` with `crown.duration-ticks` (default `200` = 10 seconds).
