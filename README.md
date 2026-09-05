# bhd_animaltracker

FiveM resource for tracking animals (players using an animal ped) so their owner
can find them again. Runs on ESX and QB-Core through
[bhd_bridge](https://github.com/bohous04/bhd_bridge).

## How it works

- Use the `animal_tracker` item on an animal through ox_target ("Put on tracking
  collar"), enter a name and an optional image URL. The item is consumed and the
  collar is saved to the database.
- The owner runs `/hafo` to open a menu of their animals with three actions:
  **Find my animal**, **Rename**, **Change image**.
- "Find" puts a blip on the animal's current position for 60 seconds, or tells
  you the animal is offline.
- "Remove tracking collar" on the animal deletes the record.
- Collars can only go on animal peds, never on player models, and only the owner
  can use them. Tampered events are answered with a ban through the bridge.
- Locales: `en`, `cs` (`locales/`).

## Dependencies

- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_target](https://github.com/overextended/ox_target)
- [oxmysql](https://github.com/overextended/oxmysql)
- [bhd_bridge](https://github.com/bohous04/bhd_bridge)

## Installation

1. Put the resource in `resources/` and start it after its dependencies:

   ```
   ensure ox_lib
   ensure oxmysql
   ensure ox_target
   ensure bhd_bridge
   ensure bhd_animaltracker
   ```

2. Create the table. No SQL file ships with the resource; this matches the
   columns the code reads and writes:

   ```sql
   CREATE TABLE IF NOT EXISTS `bhd_animaltracker` (
     `id` INT NOT NULL AUTO_INCREMENT,
     `owner` VARCHAR(64) NOT NULL,
     `pedIdentifier` VARCHAR(64) NOT NULL,
     `name` VARCHAR(64) NOT NULL,
     `image` VARCHAR(255) DEFAULT NULL,
     PRIMARY KEY (`id`)
   );
   ```

3. Add the `animal_tracker` item to your inventory.

4. Change the item name or the command in `config.lua` if needed.

## UI

The menu is a React + Vite + Tailwind app in `web/`. A prebuilt copy is in
`web/build`, which is what the resource loads. To rebuild: `cd web && npm install
&& npm run build`.

## Links

- Documentation: https://docs.bhdscripts.com/scripts/bhd-animalTracker
- Discord: https://discord.gg/xZZu23AcpP
