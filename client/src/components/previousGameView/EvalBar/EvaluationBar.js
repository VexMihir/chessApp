/**
 * With help of chatGPT rephrasing and grammar checking
 * Evaluation Bar
 *
 * The evaluation bar indicates the chances of winning the game between white and black players. A favorable
 * evaluation for white means that white pieces have an advantage, and vice versa.
 *
 */
import {LinearProgress, linearProgressClasses, styled} from "@mui/material";

/*
Evaluation bar indicates chances of winning the game between white and black players. White means that white pieces are
having advantaged and vice versa.
 */
// ChatGPT was used to generate the following code:

const VerticalLinearProgress = styled(LinearProgress)(() => ({
    width: "30px",
    height: "100%",
    [`& .${linearProgressClasses.bar}`]: {
        backgroundColor: "#333"
    }
}));

export function EvaluationBar({evaluation, offsetScore}) {
    // Default color and percentage
    let color = '#000'; // Black color
    let percentage = 0;

    // Check the type of evaluation
    if (typeof evaluation === 'number') {
        // Normalize the score to percentage, assuming -10 to +10 scale for scores
        // If the score is not within this range, the percentage is capped at 97, to indicate the game is winning/lost 
        // but not theoretically guaranteed to go some way in the depth searched
        percentage = Math.min(Math.max((evaluation + 10) * 5, 0), 97);
        color = evaluation >= 0 ? 'white' : 'black'; // White color for positive, black for negative
    } else if (typeof evaluation === 'string') {
        if (evaluation.startsWith('M')) {
            // If it's mate, we consider it as 100% for the winning side
            percentage = 100;
            color = offsetScore >= 0 ? 'white' : 'black'; // White color for positive f, black for negative
        } else if (['1-0', '0-1'].includes(evaluation)) {
            // If it's a game result, bar is fully colored for the winner
            percentage = 100;
            color = evaluation === '1-0' ? 'white' : 'black'; // White color for '1-0', black for '0-1'
        }
    }

    return (
        <VerticalLinearProgress
            variant="determinate"
            sx={{
                [`&.${linearProgressClasses.colorSecondary}`]: {
                    backgroundColor: color
                },
                [`& .${linearProgressClasses.bar}`]: {
                    transform: `translateY(${-percentage}%)!important`
                }
            }}
            value={percentage}
        />
    );
}
