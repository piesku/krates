import {set} from "../../common/quat.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.Move | Has.Transform;

export function sys_control_keyboard(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlPlayer[entity];

    if (control.Move) {
        let move = game.World.Move[entity];
        if (game.InputState["ArrowUp"]) {
            // Move forward
            move.Directions.push([0, 0, 1]);
        } else if (game.InputState["ArrowLeft"]) {
            // Strafe left
            move.Directions.push([1, 0, 0]);
        } else if (game.InputState["ArrowDown"]) {
            // Move backward
            move.Directions.push([0, 0, -1]);
        } else if (game.InputState["ArrowRight"]) {
            // Strafe right
            move.Directions.push([-1, 0, 0]);
        }
    }

    if (control.Yaw) {
        let transform = game.World.Transform[entity];
        if (game.InputState["ArrowUp"]) {
            // Move forward
            set(transform.Rotation, 0, 1, 0, 0);
        } else if (game.InputState["ArrowLeft"]) {
            // Move left
            set(transform.Rotation, 0, -0.707, 0, 0.707);
        } else if (game.InputState["ArrowDown"]) {
            // Move backward
            set(transform.Rotation, 0, 0, 0, 1);
        } else if (game.InputState["ArrowRight"]) {
            // Move right
            set(transform.Rotation, 0, 0.707, 0, 0.707);
        }
    }
}
