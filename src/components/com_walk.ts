import {Entity, Game} from "../game";
import {Has} from "../world";

export interface Walk {
    IsWalking: boolean;
    X: number;
    Z: number;
}

export function walk(x: number, z: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Walk;
        game.World.Walk[entity] = {
            IsWalking: false,
            X: x,
            Z: z,
        };
    };
}
