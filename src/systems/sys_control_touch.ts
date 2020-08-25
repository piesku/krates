import {Vec2} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {snd_walk} from "../sounds/snd_walk.js";
import {Has} from "../world.js";

const QUERY = Has.ControlPlayer;
const DEAD_ZONE = 0.1;

// The position of the joystick center, given by the initial Touch0's x and y.
let starting: Vec2 = [0, 0];

export function sys_control_touch(game: Game, delta: number) {
    if (game.InputDelta["Touch0"] === 1) {
        // The center of the invisible joystick is given by the position of the
        // first touch of the first finger on the screen's surface.
        starting[0] = game.InputState["Touch0X"];
        starting[1] = game.InputState["Touch0Y"];
    }

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let walk = game.World.Walk[entity];
    let audio = game.World.AudioSource[entity];

    if (!(game.World.Signature[entity] & Has.Walk)) {
        if (game.InputState["Touch0"] === 1) {
            let amount_x = (game.InputState["Touch0X"] - starting[0]) / 256;
            let amount_y = (game.InputState["Touch0Y"] - starting[1]) / 192;

            if (Math.abs(amount_x) > DEAD_ZONE) {
                walk.TargetX += Math.sign(amount_x);
                game.World.Signature[entity] |= Has.Walk;
                audio.Trigger = snd_walk;
            }
            if (Math.abs(amount_y) > DEAD_ZONE) {
                walk.TargetZ += Math.sign(amount_y);
                game.World.Signature[entity] |= Has.Walk;
                audio.Trigger = snd_walk;
            }
        }
    }
}
