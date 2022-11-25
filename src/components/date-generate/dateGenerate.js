

export function generateDate () {
    const monthShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const basedate = new Date();
    const date = basedate.getDate();
    const month = basedate.getMonth();
    const year = basedate.getFullYear();
    const orgDate = [monthShortName[month],date,year]
    return orgDate.join('-');
}