import {LinearProgress, linearProgressClasses, styled} from "@mui/material";
/*
Source: https://stackoverflow.com/questions/69469405/rotate-a-mui-linearprogress
 */
export function EvaluationBar({prop}) {
    //
    const percentage = prop.percentage;
    const color = prop.color;
    const VerticalLinearProgress = styled(LinearProgress)(() => ({
        width: "30px",
        height: "100%",
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: "#333"
        },
        [`&.${linearProgressClasses.colorSecondary}`]: {
            backgroundColor: color
        }
    }));

    return (
        <>
            <VerticalLinearProgress
                variant="determinate"
                color="secondary"
                value={percentage}
                sx={{
                    [`& .${linearProgressClasses.bar}`]: {
                        transform: `translateY(${-percentage}%)!important`
                    }
                }}
            />
        </>
    )
}