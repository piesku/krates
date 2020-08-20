import {dispatch} from "../actions.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Collide | Has.Trigger;

export function sys_trigger(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let collisions = game.World.Collide[entity].Collisions;
    for (let collide of collisions) {
        if (game.World.Signature[collide.Other] & Has.ControlPlayer) {
            game.World.Signature[entity] &= ~Has.Trigger;
            dispatch(game, game.World.Trigger[entity].Action, [entity]);
        }
    }
}
