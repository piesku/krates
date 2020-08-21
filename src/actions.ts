import {RenderKind} from "./components/com_render.js";
import {destroy} from "./core.js";
import {Entity, Game} from "./game.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {scene_title} from "./scenes/sce_title.js";
import {Has} from "./world.js";

export const enum Action {
    TextureCollected = 1,
    GoToTitle,
    GoToStage,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.TextureCollected: {
            let [entity] = payload as [Entity];
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
        case Action.GoToTitle: {
            requestAnimationFrame(() => scene_title(game));
            break;
        }
        case Action.GoToStage: {
            let stage = payload as number;
            game.LevelNumber = stage;
            requestAnimationFrame(() => scene_stage(game));
            break;
        }
    }
}
