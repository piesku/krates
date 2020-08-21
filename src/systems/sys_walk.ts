import {get_translation} from "../../common/mat4.js";
import {Vec3} from "../../common/math.js";
import {clamp} from "../../common/number.js";
import {set} from "../../common/quat.js";
import {length, normalize, subtract} from "../../common/vec3.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Move | Has.Walk | Has.Transform;

export function sys_walk(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

let world_pos: Vec3 = [0, 0, 0];
let diff: Vec3 = [0, 0, 0];

function update(game: Game, entity: Entity, delta: number) {
    let transform = game.World.Transform[entity];
    let walk = game.World.Walk[entity];
    let move = game.World.Move[entity];

    let min = 0;
    let max = game.MapSize - 1;
    walk.TargetX = clamp(min, max, walk.TargetX);
    walk.TargetZ = clamp(min, max, walk.TargetZ);

    let target_world_x = walk.TargetX - game.MapSize / 2 + 0.5;
    let target_world_z = walk.TargetZ - game.MapSize / 2 + 0.5;

    get_translation(world_pos, transform.World);
    subtract(diff, world_pos, [target_world_x, world_pos[1], target_world_z]);

    if (length(diff) < 0.1) {
        game.World.Signature[entity] &= ~Has.Walk;
        walk.TimeElapsed = 0;
        walk.CurrentX = walk.TargetX;
        walk.CurrentZ = walk.TargetZ;
        transform.Translation[0] = target_world_x;
        transform.Translation[2] = target_world_z;
    } else if (walk.TimeElapsed > 1 / move.MoveSpeed) {
        game.World.Signature[entity] &= ~Has.Walk;
        walk.TimeElapsed = 0;
        walk.TargetX = walk.CurrentX;
        walk.TargetZ = walk.CurrentZ;
        let prev_world_x = walk.CurrentX - game.MapSize / 2 + 0.5;
        let prev_world_z = walk.CurrentZ - game.MapSize / 2 + 0.5;
        transform.Translation[0] = prev_world_x;
        transform.Translation[2] = prev_world_z;
    } else {
        walk.TimeElapsed += delta;
        normalize(diff, diff);
        move.Directions.push(diff);

        let child_entity = transform.Children[0];
        let child = game.World.Transform[child_entity];

        if (diff[2] === 1) {
            set(child.Rotation, 0, 1, 0, 0);
        } else if (diff[0] === 1) {
            set(child.Rotation, 0, -0.707, 0, 0.707);
        } else if (diff[2] === -1) {
            set(child.Rotation, 0, 0, 0, 1);
        } else if (diff[0] === -1) {
            set(child.Rotation, 0, 0.707, 0, 0.707);
        }
    }

    transform.Dirty = true;
}
