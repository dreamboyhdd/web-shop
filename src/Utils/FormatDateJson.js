export const  FormatDateJson = (date, reg=0) => {
    if(date === null || date === "" || typeof date === 'undefined')
        return '';
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    if(reg===0)
     return [day,month,year].join('/') + ' ' + [h,m].join(':');
    else if(reg===1)
     return [day,month,year].join('/');
    else if(reg===2)
        return [year,month].join('-');
    else if (reg===3)
        return [day,month,year].join('/') + ' ' + [h,m,s].join(':');
    else if (reg===4)
        return [h,m].join(':');
}