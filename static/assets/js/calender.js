function getFirstDay(theYear, theMonth){
    var firstDate = new Date(theYear,theMonth,1)
    return firstDate.getDay() + 1
}

function getMonthLen(theYear, theMonth) {
    var oneDay = 1000 * 60 * 60 * 24
    var thisMonth = new Date(theYear, theMonth, 1)
    var nextMonth = new Date(theYear, theMonth + 1, 1)
    var len = Math.ceil((nextMonth.getTime() - 
        thisMonth.getTime())/oneDay)
    return len
}

function getY2KYear(today) {
    var yr = today.getYear()
    return ((yr < 1900) ? yr+1900 : yr)
}

theMonths = new MakeArray(12)

function MakeArray(n) {
    this[0] = "January"
    this[1] = "February"
    this[2] = "March"
    this[3] = "April"
    this[4] = "May"
    this[5] = "June"
    this[6] = "July"
    this[7] = "August"
    this[8] = "September"
    this[9] = "October"
    this[10] = "November"
    this[11] = "December"
    this.length = n
    return this
}

