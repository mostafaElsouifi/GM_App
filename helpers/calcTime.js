module.exports = calcTime = (startTime, endTime)=>{
    let timeExecuted = endTime - startTime
    const hours = Math.floor(timeExecuted / (1000 * 60 * 60));
    const minutes = Math.floor((timeExecuted % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeExecuted % (1000 * 60)) / 1000);
    
    timeExecuted = `${hours ? hours + ' (h) :' : ''} ${minutes ? minutes + ' (m) : ' : ''} ${seconds} (s)`;
return timeExecuted
}