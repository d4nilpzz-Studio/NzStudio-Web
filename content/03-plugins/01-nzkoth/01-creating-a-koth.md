# Creating a Koth

1. Select the zone with the wand: `/koth wand`
2. Create the koth:

```bash
/koth create <name>
```

3. Edit its settings in `plugins/NzKoth/koths/<name>.yml`:

```yaml title="koths/castle.yml"
display-name: "&6Castle"
capture-time: 300 # seconds
rewards:
  - "eco give %player% 5000"
  - "crate key give %player% legendary 1"
```

> [!WARNING]
> Run `/koth reload` after editing the file.
