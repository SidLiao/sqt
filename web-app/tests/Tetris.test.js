import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("Hold", function () {
    it(
        `A held piece can be retrieved on a subsequent turn:
        Given a Tetris Game;
        When the sequence Hold > Hard Drop > Hold is performed;
        Then the current tetromino before and after the sequence, is the same.`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_piece = R.clone(initial_game).next_tetromino;
            const final_piece = Tetris.hold(initial_game);
            
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
            const initial_piece = Tetris.hold(Tetris.new_game());
            let game1 = R.clone(initial_piece)
            let game2 = Tetris.hold(initial_piece)
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
            const init_game = Tetris.new_game();
            const initial_piece = Tetris.hold(init_game);
            let current = R.clone(initial_piece).current_tetromino
            initial_piece.can_hold = false
            const hold_piece = Tetris.hold(initial_piece);
            let current2 = R.clone(initial_piece).current_tetromino
            if (!R.equals(current2, current)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(current2)}
                    Final:   ${JSON.stringify(current2)}`
                );
            }
        }
    );
});
