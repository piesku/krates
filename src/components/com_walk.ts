import {Entity, Game} from "../game";
import {Has} from "../world";

export interface Walk {
    CurrentX: number;
    CurrentZ: number;
    TargetX: number;
    TargetZ: number;
    TimeElapsed: number;
}

export function walk(x: number, z: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Walk;
        game.World.Walk[entity] = {
            CurrentX: x,
            CurrentZ: z,
            TargetX: x,
            TargetZ: z,
            TimeElapsed: 0,
        };
    };
}
