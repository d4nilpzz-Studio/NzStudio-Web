# Rewards

Rewards are given to the winner of a koth. Edit them in the GUI with the chest icon called `Rewards` in `/nzkoth editor <koth>`, or in the koth file.

## Commands

Commands run from the console. `%player%` (or `{player}`) is replaced with the winner's name.

```yaml
rewards:
  commands:
    - 'eco give %player% 1000'
    - 'lp user %player% permission settemp koth.vip true 1d'
  broadcast-commands:
    - 'broadcast %player% won the koth!'
```

## Items

Each item has a chance and a random amount. If the inventory is full, the items drop at the winner's feet.

| Option | Description | Default |
| --- | --- | --- |
| `item` | The item, with all its name, lore and enchants | - |
| `chance` | Chance to get it, from `0` to `100` | `100` |
| `min-amount` | Minimum amount | `1` |
| `max-amount` | Maximum amount | `1` |
| `message` | Optional message sent when the item is given. `%reward%` shows the item and amount | - |

> [!TIP]
> In the rewards editor, click an item in your inventory (or place it in an empty slot) to add it. Then click the reward to set its chance, amounts and message. Commands and broadcast commands are added with the command block and bell icons.
