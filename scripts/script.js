const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;
function cleanInputString (str) {       /**Even though you set an input element to be a number, JavaScript receives a string value. You need to write a function to clean the string value and ensure you have a number. Start by declaring a cleanInputString function that takes a str parameter */
    const regex = /[+-\s]/g;         /**While looping through the string works, creating a new array is inefficient for memory and runtime performance. Instead, you can use Regular Expressions (referred to as "regex") to match specific characters. 
    In regex, shorthand character classes allow you to match specific characters without having to write those characters in your pattern. Shorthand character classes are preceded with a backslash (\). The character class \s will match any whitespace character. Add this to your regex pattern.
    To tell the pattern to match each of these characters individually, you need to turn them into a character class. This is done by wrapping the characters you want to match in brackets.
    Regex can also take specific flags to alter the pattern matching behavior. Flags are added after the closing /. The g flag, which stands for "global", will tell the pattern to continue looking after it has found a match. */
    return str.replace(regex, ''); /**Strings have a .replace() method which allows you to replace characters in the string with another string. .replace takes two arguments. The first is the character sequence to replace – this can either be a string or a regex pattern. The second is the string to replace that sequence with. */
}
function isInvalidInput(str) {
    const regex = /\d+e\d+/i;  /**The e in a number input can also be an uppercase E. Regex has a flag for this, however – the i flag, which stands for "insensitive". This flag makes your pattern case-insensitive. Add the i flag to your regex pattern. 
    Number inputs only allow the e to occur between two digits. To match any number, you can use the character class [0-9]. This will match any digit between 0 and 9. /d is shorthand to match any digit.
    The + modifier in a regex allows you to match a pattern that occurs one or more times. To match your digit pattern one or more times, add a plus after each of the digit character classes. For example: [0-9]+.*/
    return str.match(regex);  /**Strings have a .match() method, which takes a regex argument. .match() will return an array of match results – containing either the first match, or all matches if the global flag is used. */
}
function addEntry() {
    const targetId = '#' + entryDropdown.value;  /**You'll need to know which category the entry goes in. Thankfully, you added a dropdown for the user to select a category. 
    Remember that you queried that dropdown earlier in your JavaScript and assigned it to the entryDropdown button. You can use the value property to get the value of the selected option.
    Use concatenation to add a # to the beginning of the value property of entryDropdown, and assign that result to a targetId variable. */
    const targetInputContainer = document.querySelector(`${targetId} .input-container`);  /**Now you need to target the .input-container element within the element that has your targetId. Declare a new targetInputContainer variable, and assign it the value of document.querySelector(). Use concatenation to separate targetId and '.input-container' with a space, and pass that string to querySelector(). 
    JavaScript has a feature called template literals, which allow you to interpolate variables directly within a string. Template literals are denoted with backticks ``, as opposed to single or double quotes. Variables can be passed in to a template literal by surrounding the variable with ${} – the value of the variable will be inserted into the string.*/
}  