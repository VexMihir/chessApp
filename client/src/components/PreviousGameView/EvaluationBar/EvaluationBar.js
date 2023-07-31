import {LinearProgress, linearProgressClasses, styled} from "@mui/material";

export function EvaluationBar({prop}) {
    const percentage = prop.percentage;
    const color = prop.color;
    const VerticalLinearProgress = styled(LinearProgress)(() => ({
        width: "30px",
        height: "100%",
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: color
        },
        [`&.${linearProgressClasses.colorSecondary}`]: {
            backgroundColor: "#eb82bf"
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