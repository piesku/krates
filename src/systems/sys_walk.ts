import {get_translation} from "../../common/mat4.js";
import {Vec3} from "../../common/math.js";
import {length, normalize, subtract} from "../../common/vec3.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Move | Has.Walk | Has.Transform;

export function sys_walk(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

let world_pos: Vec3 = [0, 0, 0];
let diff: Vec3 = [0, 0, 0];

function update(game: Game, entity: Entity) {
    let transform = game.World.Transform[entity];
    let walk = game.World.Walk[entity];
    let move = game.World.Move[entity];

    let target_world_x = walk.X - game.MapSize / 2 + 0.5;
    let target_world_z = walk.Z - game.MapSize / 2 + 0.5;

    get_translation(world_pos, transform.World);
    subtract(diff, world_pos, [target_world_x, world_pos[1], target_world_z]);

    if (length(diff) < 0.1) {
        game.World.Signature[entity] &= ~Has.Walk;
        transform.Translation[0] = target_world_x;
        transform.Translation[2] = target_world_z;
        transform.Dirty = true;
    } else {
        normalize(diff, diff);
        move.Directions.push(diff);
    }
}
