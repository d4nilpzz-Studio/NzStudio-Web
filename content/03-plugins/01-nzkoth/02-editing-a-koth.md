# Editing a Koth

1. You can edit a koth by the config file or with the command:
```bash
/nzkoth editor <koth>
```

### Mode

 - CAPTURE

You must stay in the koth zone for x seconds without getting knocked out. The winner is the player, who can stay in for the whole capture time.

 - SCORE

For every second a player stays in the zone, they will gain 1 point (only 1 player can get points at once) - if you get knocked out, the points stay and after either the time runs out or you reach a set time, the winner will be the player with the most points.

### Capture Time

This indicates how much time a player has to stay inside the koth to win, by default: `300s`

### Target Score

This indicates how much point a player has to collect to win, by default: `300`

### Max Time

This is the maximun duration of the koth by default: `900s`

### Toggles
 - Boss Bar `show` / `hide`
 - Broadcast `enable` / `disable`
 - Winner Crown `enable` / `disable`
 - Crown Custom Model Data `1001` - `1003` with the texturepack
 - Crown Full Bright `enable` / `disable`
 - Crown Enchant Glint `enable` / `disable`
 - Crown Outline `enable` / `disable`
 - Crown Outline Color `previus` / `next`
 - Crown Height `2.5` by default


### Rewards

Customize command rewards and messages with the chest icon called `Rewards`