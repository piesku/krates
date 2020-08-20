import {RenderKind} from "./components/com_render";
import {destroy} from "./core.js";
import {Game} from "./game.js";
import {Has} from "./world.js";

export const enum Action {
    TextureCollected = 1,
}

export function dispatch(game: Game, action: Action, args: Array<unknown>) {
    switch (action) {
        case Action.TextureCollected: {
            let [entity] = args as [number];
            let texture_name = game.AllTextures[entity];
            const QUERY = Has.Render;
            for (let i = 0; i < game.World.Signature.length; i++) {
                if ((game.World.Signature[i] & QUERY) === QUERY) {
                    let render = game.World.Render[i];
                    if (render.Kind === RenderKind.TexturedDiffuse) {
                        if (render.FinalTextureName === texture_name) {
                            setTimeout(() => {
                                render.Texture = game.Textures[texture_name];
                            }, ~~(Math.random() * i * 10));
                        }
                    }
                }
            }

            destroy(game.World, entity);
            break;
        }
    }
}
