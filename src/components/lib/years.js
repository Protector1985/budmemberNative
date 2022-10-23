import moment from 'moment'

export function generateYears() {
    const year = moment().year();
    const yearsArr = [];
    
    for(let i = 1900 ; i <= Number(year) ; i ++) {
        yearsArr.push({label: i, value: i})
    }

    return yearsArr.reverse()
}