/**
 * Transform Youtube duration to readable duration
 *
 * @param {string} duration - e.g. PT16M31S => 16:31 | PT2H3M21S => 2:03:21
 * @returns {string} - Readable duration
 */
export const convertDuration = (duration: string): string => {
    let val = duration.replace('PT', '');
    val = val.replace('H', ':');
    val = val.replace('M', ':');
    val = val.replace('S', '');

    let splittedVal: string[] = val.split(':');
    splittedVal = splittedVal.map(value => String(value).padStart(2, '0'));

    return splittedVal.join(':');
};