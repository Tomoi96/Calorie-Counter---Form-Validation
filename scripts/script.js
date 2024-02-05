const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;
function cleanInputString (str) {       /**Even though you set an input element to be a number, JavaScript receives a string value. You need to write a function to clean the string value and ensure you have a number. Start by declaring a cleanInputString function that takes a str parameter */
const strArray = str.split('');  /**The split() method splits a string into an array of substrings, and returns the new array. You can pass in an optional separator which tells the method where each split should happen. */
const cleanStrArray = []; 
for (let i = 0; i < strArray.length; i++) {     /**Use a for loop to iterate through each character in your strArray array. */
if (!["+", "-", " "].includes(strArray[i])) {   /**Within your loop, you need to check if the character in strArray at index i is not a +, -, or a space. If it is not, push it to the cleanStrArray. */
    cleanStrArray.push(strArray[i])   
  }
}
}