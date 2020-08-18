import {Vec3} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Move | Has.ControlPlayer;

export function sys_control_keyboard(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

let axis: Vec3 = [0, 0, 0];

function update(game: Game, entity: Entity) {
    let control = game.World.ControlPlayer[entity];

    if (control.Move) {
        let move = game.World.Move[entity];
        if (game.InputState["ArrowUp"]) {
            // Move forward
            move.Directions.push([0, 0, 1]);
        }
        if (game.InputState["ArrowLeft"]) {
            // Strafe left
            move.Directions.push([1, 0, 0]);
        }
        if (game.InputState["ArrowDown"]) {
            // Move backward
            move.Directions.push([0, 0, -1]);
        }
        if (game.InputState["ArrowRight"]) {
            // Strafe right
            move.Directions.push([-1, 0, 0]);
        }
    }
}
