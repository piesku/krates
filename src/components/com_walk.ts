import {Entity, Game} from "../game";
import {Has} from "../world";

export interface Walk {
    X: number;
    Z: number;
}

export function walk(x: number, z: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Walk;
        game.World.Walk[entity] = {
            X: x,
            Z: z,
        };
    };
}
