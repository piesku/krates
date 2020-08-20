import {Game} from "./game";

export const enum Action {
    TextureCollected = 1,
}

export function dispatch(game: Game, action: Action, args: Array<unknown>) {
    switch (action) {
        case Action.TextureCollected: {
            let [entity] = args as [string];
            console.log({entity});
            break;
        }
    }
}
