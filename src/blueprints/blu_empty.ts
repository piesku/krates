import {Action} from "../actions.js";
import {collide} from "../components/com_collide.js";
import {trigger} from "../components/com_trigger.js";
import {Blueprint} from "../core.js";
import {Layer} from "../game.js";

export function blueprint_empty(): Blueprint {
    return {
        Using: [
            collide(false, Layer.None, Layer.Movable | Layer.Player, [0.1, 99, 0.1]),
            trigger(Action.FallIntoHole),
        ],
    };
}
