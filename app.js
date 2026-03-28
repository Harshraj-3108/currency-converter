const fromCurrency=document.getElementById("fromCurrency")
const toCurrency=document.getElementById("toCurrency")
for(let code in countryList){
let option1 = document.createElement("option");
let option2 = document.createElement("option");
option1.value = option2.value = code;
option1.innerText = option2.innerText = code;
fromCurrency.appendChild(option1);
toCurrency.appendChild(option2);
}
// Default values
fromCurrency.value = "USD";
toCurrency.value = "INR";
// Flag update function
function updateFlag(element, currencyCode) {
  let countryCode = countryList[currencyCode];
  let img = element.parentElement.querySelector("img");

  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}
// Initial flag load
window.addEventListener("load", () => {
  updateFlag(fromCurrency, fromCurrency.value);
  updateFlag(toCurrency, toCurrency.value);
});
// Change flag on dropdown change
fromCurrency.addEventListener("change", () => {
  updateFlag(fromCurrency, fromCurrency.value);
});

toCurrency.addEventListener("change", () => {
  updateFlag(toCurrency, toCurrency.value);
});
// Convert function
async function convert() {
  let amount = document.getElementById("amount").value;

  if (amount === "" || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  let from = fromCurrency.value;
  let to = toCurrency.value;

  try {
    let url = `https://api.exchangerate-api.com/v4/latest/${from}`;

    let response = await fetch(url); //API se data mang raha
    let data = await response.json();//JSON me convert

    let rate = data.rates[to];//data.rates["INR"] = 83
    let result = (amount * rate).toFixed(2);//amount × rate

    document.getElementById("result").innerText =
      `${amount} ${from} = ${result} ${to}`;

  } catch (error) { //Agar API fail ho jaye
    document.getElementById("result").innerText =
      "Error fetching data 😢";
  }
}
function swap() {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  updateFlag(fromCurrency, fromCurrency.value);
  updateFlag(toCurrency, toCurrency.value);
}