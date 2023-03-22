function upcomingDate(arrData, date) {
    let currentDate = new Date(arrData.currentDate).getTime();
    let eventDate = new Date(date).getTime();
    return currentDate>=eventDate;
}
function pastDate(arrData, date) {
    let currentDate = new Date(arrData.currentDate).getTime();
    let eventDate = new Date(date).getTime();
    return currentDate>=eventDate;
}
function firstTable(data, tagId){
    let firstTableDocument = document.getElementById(tagId);
    firstTableDocument.innerHTML = `
    <tr>
        <td>${data.highPercentage}</td>
        <td>${data.lowPercentage}</td>
        <td>${data.largeCapacity}</td>
    </tr>`
}
function makeTable(arrData,tagId) {
    let makeTableDocument = document.getElementById(tagId);
    let tableRows = arrData.map(event => {
        return `
        <tr class="text-center">
            <td>${event.category}</td>
            <td>${event.revenues}</td>
            <td>${event.attendance.toFixed(2)}%</td>
        </tr>`
    })
    makeTableDocument.innerHTML = tableRows.join("")
}
function firstRowData(hPercentage,lPercentage,lCapacity){
    let bestRowData = {
        highPercentage : hPercentage[0].nameEvent,
        lowPercentage : lPercentage[0].nameEvent,
        largeCapacity: lCapacity[0].nameEvent
    }
    return bestRowData;
}
function getAttendance(arrData){
    let arrPercentage = arrData.map(event => {
        return {
            attendance: (event.assistance / event.capacity) * 100,
            nameEvent: event.name
        }
    })
    arrPercentage.sort((a, b) => b.attendance - a.attendance);
    return arrPercentage;
}
function getCapacity(arrData) {
    let arrCapacity = arrData.map(event => {
        return {
            capacity: event.capacity,
            nameEvent: event.name
        }
    })
    arrCapacity.sort((a, b) => b.capacity - a.capacity);
    return arrCapacity;
}
function otherTables(arrData){
    let categories = Array.from(new Set(arrData.map(event => event.category)));
    let eventsCategories = categories.map(category => arrData.filter(event => event.category == category));
    let results = eventsCategories.map(eventCategory => {
        let calculate = eventCategory.reduce((acc, event) => {
          acc.category = event.category;
          acc.revenues += event.price * (event.assistance || event.estimate);
          acc.attendance += ((event.assistance || event.estimate) * 100) / event.capacity
          return acc
        }, {
          category: "",
          revenues: 0,
          attendance: 0
        })
        calculate.attendance = calculate.attendance / eventCategory.length
        return calculate
      })
      return results;
}

let eventsFetched = [];
async function getData(){
    
    await fetch('https://mindhub-xj03.onrender.com/api/amazing').then(response => response.json()).then(datosApi => {
      eventsFetched = datosApi;
      let upcomingEvents = eventsFetched.events.filter(event => upcomingDate(eventsFetched,event.date));
      let pastEvents = eventsFetched.events.filter(event => pastDate(eventsFetched,event.date));

      firstTable(firstRowData(getAttendance(eventsFetched.events),getAttendance(eventsFetched.events).reverse(),getCapacity(eventsFetched.events)),"table1");
      makeTable(otherTables(upcomingEvents),"table2");
      makeTable(otherTables(pastEvents),"table3");

    }).catch(error => console.log(error.message))
}
getData();


