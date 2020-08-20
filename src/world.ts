import {Camera} from "./components/com_camera.js";
import {Collide} from "./components/com_collide.js";
import {Light} from "./components/com_light.js";
import {Mimic} from "./components/com_mimic.js";
import {Move} from "./components/com_move.js";
import {Named} from "./components/com_named.js";
import {Render} from "./components/com_render.js";
import {RigidBody} from "./components/com_rigid_body.js";
import {Transform} from "./components/com_transform.js";
import {Trigger} from "./components/com_trigger.js";
import {Walk} from "./components/com_walk.js";

const enum Component {
    Camera,
    Collide,
    ControlPlayer,
    ControlPowerup,
    Light,
    Mimic,
    Move,
    Named,
    Render,
    RigidBody,
    Transform,
    Trigger,
    Walk,
}

export const enum Has {
    Camera = 1 << Component.Camera,
    Collide = 1 << Component.Collide,
    ControlPlayer = 1 << Component.ControlPlayer,
    ControlPowerup = 1 << Component.ControlPowerup,
    Light = 1 << Component.Light,
    Mimic = 1 << Component.Mimic,
    Move = 1 << Component.Move,
    Named = 1 << Component.Named,
    Render = 1 << Component.Render,
    RigidBody = 1 << Component.RigidBody,
    Transform = 1 << Component.Transform,
    Trigger = 1 << Component.Trigger,
    Walk = 1 << Component.Walk,
}

export class World {
    // Component flags
    Signature: Array<number> = [];
    // Component data
    Camera: Array<Camera> = [];
    Collide: Array<Collide> = [];
    Light: Array<Light> = [];
    Mimic: Array<Mimic> = [];
    Move: Array<Move> = [];
    Named: Array<Named> = [];
    Render: Array<Render> = [];
    RigidBody: Array<RigidBody> = [];
    Transform: Array<Transform> = [];
    Trigger: Array<Trigger> = [];
    Walk: Array<Walk> = [];
}
