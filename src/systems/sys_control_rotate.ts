import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPowerup | Has.Transform | Has.Move;

export function sys_control_powerup(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let move = game.World.Move[entity];
    move.LocalRotations.push([0, 1, 0, 0]);
}
