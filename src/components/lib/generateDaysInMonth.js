export default function generateDaysInMonth(days) {
    const daysArr = []
    for(let i = 1 ; i <= Number(days) ; i ++) {
        daysArr.push({label: i, value: i});
    }
    return daysArr;
}