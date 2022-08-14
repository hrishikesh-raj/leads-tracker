// Javascript for Leads Tracker (Chrome Extension)

let myLeads = []; // empty array
const inputEl = document.getElementById("input-el"); // const variable cannot be reassigned
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLocalStroage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStroage){
    myLeads = leadsFromLocalStroage;
    render(myLeads);
}

// const tabs = [
//     {url: "https://www.linkedin.com/in/hrishikesh-raj/"}
// ]

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);  
    })
})

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        // listItems += "<li> <a target='_blank' href='" + myLeads[i]  +"'>" + myLeads[i] + "</a></li>";
        // Create templates using `` and ${}
        listItems += `
            <li> 
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value);
    inputEl.value = ""; // clears the input field after pushing the value in myLeads
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // localStorage stores only as string
    render(myLeads);
});

// function add(a, b){ // a, b -> Parameters
//     return a+b;
// }
// console.log(add(3, 4)); // 3, 4 -> Arguments : Outside

// Passing array as parameter:-
// function getFirst(arr){
//     return arr[0];
// }
// console.log(getFirst([1, 2, 3, 4, 5]));