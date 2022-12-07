export function getSegmentLine(character = '=', counts = 50) {
    return character.repeat(counts);
}

export function printSegmentLine(character = '=', counts = 50) {
    console.log(getSegmentLine(character, counts));
}

export function stringify(object: any) {
    return JSON.stringify(object);
}