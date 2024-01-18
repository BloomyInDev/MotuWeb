export const getAllStats = () => {
    let win = parseInt(localStorage.getItem("win")) || 0,
        loss = parseInt(localStorage.getItem("loss")) || 0,
        winStreak = parseInt(localStorage.getItem("winstreak")) || 0;
    return {
        win,
        loss,
        ratio: win / loss,
        winStreak,
    };
};
export const setStat = (stat: "win" | "loss" | "winStreak") => {
    localStorage.setItem(stat, "0");
    return parseInt(localStorage.getItem(stat));
};
export const updateStat = (stat: "win" | "loss" | "winStreak", add: number) => {
    localStorage.setItem(
        stat,
        (parseInt(localStorage.getItem(stat)) + add).toString(),
    );
    return parseInt(localStorage.getItem(stat));
};
