import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.Transform;

export function sys_control_keyboard(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    if (!(game.World.Signature[entity] & Has.Walk)) {
        let walk = game.World.Walk[entity];
        if (game.InputState["ArrowUp"]) {
            walk.Z -= 1;
            game.World.Signature[entity] |= Has.Walk;
        } else if (game.InputState["ArrowLeft"]) {
            walk.X -= 1;
            game.World.Signature[entity] |= Has.Walk;
        } else if (game.InputState["ArrowDown"]) {
            walk.Z += 1;
            game.World.Signature[entity] |= Has.Walk;
        } else if (game.InputState["ArrowRight"]) {
            walk.X += 1;
            game.World.Signature[entity] |= Has.Walk;
        }
    }
}
