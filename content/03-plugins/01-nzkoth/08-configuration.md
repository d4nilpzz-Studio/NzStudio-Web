# Configuration

Main settings are in `plugins/NzKoth/config.yml`. Messages, the boss bar and broadcasts are in `messages.yml`. All texts use [MiniMessage](https://docs.advntr.dev/minimessage/format.html).

## Storage

Where wins and leaderboards are saved. Changing it needs a restart.

```yaml
storage:
  type: YAML          # YAML, MYSQL (also MariaDB) or POSTGRESQL
  host: localhost
  port: 0             # 0 = default port (3306 MySQL, 5432 PostgreSQL)
  database: nzkoth
  username: ''
  password: ''
  table-prefix: 'nzkoth_'
  pool-size: 4
  properties: {}      # extra JDBC options, e.g. useSSL: false
```

## Modules

Turn off the boss bar, scoreboard or broadcasts for every koth:

```yaml
modules:
  bossbars: true
  scoreboards: true
  broadcasts: true
```

## Wand and starter items

```yaml
wand:
  material: GOLDEN_AXE
  custom-model-data: 0
starter:
  material: NETHER_STAR
  custom-model-data: 0
```

## Teams

Used when a koth has `team-mode: true`. The team comes from the PlaceholderAPI `placeholder` (for example from a clans plugin) or, if empty, from the player's vanilla scoreboard team.

```yaml
teams:
  display: SUFFIX     # REPLACE (team only), PREFIX ([team] name) or SUFFIX (name [team])
  placeholder: ''     # e.g. '%clans_tag%'
  no-team: ''         # text for players without a team
```

## Discord webhooks

```yaml
webhooks:
  enabled: false
  url: ''
  username: 'NzKoth'
  color: 16731469
  events:
    start: '**%koth%** has started (%mode%)'
    stop: '**%koth%** was stopped'
    capture-start: '%player% is capturing **%koth%**'
    capture-stop: '**%koth%** is no longer being captured'
    capture: '%player% has won **%koth%**'
    end: '**%koth%** ended with no winner'
```

## Scoreboard

There is one list of lines for `capture` and one for `score`. See the [builtin tags](./04-placeholders.md#builtin-tags).

```yaml
scoreboard:
  hide-numbers: true
  title: '<gradient:#ff4d4d:#ffb84d><bold><koth></bold></gradient>'
  lines:
    capture:
      - '<gray>Status: <white><status>'
      - '<gray>Time left: <yellow><time>'
      - '<bar>'
```

## Progress bar

```yaml
progress-bar:
  length: 20
  symbol: '|'
  filled: '<green>'
  empty: '<dark_gray>'
```

## Hologram

A text hologram above the highest block in the center of the koth. The `idle` lines show while the koth is not running.

| Option | Description | Default |
| --- | --- | --- |
| `enabled` | Show holograms | `true` |
| `update-ticks` | How often it updates | `20` |
| `height` | Blocks above the highest block | `1.0` |
| `billboard` | `CENTER` (faces the player), `FIXED`, `VERTICAL` or `HORIZONTAL` | `CENTER` |
| `alignment` | Text alignment | `CENTER` |
| `scale` | Size | `1.2` |
| `shadow` | Text shadow | `true` |
| `see-through` | Visible through blocks | `false` |
| `background` | ARGB hex like `'#40000000'`, `none` or `default` | `none` |
| `line-width` | Max line width | `250` |
| `view-range` | Multiplier of the view distance (`1.0` = 64 blocks) | `1.5` |
| `full-bright` | Ignore the light level | `true` |
| `not-scheduled` | Text for `<next>` when the koth has no scheduler | `Not scheduled` |

## Resource pack

The plugin comes with a resource pack for the winner crown. Without it, set another crown item in the koth editor.
