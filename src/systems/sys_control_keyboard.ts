import {set} from "../../common/quat.js";
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
    let control = game.World.ControlPlayer[entity];

    if (control.Move && !(game.World.Signature[entity] & Has.Walk)) {
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

    if (control.Yaw) {
        let transform = game.World.Transform[entity];
        if (game.InputState["ArrowUp"]) {
            // Move forward
            set(transform.Rotation, 0, 1, 0, 0);
            transform.Dirty = true;
        } else if (game.InputState["ArrowLeft"]) {
            // Move left
            set(transform.Rotation, 0, -0.707, 0, 0.707);
            transform.Dirty = true;
        } else if (game.InputState["ArrowDown"]) {
            // Move backward
            set(transform.Rotation, 0, 0, 0, 1);
            transform.Dirty = true;
        } else if (game.InputState["ArrowRight"]) {
            // Move right
            set(transform.Rotation, 0, 0.707, 0, 0.707);
            transform.Dirty = true;
        }
    }
}
