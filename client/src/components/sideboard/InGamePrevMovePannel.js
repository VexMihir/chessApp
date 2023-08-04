export function InGamePrevMovePannel({history}) {

    return history === undefined ? (
        <div
            //Source: https://stackoverflow.com/questions/72391045/what-do-the-parameters-in-tailwind-grid-cols-1fr-700px-2fr-do
            //Source: https://stackoverflow.com/questions/67242334/tailwind-css-how-to-make-a-grid-with-two-columns-where-the-1st-column-has-20
            className="overflow-y-scroll text-custom-cream bg-custom-black grid grid-cols-[1fr_6fr_6fr] text-2xl text-center"
        ></div>
    ) : (
        <div
            className="overflow-y-scroll text-custom-cream bg-custom-black grid grid-cols-[1fr_6fr_6fr] grid-rows-[repeat(9,24.5px)] text-2xl text-center"
        >
            {history.map((child, index) => {
                return (
                    <>
                        {index % 2 === 0 ? (
                            <>
                                <div className="h-[min-content]">{index / 2 + 1}.</div> <div className="h-[min-content]">{child['san']}</div>
                            </>
                        ) : (
                            <div className="h-[min-content]">{child['san']}</div>
                        )}
                    </>
                );
            })}
        </div>
    );
}