import {AudioSource} from "./components/com_audio_source.js";
import {CameraFramebuffer} from "./components/com_camera_framebuffer.js";
import {Collide} from "./components/com_collide.js";
import {Mimic} from "./components/com_mimic.js";
import {Move} from "./components/com_move.js";
import {Named} from "./components/com_named.js";
import {Render} from "./components/com_render.js";
import {RigidBody} from "./components/com_rigid_body.js";
import {Transform} from "./components/com_transform.js";
import {Trigger} from "./components/com_trigger.js";
import {Walk} from "./components/com_walk.js";

const enum Component {
    AudioSource,
    Camera,
    Collide,
    ControlPlayer,
    ControlPowerup,
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
    AudioSource = 1 << Component.AudioSource,
    Camera = 1 << Component.Camera,
    Collide = 1 << Component.Collide,
    ControlPlayer = 1 << Component.ControlPlayer,
    ControlPowerup = 1 << Component.ControlPowerup,
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
    AudioSource: Array<AudioSource> = [];
    Camera: Array<CameraFramebuffer> = [];
    Collide: Array<Collide> = [];
    Mimic: Array<Mimic> = [];
    Move: Array<Move> = [];
    Named: Array<Named> = [];
    Render: Array<Render> = [];
    RigidBody: Array<RigidBody> = [];
    Transform: Array<Transform> = [];
    Trigger: Array<Trigger> = [];
    Walk: Array<Walk> = [];
}
