const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        // selecting NGN by default as FROM currency and GHS as TO currency
        let selected = i == 0 ? currency_code == "NGN" ? "selected" : "" : currency_code == "GHS" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
}

function loadFlag(element){
    for(let code in country_list){

        // if currency code of country list is equal to option value
        if(code == element.value){

            // selecting img tag of particular drop list
            let imgTag = element.parentElement.querySelector("img"); 

            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
});
//switching the icons 
const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    // declaring a vaiable for temporary currency code of FROM drop list
    let tempCode = fromCurrency.value; 

    // passing TO currency code to FROM currency code
    fromCurrency.value = toCurrency.value; 

    // passing temporary currency code to TO currency code
    toCurrency.value = tempCode; 

    // calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(fromCurrency); 

    // calling loadFlag with passing select element (toCurrency) of TO
    loadFlag(toCurrency); 

    // calling getExchangeRate
    getExchangeRate(); 
})

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";

    let url = `https://v6.exchangerate-api.com/v6/8b5f4b0f779c8cb407393441/latest/${fromCurrency.value}`;

    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result =>{

        // getting user selected TO currency rate
        let exchangeRate = result.conversion_rates[toCurrency.value];
        
        // multiplying user entered value with selected TO currency rate
        let totalExRate = (amountVal * exchangeRate).toFixed(2); 
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{ 
        
        // if user is offline or any other error occured while fetching data then catch function will run
        exchangeRateTxt.innerText = "Something went wrong";
    });
}




//creating the dark theme
//creating of variable that will contain the dom
var icon = document.getElementById("icon");
let darkMode = localStorage.getItem("dark-theme");

// create a variable activating dark mode and setting it to the local storage 
const enableDarkMode =() => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("dark-theme", "enabled");
    icon.src = ("img/sun.png");
}
// create a variable de-activating dark mode and setting it to the local storage 
const disableDarkMode = () =>{
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("dark-theme", "disabled");
    icon.src= "img/moon-fill.png"
}

if (darkMode === "enabled"){
    // set state of darkMode on page load
    enableDarkMode();

}

icon.addEventListener("click", (e)=>{
    //update dark mode once clicked
    darkMode = localStorage.getItem("dark-theme");
    if(darkMode === "disabled"){
        enableDarkMode();
    }else{
        disableDarkMode();
    }
});


//creating the active date, time and year
//creating a function that will contain all our declared variables and conditions
function updateClock(){
var now = new Date();
var dname = now.getDay();
var mnth = now.getMonth();
var dnum = now.getDate();
var yr = now.getFullYear();
var hr = now.getHours();
var min = now.getMinutes();
var sec = now.getSeconds();
var per = "AM";

if(hr == 0){
    hr = 12;
}
if(hr > 12){
    hr = hr - 12;
    per = "PM";
}
Number.prototype.pad = function(digits){
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n
}
//creating an arrays for months, weeks, variables declared above aand the set of ids in our html
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];

var values = [week[dname], months[mnth], dnum.pad(2), yr, hr.pad(2), min.pad(2), sec.pad(2), per];

for (var i = 0; i < ids.length; i++)
document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

//invoking the function that was declared in the body of our html page
function initClock(){
    updateClock();
    window.setInterval("updateClock()", 1)
};