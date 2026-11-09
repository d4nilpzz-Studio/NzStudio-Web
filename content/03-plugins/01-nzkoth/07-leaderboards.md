# Leaderboards

Every koth win is added to all leaderboards, for the player and for their team. Timed boards reset when their period ends.

| Board | Resets |
| --- | --- |
| `alltime` (also `total`, `global`) | Never |
| `hourly` | Every hour |
| `daily` | Every day |
| `weekly` | Every 7 days |
| `monthly` | Every 30 days |
| `<number><m/h/d/w>` | Custom, e.g. `30m`, `12h`, `3d`, `2w` |

Boards in `leaderboards.preload` in `config.yml` start counting when the server starts. Other boards start counting the first time they are used in a command or placeholder.

```yaml
leaderboards:
  preload:
    - alltime
    - daily
    - weekly
```

Show a board in chat:

```bash
/nzkoth top weekly
```

Or use the [leaderboard placeholders](./04-placeholders.md), e.g. `%nzkoth_top_weekly_1_player_name%`.

To share leaderboards between servers, use the same `MYSQL` or `POSTGRESQL` database on all of them (see [configuration](./08-configuration.md)).
