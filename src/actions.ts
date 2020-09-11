import {Vec3} from "../common/math.js";
import {from_euler} from "../common/quat.js";
import {find_first} from "./components/com_named.js";
import {query_all} from "./components/com_transform.js";
import {destroy} from "./core.js";
import {Entity, Game, Layer} from "./game.js";
import {maps} from "./maps.js";
import {scene_stage} from "./scenes/sce_stage.js";
import {scene_title} from "./scenes/sce_title.js";
import {Has} from "./world.js";

export const enum Action {
    TexturesAreGone = 1,
    TextureCollected,
    GoToTitle,
    GoToStage,
    KeyCollected,
    PortalUsed,
    FallIntoHole,
    Drown,
}

export function dispatch(game: Game, action: Action, payload: unknown) {
    switch (action) {
        case Action.TexturesAreGone: {
            for (let i = 0; i < game.World.Signature.length; i++) {
                if (game.World.Signature[i] & Has.Render) {
                    let render = game.World.Render[i];
                    render.Texture = game.Textures["404"];
                }
            }
            break;
        }
        case Action.TextureCollected: {
            let [entity] = payload as [Entity];
            let texture_name = game.AllTextures[entity];
            for (let i = 0; i < game.World.Signature.length; i++) {
                if (game.World.Signature[i] & Has.Render) {
                    let render = game.World.Render[i];
                    if (render.FinalTextureName === texture_name) {
                        setTimeout(() => {
                            render.Texture = game.Textures[texture_name];
                            game.UnlockedTextures.push(texture_name);
                        }, ~~(Math.random() * i * 10));
                    }
                }
            }

            destroy(game.World, entity);
            game.StageCleared = true;
            break;
        }
        case Action.GoToTitle: {
            requestAnimationFrame(() => scene_title(game));
            break;
        }
        case Action.GoToStage: {
            let stage = payload as number;
            if (stage < maps.length) {
                requestAnimationFrame(() => scene_stage(game, stage));
            }
            break;
        }

        case Action.KeyCollected: {
            let [entity] = payload as [Entity];
            const QUERY = Has.Render;
            for (let i = 0; i < game.World.Signature.length; i++) {
                if ((game.World.Signature[i] & QUERY) === QUERY) {
                    let render = game.World.Render[i];
                    let transform = game.World.Transform[i];
                    if (render.FinalTextureName === "door") {
                        transform.Rotation = from_euler([0, 0, 0, 1], 0, 90, 0);
                        transform.Translation[0] -= 0.5;
                        transform.Dirty = true;
                        game.World.Signature[i] &= ~Has.Collide;
                        game.World.Signature[i] &= ~Has.RigidBody;
                    }
                }
            }

            destroy(game.World, entity);
            break;
        }

        case Action.PortalUsed: {
            let dest = find_first(game.World, "destination");
            let [entity, player] = payload as [Entity, Entity];

            let walk = game.World.Walk[player];
            let dest_walk = game.World.Walk[dest];

            let player_transform = game.World.Transform[player];
            let dest_transform = game.World.Transform[dest];

            if (dest) {
                player_transform.Translation = dest_transform.Translation.slice() as Vec3;
                player_transform.Dirty = true;

                if (walk) {
                    let {CurrentX, CurrentZ} = dest_walk;
                    walk.CurrentX = walk.TargetX = CurrentX;
                    walk.CurrentZ = walk.TargetZ = CurrentZ;
                }
            }

            break;
        }

        case Action.FallIntoHole: {
            let [entity, other] = payload as [Entity, Entity];
            game.World.Signature[other] &= ~Has.ControlPlayer;
            setTimeout(() => destroy(game.World, entity));
            break;
        }

        case Action.Drown: {
            let [entity, other] = payload as [Entity, Entity];
            let other_collide = game.World.Collide[other];
            if (other_collide.Layers & Layer.Movable) {
                game.World.RigidBody[other].Dynamic = false;
                for (let child_entity of query_all(game.World, other, Has.Animate)) {
                    let child_animate = game.World.Animate[child_entity];
                    child_animate.Trigger = "float";
                }
            } else if (!game.StageCleared) {
                game.StageFailed = true;
            }
            break;
        }
    }
}
