# Developer API

NzKoth fires Bukkit events you can listen to from your own plugin. All of them extend `KothEvent`, which gives the koth with `koth()`.

| Event | When | Extra |
| --- | --- | --- |
| `KothStartEvent` | A koth starts | - |
| `KothCaptureStartEvent` | A player starts capturing | `player()` |
| `KothCaptureStopEvent` | Nobody is capturing anymore | - |
| `KothEndEvent` | A koth ends | `winner()` (`null` if no winner) |

Package: `dev.d4nilpzz.nzKoth.api.event`

```java
@EventHandler
public void onKothEnd(KothEndEvent event) {
    if (event.winner() != null) {
        getLogger().info(event.winner().getName() + " won " + event.koth().name());
    }
}
```

Add `NzKoth` to `depend` or `softdepend` in your `plugin.yml`.
