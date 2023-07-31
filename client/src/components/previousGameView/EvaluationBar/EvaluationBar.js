export function EvaluationBar({prop}) {
    const percentage = prop.percentage;
    const color = prop.color;
    //bg-[${color}]
    return (
        <>
            <div className={"h-[100%] rounded bg-rose-900 w-[100%] z-0 flex flex-col"}>
                <div className={`h-[${percentage}%] w-[2.2%] rounded bg-${color} absolute z-1`} />
            </div>
        </>
    )
}