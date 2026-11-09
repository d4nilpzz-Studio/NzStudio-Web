# Schedulers

Schedulers start or stop koths automatically. Open the GUI with:

```bash
/nzkoth schedulers
```

Click the emerald to add a scheduler, then choose:

| Option | Description |
| --- | --- |
| Koth | Koth to start or stop |
| Action | `START` or `STOP` |
| Frequency | `Daily` at an hour and minute, `Every X hours` at a minute, or `Every X minutes` |
| Days | Every day or only the days you select |
| Enabled | Turn the scheduler on or off without deleting it |

Times use the server time zone.

## schedulers.yml

Schedulers are saved in `plugins/NzKoth/schedulers.yml` with a cron expression (`minute hour day-of-month month day-of-week`):

```yaml
schedulers:
  '1':
    koth: castle
    cron: '0 20 * * *'        # every day at 20:00
    action: START
    enabled: true
  '2':
    koth: castle
    cron: '30 */2 * * sat,sun' # every 2 hours at minute 30, on weekends
    action: START
    enabled: true
```

Run `/nzkoth reload` after editing the file. Use `%nzkoth_next_formatted%` to show the time until the next koth.
