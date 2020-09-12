import {element, integer} from "../../common/random.js";
import {AudioClip} from "../components/com_audio_source.js";

const melodies = [
    [60, , , , 67, , , , 72, , , ,],
    [64, , , , 69, , 67, ,],
    [71, , 69, , 67, , 62, ,],
    [64, , 64, , 64, , 60, , 64, , 65, ,],
    [64, , 64, , 64, , 60, , 62, , 60, ,],
    [72, , 71, , , , 67, , 65, , , ,],
];

export function snd_soundtrack(): AudioClip {
    let melody = element(melodies);
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
                Notes: [element([48, 50, 52, 53, 55, 57, 59, 60])],
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
                Notes: element(melodies),
            },
        ],
        BPM: 120,
        Exit: ((melody.length + integer(4, 8)) * 60) / 120 / 4,
        Next: snd_soundtrack,
    };
}
