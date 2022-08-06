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
            const initial_piece = initial_game.current_tetromino;
            // You'll need to implement Tetris.hold before this works.
            const final_piece = Tetris.hold(initial_game);
            
            if (!R.equals(initial_piece, final_piece)) {
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
        }
    );

    it(
        `### Change this to your test description ###`,
        function () {
            const init_game = Tetris.new_game();
            const initial_piece = Tetris.hold(init_game);
            if(initial_piece == undefined || initial_piece == null){
                throw new Error(
                    ` the *next tetromino* is deployed failed.`
                );
            }
        }
    );
});
