import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {useState} from "react";

export function Pagination() {

    const pgnData = useSelector((state)=>state.PrevGameQuery.databaseArr);

    const pageTotalNo = Math.ceil( pgnData.length / 5);
    let pagArr = []

    if (pageTotalNo >= 5) {
        pagArr = [1, 2, 3, 4, 5]
    } else {
        for (let i = 1; i <= pageTotalNo; i++) {
            pagArr.push(i)
        }
    }

    let initObj = {
        totalFirstPage: 1,
        totalLastPage: pageTotalNo,
        currPage: 1,
        currChildIndex: 1,
        currFirstPage: 1,
        currLastPage: pagArr.length,
        currCentralPage: Math.ceil((1+ pagArr.length)/2),
    }

    const [currLink, setCurrLink] = useState(initObj);
    const [currArr, setCurrArr] = useState(pagArr)

    if (pagArr.length > 0 && currArr.length === 0) {
        setCurrArr(
            [...pagArr]
        )
    }

    const childClick = (childIndex) => {
        if (currLink.currLastPage === childIndex) {
            lastPageClick(childIndex)
        } else if (currLink.currFirstPage === childIndex) {
            firstPageClick(childIndex)
        } else if (childIndex < currLink.currCentralPage) {
            prevClick(childIndex)
        } else if (childIndex > currLink.currCentralPage) {
            nextCLick(childIndex)
        }
    }

    const nextCLick = (childIndex) => {
        if(checkEdgeCase(childIndex)) {
            setCurrLink((prevState => {
                return {
                    ...prevState,
                    currChildIndex: prevState.currChildIndex + 1
                }
            }) )
        };
        setCurrLink((prevState) => {
            let newCurrFirstPage = prevState.currFirstPage - 1;
            let newCurrLastPage = prevState.currLastPage - 1;
            let newCurrCentralPage = childIndex;
            return {
                ...prevState,
                currChildIndex: childIndex,
                currFirstPage: newCurrFirstPage,
                currLastPage: newCurrLastPage,
                currCentralPage: newCurrCentralPage,
            }
        })

        setCurrArr(
            (prevState => {
                let newIndex = prevState[prevState.length -1] + 1;
                return [
                    ...prevState.slice(1, prevState.length),
                    newIndex
                ]
            })
        )

    }

    const prevClick = (childIndex) => {

        if(checkEdgeCase(childIndex)) {
            setCurrLink((prevState => {
                return {
                    ...prevState,
                    currChildIndex: prevState.currChildIndex - 1
                }
            }) )
        };

        setCurrLink((prevState) => {
            let newCurrFirstPage = prevState.currFirstPage - 1;
            let newCurrLastPage = prevState.currLastPage - 1;
            let newCurrCentralPage = childIndex;
            return {
                ...prevState,
                currChildIndex: childIndex,
                currFirstPage: newCurrFirstPage,
                currLastPage: newCurrLastPage,
                currCentralPage: newCurrCentralPage,
            }
        })

        setCurrArr(
            (prevState => {
                let newIndex = prevState[0] - 1;
                return [
                    newIndex,
                    ...prevState.slice(0, prevState.length -1),
                ]
            })
        )
    }

    const lastPageClick = (childIndex) => {
        if(checkEdgeCase(childIndex)) return;
        setCurrLink((prevState) => {
            let newCurrFirstPage = prevState.currFirstPage + 2;
            let newCurrLastPage = prevState.currLastPage + 2;
            let newCurrCentralPage = childIndex;
            return {
                ...prevState,
                currChildIndex: childIndex,
                currFirstPage: newCurrFirstPage,
                currLastPage: newCurrLastPage,
                currCentralPage: newCurrCentralPage,
            }
        })
        setCurrArr(
            (prevState => {
                const lastElement = prevState[prevState.length - 1];
                let newIndex1 = lastElement + 1;
                let newIndex2 = lastElement + 2;
                return [
                    ...prevState.slice(2, prevState.length),
                    newIndex1,
                    newIndex2
                ]
            })
        )
    }

    const firstPageClick = (childIndex) => {
        if(checkEdgeCase(childIndex)) return;
        setCurrLink((prevState) => {
            let newCurrFirstPage = prevState.currFirstPage - 2;
            let newCurrLastPage = prevState.currLastPage - 2;
            let newCurrCentralPage = childIndex;
            return {
                ...prevState,
                currChildIndex: childIndex,
                currFirstPage: newCurrFirstPage,
                currLastPage: newCurrLastPage,
                currCentralPage: newCurrCentralPage,
            }
        })
        setCurrArr(
            (prevState => {
                const lastElement = prevState[0];
                let newIndex1 = lastElement - 2;
                let newIndex2 = lastElement - 1;
                return [
                    newIndex1,
                    newIndex2,
                    ...prevState.slice(0, prevState.length-2)
                ]
            })
        )
    }

    const setLastFivePage = () => {
        setCurrArr(
            [
                ...currArr.splice(0, currArr.length),
                currLink.totalLastPage - 4,
                currLink.totalLastPage - 3,
                currLink.totalLastPage - 2,
                currLink.totalLastPage - 1,
                currLink.totalLastPage
            ]
        )
        setCurrLink((prevState) => {
            return {
                ...prevState,
                currFirstPage: prevState.totalLastPage - 4,
                currLastPage: prevState.totalLastPage,
                currCentralPage: prevState.totalLastPage - 2,
            }
        })
    }

    const setFirstFivePage = () => {
        setCurrLink((prevState) => {
            return {
                ...prevState,
                currFirstPage: 1,
                currLastPage: 5,
                currCentralPage: 3,
            }
        })
        setCurrArr(
            setCurrArr([
                ...currArr.splice(0, currArr.length),
                1,
                2,
                3,
                4,
                5
            ])
        )
    }

    const checkEdgeCase = (childIndex) => {
        if (currLink.totalLastPage <= 5) return true;
        if (childIndex >= currLink.totalLastPage - 2) {
            setLastFivePage();
            return true;
        } else if (childIndex < 5) {
            setFirstFivePage();
            return true;
        }
        setChildIndex(childIndex)
        return false;
    }

    const setChildIndex = (childIndex) => {
        setCurrLink(
            (prevState) => {
                return {
                    ...prevState,
                    currChildIndex: childIndex
                }
            }
        )
    }


    return (
        <nav className={"m-auto"}>
            <ul className={"inline-flex -space-x-px text-sm list-none"}>
                <li>
                    <NavLink to={"/previousGameView/"+ Number(currLink.currChildIndex -1 )}
                             className={"flex items-center no-underline justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                             onClick={
                                 ()=> {
                                     childClick(Number(currLink.currChildIndex) - 1)
                                 }

                             }>Previous</NavLink>
                </li>
                {
                    currArr.map( (child) =>
                        {
                            return <li>
                                <NavLink
                                    className={"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                                    to={"/previousGameView/" + child}
                                    onClick={
                                        ()=> {
                                            childClick(child)
                                        }
                                    }
                                >{child}</NavLink>
                            </li>
                        }
                    )
                }
                <li>
                    <NavLink
                        to={"/previousGameView/"+ (Number(currLink.currChildIndex)+ 1)}
                        className={"flex no-underline items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                        onClick={
                            ()=> {
                                childClick(Number(currLink.currChildIndex) + 1)
                            }
                        }
                    >Next</NavLink>
                </li>
            </ul>
        </nav>
    )

}