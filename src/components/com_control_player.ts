import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlPlayer {
    Move: boolean;
    Yaw: boolean;
}

/**
 * The ControlPlayer mixin.
 *
 * When setting pitch to non-zero, yaw must be set to zero. Only then can the
 * control systems properly clamp the pitch.
 *
 * @param Move - Whether to control the entity's movement.
 * @param Yaw - Whether to control the entity's yaw.
 */
export function control_player(move: boolean, yaw: boolean) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlPlayer;
        game.World.ControlPlayer[entity] = {
            Move: move,
            Yaw: yaw,
        };
    };
}
