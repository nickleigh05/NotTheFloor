// game logic for the floor



const clock = 45000;    // 45 seconds is the starting clock time for a duel



type whichPlayer = "A" | "B";

type PlayerState = {

    name: string;
    remainingMs: number;
};



type DuelState = {

    players: Record<whichPlayer, PlayerState>;
    activePlayer: whichPlayer;

};



// ===========================================================



function createDuel(playerA: string, playerB: string): DuelState {
    return {
        players: {
            A: {name: playerA, remainingMs: clock},
            B: {name: playerB, remainingMs: clock},
        },
        activePlayer: "A",
    };
}

console.log(createDuel("p1", "p2"));
