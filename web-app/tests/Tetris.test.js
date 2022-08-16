import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("Hold", function () {
    it(
        `A held piece can be retrieved on a subsequent turn:
        Given a Tetris Game;
        When the sequence Hold > Hard Drop > Hold is performed;
        Then the current tetromino before and after the sequence, is the same.`,
        function () {
            // create new game
            const initial_game = Tetris.new_game();
            // get next tetromino
            const initial_piece = R.clone(initial_game).next_tetromino;
            // let it fall
            const final_piece = Tetris.hold(initial_game);
            // error if the tetromino after the hold is different with the one before the hold
            if (!R.equals(initial_piece, final_piece.current_tetromino)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(final_piece)}`
                );
            }
        }
    );

    it(
        `Hold can't be performed twice in a row:
        Given a Tetris Game where a Hold is performed;
        When one further Hold is performed;
        Then the game state before and after the second hold, is the same.`,
        function () {
            // create new game and change
            const initial_piece = Tetris.hold(Tetris.new_game());
            // clone new game
            let game1 = R.clone(initial_piece)
            // perform the cache
            let game2 = Tetris.hold(initial_piece)
            // it will be correct if the tetromino after the cache is the same as the one before the cache after cache
            if (!R.equals(game1.current_tetromino, game2.current_tetromino)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(game2.current_tetromino)}
                    Final:   ${JSON.stringify(game1.current_tetromino)}`
                );
            }
        }
    );

    it(
        `### Change this to your test description ###`,
        function () {
            // start new game
            const init_game = Tetris.new_game();
            // the first hold
            const initial_piece = Tetris.hold(init_game);
            // the falling tetromino after holdingh
            let current = R.clone(initial_piece).current_tetromino
            // simulate the fall of next round
            initial_piece.can_hold = true
            // hold  the current tetromino 
            // shift the current falling piece
            initial_piece.current_tetromino = initial_piece.next_tetromino;
           // get new piece
            const [next_tetromino, bag] = initial_piece.bag();
            initial_piece.bag = bag;
            // change the n ext falling piece
            initial_piece.next_tetromino = next_tetromino;
            // cache
            const hold_piece = Tetris.hold(initial_piece);
            let current2 = R.clone(hold_piece).current_tetromino
            if (R.equals(current2, next_tetromino)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(next_tetromino)}
                    Final:   ${JSON.stringify(current2)}`
                );
            }
        }
    );
});
