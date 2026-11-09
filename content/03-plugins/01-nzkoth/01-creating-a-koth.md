# Creating a Koth

1. Get the selection wand:

```bash
/nzkoth wand
```

2. Select the zone: `left-click` a block for the first corner and `right-click` another block for the second corner.

3. Stand where players should be teleported with `/nzkoth tp` and create the koth with a mode (`CAPTURE` or `SCORE`):

```bash
/nzkoth create <name> <mode>
```

> [!NOTE]
> The place where you stand when you run `create` is saved as the koth spawn.

4. Now you can edit the koth settings:

```bash
/nzkoth editor <name>
```

5. Start it by hand, with a [scheduler](./06-schedulers.md) or with a [starter item](./03-commands.md):

```bash
/nzkoth start <name>
```

Each koth is saved as its own file in `plugins/NzKoth/koths/<name>.yml`.
