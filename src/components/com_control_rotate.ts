import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export function control_powerup() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlPowerup;
    };
}
