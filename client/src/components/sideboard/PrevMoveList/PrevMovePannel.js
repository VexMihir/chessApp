import { useSelector } from "react-redux";

export function PrevMovePannel() {
  let SANList = useSelector((storeState) => storeState.SANReducer);

  // if (SANList === undefined) {
    // SANList = ["e21", "A2", "A3", "e21", "A2", "A3", "e21", "A2", "A3", "e21", "A2", "A3", "e21", "A2", "A3"]
  // }

  return SANList === undefined ? (
    <div
      //Source: https://stackoverflow.com/questions/72391045/what-do-the-parameters-in-tailwind-grid-cols-1fr-700px-2fr-do
      //Source: https://stackoverflow.com/questions/67242334/tailwind-css-how-to-make-a-grid-with-two-columns-where-the-1st-column-has-20
      className="h-[13.8rem] overflow-y-scroll text-black bg-white grid grid-cols-[1fr_6fr_6fr] text-2xl text-center"
    ></div>
  ) : (
    <div
      className="h-[13.8rem] overflow-y-scroll text-black bg-white grid grid-cols-[1fr_6fr_6fr] text-2xl text-center"
    >
      {SANList.map((child, index) => {
        return (
          <>
            {index % 2 === 0 ? (
              <>
                <p>{index / 2 + 1}.</p> <p>{child}</p>
              </>
            ) : (
              <p>{child}</p>
            )}
          </>
        );
      })}
    </div>
  );
}
