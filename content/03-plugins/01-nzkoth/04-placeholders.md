# Placeholders

NzKoth has two kinds of placeholders:

- **PlaceholderAPI** placeholders (`%nzkoth_...%`), usable in any plugin.
- **Builtin** tags (`<koth>`, `<time>`...), usable in the NzKoth scoreboard, boss bar, hologram and messages.

PlaceholderAPI placeholders like `%player_name%` also work inside NzKoth messages when PlaceholderAPI is installed.

## PlaceholderAPI

Replace `<koth>` with the koth name, for example `%nzkoth_castle_timeleft%`.

Add `_formatted` to any time placeholder marked with ✓ to get a readable time (`4m 30s`) instead of seconds.

### Koth

| Placeholder | Description | `_formatted` |
| --- | --- | --- |
| `%nzkoth_<koth>_active%` | `true` or `false`, is the koth running? (also `_running`) | |
| `%nzkoth_<koth>_name%` | Raw name of the koth | |
| `%nzkoth_<koth>_displayname%` | Colored display name of the koth | |
| `%nzkoth_<koth>_mode%` | `CAPTURE` or `SCORE` | |
| `%nzkoth_<koth>_world%` | World of the koth | |
| `%nzkoth_<koth>_x%` / `_y%` / `_z%` | Center of the koth zone | |
| `%nzkoth_<koth>_status%` | `stopped`, `Uncontrolled`, `Contested` or the capturer | |
| `%nzkoth_<koth>_contested%` | `true` if more than one player is inside | |
| `%nzkoth_<koth>_capturer%` | Player capturing (with team in team mode) | |
| `%nzkoth_<koth>_capturer_name%` | Name of the player capturing | |
| `%nzkoth_<koth>_capturer_team%` | Team of the player capturing | |
| `%nzkoth_<koth>_leader%` | Player with most points (`SCORE`) or capturer (`CAPTURE`) | |
| `%nzkoth_<koth>_time%` | Capture time of the koth | ✓ |
| `%nzkoth_<koth>_timeleft%` | Time left of the running koth | ✓ |
| `%nzkoth_<koth>_timeleft_clock%` | Time left as `mm:ss` | |
| `%nzkoth_<koth>_timetaken%` | Time since the koth started | ✓ |
| `%nzkoth_<koth>_maxtime%` | Max time of the koth | ✓ |
| `%nzkoth_<koth>_maxtimeleft%` | Time left until the max time | ✓ |
| `%nzkoth_<koth>_progress%` | Capture progress from `0` to `100` | |
| `%nzkoth_<koth>_target%` | Target score (`SCORE`) | |
| `%nzkoth_<koth>_score%` | Points of the player viewing (`SCORE`) | |
| `%nzkoth_<koth>_score_<n>_player%` | Player in position `n` of the score ranking | |
| `%nzkoth_<koth>_score_<n>_points%` | Points of the player in position `n` | |
| `%nzkoth_<koth>_next%` | Time until the next scheduled start of this koth | ✓ |

### Global

| Placeholder | Description |
| --- | --- |
| `%nzkoth_version%` | Plugin version |
| `%nzkoth_running%` | Number of running koths |
| `%nzkoth_total%` | Number of koths |
| `%nzkoth_wins%` | All-time wins of the player (also `_player_wins`) |
| `%nzkoth_team_wins%` | All-time wins of the player's team |
| `%nzkoth_next%` | Seconds until the next scheduled koth (`_formatted` too) |
| `%nzkoth_next_<scheduler>%` | Seconds until a specific scheduler runs (`_formatted` too) |

### Leaderboards

`<board>` is optional: without it the `alltime` board is used. See [leaderboards](./07-leaderboards.md).

| Placeholder | Description |
| --- | --- |
| `%nzkoth_top_<n>_player_name%` | Name of the player in position `n` |
| `%nzkoth_top_<n>_player_wins%` | Wins of the player in position `n` |
| `%nzkoth_top_<n>_team_name%` | Name of the team in position `n` |
| `%nzkoth_top_<n>_team_wins%` | Wins of the team in position `n` |
| `%nzkoth_top_<board>_<n>_player_name%` | Same, for a board, e.g. `%nzkoth_top_weekly_1_player_name%` |

## Builtin tags

Used in `config.yml` (scoreboard, hologram) and `messages.yml` (boss bar, broadcasts).

| Tag | Description |
| --- | --- |
| `<koth>` | Name of the koth |
| `<display-name>` | Display name of the koth |
| `<mode>` | `CAPTURE` or `SCORE` |
| `<status>` | `Uncontrolled`, `Contested` or the capturer |
| `<controller>` | Player capturing |
| `<leader>` | Player with most points |
| `<score>` | Points of the leader |
| `<target>` | Target score |
| `<time>` | Time left as `mm:ss` |
| `<progress>` | Progress from `0` to `100` |
| `<bar>` | Progress bar (see `progress-bar` in `config.yml`) |
| `<viewer>` | Player looking at the scoreboard or hologram |

The idle hologram (koth not running) supports `<koth>`, `<display-name>`, `<mode>`, `<next>`, `<capture-time>` and `<target>`.
