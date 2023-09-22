import "./calendar.css"

export const Calendar = () => {
    const today = new Date()
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let year = today.getFullYear();
    const firstOfMonth = new Date(`${year}-${month}-02`)
    console.log("FIRSTOFMONTH", firstOfMonth.getDay())

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const daysPerMonth = {
        "January": 31,
        "February": 28,
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31
    }

    const options = { month: "long" };
    const thisMonth = new Intl.DateTimeFormat("en-US", options).format(today)
    console.log("thisMonth", thisMonth)
    console.log("a", month, day, year)
    const numDays = daysPerMonth[thisMonth]
    console.log("NUMDAYS", numDays)


    let offSetDate = []
    for (let i = 0; i < firstOfMonth.getDay(); i++) {
        offSetDate.push(i)
    }
    let dateArr = []
    for (let i = 0; i < numDays; i++) {
        dateArr.push(i + 1)
    }
    console.log("OFFSET", offSetDate)
    console.log("DATEARR", dateArr)
    return (

        <div className="calendar">
            {daysOfWeek.map((day) => <div>{day}</div>)}
            {offSetDate.map((offset) => <div></div>)}
            {dateArr.map((day) => <div>{day}</div>)}
        </div>
    )
}
