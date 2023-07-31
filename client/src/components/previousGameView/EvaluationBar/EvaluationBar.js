import {LinearProgress, linearProgressClasses} from "@mui/material";
import {styled} from "@mui/styles";

export function EvaluationBar({prop}) {
    const percentage = prop.percentage;
    const color = prop.color;
    const VerticalLinearProgress = styled(LinearProgress)(() => ({
        width: "16px",
        height: "100%",
        [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: "#F5F6FA"
        },
        [`&.${linearProgressClasses.colorSecondary}`]: {
            backgroundColor: "#eb82bf"
        }
    }));

    //bg-[${color}]
    return (
        <>
            <div className={"h-[500px] rounded bg-rose-900 w-[100%] z-0 flex flex-col"}>
                <div className={`w-[2.2%] rounded bg-${color} absolute z-1`}
                     style={
                         {
                             height: percentage
                         }
                     }
                />
            </div>
        </>
    )
}