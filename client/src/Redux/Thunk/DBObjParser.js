const history = {
    before: "before",
    after: "after",
    color: 'color',
    piece: 'piece',
    from: 'from',
    to: 'to',
    san: 'san',
    lan: 'lan',
    flags: 'flags'
}

export function gameHistoryParser(hisArr) {
    let ret = {};
    let fenStrArr = [];
    let sanArr = [];
    let fromToArr = [];
    let flagArr = [];

    for (let index in hisArr) {

        const item = hisArr[index]
        if (Number(index) === 0) {
            fenStrArr.push(item[history.before])
            fenStrArr.push(item[history.after])
            sanArr.push(item[history.from])
        } else {
            fenStrArr.push(item[history.after])
            sanArr.push(item[history.to])
        }
        let fromtoObj = {
            from: item[history.from],
            to: item[history.to]
        }
        fromToArr.push(fromtoObj);
        flagArr.push(item[history.flags])
    }

    ret = {
        fenStrArr: fenStrArr,
        sanArr: sanArr,
        fromToArr: fromToArr,
        flagArr: flagArr
    }

    return ret;
}