import {get_translation} from "../../common/mat4.js";
import {Vec3} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.RigidBody;
const EPSILON = 0.01;

export function sys_snap(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

let world_pos: Vec3 = [0, 0, 0];

function update(game: Game, entity: Entity, delta: number) {
    let transform = game.World.Transform[entity];
    let rigid_body = game.World.RigidBody[entity];

    if (rigid_body.Dynamic) {
        get_translation(world_pos, transform.World);
        let int_x = Math.round(world_pos[0]);
        let int_z = Math.round(world_pos[2]);

        if (Math.abs(world_pos[0] - int_x) < EPSILON && Math.abs(world_pos[2] - int_z) < EPSILON) {
            transform.Translation[0] = int_x;
            transform.Translation[2] = int_z;
            transform.Dirty = true;
        }
    }
}
