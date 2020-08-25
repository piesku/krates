import {Action, dispatch} from "../actions.js";
import {Entity, Game} from "../game.js";
import {snd_walk} from "../sounds/snd_walk.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer | Has.Transform;

export function sys_control_keyboard(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    if (game.StageCleared && game.InputDelta["Enter"] === -1) {
        dispatch(game, Action.GoToStage, game.CurrentStage + 1);
    }
    if (!(game.World.Signature[entity] & Has.Walk)) {
        let walk = game.World.Walk[entity];
        let audio = game.World.AudioSource[entity];
        if (game.InputState["ArrowUp"]) {
            walk.TargetZ -= 1;
            game.World.Signature[entity] |= Has.Walk;
            audio.Trigger = snd_walk;
        } else if (game.InputState["ArrowLeft"]) {
            walk.TargetX -= 1;
            game.World.Signature[entity] |= Has.Walk;
            audio.Trigger = snd_walk;
        } else if (game.InputState["ArrowDown"]) {
            walk.TargetZ += 1;
            game.World.Signature[entity] |= Has.Walk;
            audio.Trigger = snd_walk;
        } else if (game.InputState["ArrowRight"]) {
            walk.TargetX += 1;
            game.World.Signature[entity] |= Has.Walk;
            audio.Trigger = snd_walk;
        }
    }
}
