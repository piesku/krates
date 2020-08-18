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

const map_size = 9;
const tile_size = 2;

let world_pos: Vec3 = [0, 0, 0];
let diff: Vec3 = [0, 0, 0];

function update(game: Game, entity: Entity) {
    let transform = game.World.Transform[entity];
    let walk = game.World.Walk[entity];
    let move = game.World.Move[entity];

    if (walk.IsWalking) {
        let target_world_x = tile_size * (walk.X - map_size / 2 + 0.5);
        let world_z = tile_size * (walk.Z - map_size / 2 + 0.5);

        get_translation(world_pos, transform.World);
        subtract(diff, world_pos, [target_world_x, world_pos[1], world_z]);

        if (length(diff) < 0.1) {
            walk.IsWalking = false;
        } else {
            normalize(diff, diff);
            move.Directions.push(diff);
        }
    }
}
