import {element} from "../../common/random.js";
import {AudioClip} from "../components/com_audio_source.js";

export function snd_title(): AudioClip {
    return {
        Tracks: [
            {
                Instrument: [
                    5,
                    "bandpass",
                    6,
                    0,
                    false,
                    false,
                    0,
                    0,
                    [["sine", 5, 4, 5, 8, 8, false, false, 8, 8, 8]],
                ],
                Notes: [
                    element([48, 50, 52, 53, 55, 57, 59, 60]),
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    element([48, 50, 52, 53, 55, 57, 59, 60]),
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                    ,
                ],
            },
            {
                Instrument: [
                    3,
                    "bandpass",
                    12,
                    0,
                    false,
                    false,
                    8,
                    8,
                    [["triangle", 7, 1, 4, 6, 8, false, false, 8, 8, 8]],
                ],
                Notes: [64, , 64, , , , 64, , , , 60, , 64, , , , 67, , , , , , , , 55, , , ,],
            },
        ],
        BPM: 120,
        Exit: 10,
        Next: snd_title,
    };
}
