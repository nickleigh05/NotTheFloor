// game logic for the floor

const clock = 45000;    // 45 seconds is the starting clock time for a duel

export type whichPlayer = "A" | "B";

export type PlayerState = {

    name: string;
    remainingMs: number;
};


export type DuelState = {

    players: Record<whichPlayer, PlayerState>;
    activePlayer: whichPlayer;
    lockedUntilMs: number;

};


// =============================================================================================================


export function createDuel(playerA: string, playerB: string): DuelState {

    return {

        players: {
            A: {name: playerA, remainingMs: clock},
            B: {name: playerB, remainingMs: clock},
        },

        activePlayer: "A",
        lockedUntilMs: 0,

    };

}


export function switchActivePlayer(duel: DuelState): DuelState {

    return {
        players: duel.players,
        activePlayer: duel.activePlayer === "A" ? "B" : "A",
        lockedUntilMs: duel.lockedUntilMs,

    };
}


export function pass(duel: DuelState, nowMs: number): DuelState {

    return {
        players: duel.players,
        activePlayer: duel.activePlayer,
        lockedUntilMs: nowMs + 3000,

    };
}

export function isLocked(duel: DuelState, nowMs: number): boolean {

    return nowMs < duel.lockedUntilMs;
    
}


export function tickDown(duel: DuelState, elapsedMs: number): DuelState {

    const active = duel.activePlayer;
    const newTime = Math.max(0, duel.players[active].remainingMs - elapsedMs);

    if (active === "A") {
        return {
            players: {
                A: {name: duel.players.A.name, remainingMs: newTime},
                B: duel.players.B,
            },
            activePlayer: duel.activePlayer,
            lockedUntilMs: duel.lockedUntilMs,
        };
    }

    return {
        players: {
            A: duel.players.A,
            B: {name: duel.players.B.name, remainingMs: newTime},
        },
        activePlayer: duel.activePlayer,
        lockedUntilMs: duel.lockedUntilMs,
    };
}


export function getWinner(duel: DuelState): whichPlayer | null {

    if (duel.players.A.remainingMs <= 0) {
        return "A";
    }

    if (duel.players.B.remainingMs <= 0) {
        return "B";
    }

    return null;

}


export function submitAnswer(duel: DuelState, isCorrect: boolean, nowMs: number): DuelState {

    if (isLocked(duel, nowMs)) {
        return duel;
    }

    if (isCorrect) {
        return switchActivePlayer(duel);
    }

    return duel;
}





