import {set} from "../../common/quat.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.Walk | Has.Transform;

export function sys_control_keyboard(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlPlayer[entity];
    let walk = game.World.Walk[entity];

    if (control.Move && !walk.IsWalking) {
        if (game.InputState["ArrowUp"]) {
            walk.Z -= 1;
            walk.IsWalking = true;
        } else if (game.InputState["ArrowLeft"]) {
            walk.X -= 1;
            walk.IsWalking = true;
        } else if (game.InputState["ArrowDown"]) {
            walk.Z += 1;
            walk.IsWalking = true;
        } else if (game.InputState["ArrowRight"]) {
            walk.X += 1;
            walk.IsWalking = true;
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
