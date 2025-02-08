export const timer = (time) => {
    let minutes = "0" + Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    if(seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
}