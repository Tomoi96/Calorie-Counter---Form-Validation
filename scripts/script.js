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
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);  /**Now you need to target the .input-container element within the element that has your targetId. Declare a new targetInputContainer variable, and assign it the value of document.querySelector(). Use concatenation to separate targetId and '.input-container' with a space, and pass that string to querySelector(). 
    JavaScript has a feature called template literals, which allow you to interpolate variables directly within a string. Template literals are denoted with backticks ``, as opposed to single or double quotes. Variables can be passed in to a template literal by surrounding the variable with ${} – the value of the variable will be inserted into the string.*/
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;  /**You will want to number the entries a user adds. To get all of the number inputs, you can use the querySelectorAll() method. The querySelectorAll() method returns a NodeList of all the elements that match the selector. A NodeList is an array-like object, so you can access the elements using bracket notation. */
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>       
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);  /**To see your new HTML content for the targetInputContainer, you will need to use the innerHTML property. The innerHTML property sets or returns the HTML content inside an element. */   
} 
function calculateCalories(e) {  /**You will be attaching this function to the submit event of the form. The submit event is triggered when the form is submitted. The default action of the submit event is to reload the page. You need to prevent this default action using the preventDefault() method of your e parameter. */
    e.preventDefault();
    isError = false;
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]'); /**Your function needs to get the values from the entries the user has added. Declare a breakfastNumberInputs variable, and give it the value of calling document.querySelectorAll() with the selector #breakfast input[type=number]. This will return any number inputs that are in the #breakfast element. */
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);  /**Now that you have your lists of elements, you can pass them to your getCaloriesFromInputs function to extract the calorie total. Declare a breakfastCalories variable, and assign it the result of calling getCaloriesFromInputs with breakfastNumberInputs as the argument. */
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); /**budgetNumberInput variable. We use getElementById, which returns an Element, not a NodeList. A NodeList is an array-like, which means you can iterate through it and it shares some common methods with an array. For your getCaloriesFromInputs function, an array will work for the argument just as well as a NodeList does.*/
    if (isError) {  /**getCaloriesFromInputs function will set the global error flag to true if an invalid input is detected. Adding an if statement to your calculateCalories function that checks the truthiness of your global error flag, and if it is truthy then use return to end the function execution. */
        return
      }
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';  /** We need to know if the user is in a caloric surplus or deficit. Declare a surplusOrDeficit variable. Then use a ternary operator to set surplusOrDeficit to the string Surplus or Deficit depending on whether remainingCalories is less than 0. If it is less than 0, then surplusOrDeficit should be Surplus. Otherwise, it should be Deficit. */
    /**Construct the HTML string that will be displayed in the output element. Start by assigning an empty template literal to the innerHTML property of the output element on a new line at the end of the function. */
    /**output.innerHTML string will need a span element. Create that, and give it a class attribute set to the surplusOrDeficit variable. surplusOrDeficit variable should be converted to lower case using the toLowerCase() method. Math.abs() is a built-in JavaScript method that will return the absolute value of a number. In span text, wraping remainingCalories reference in Math.abs() to ensure that the value is positive.*/ 
    output.innerHTML = `        
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span> 
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>`; 

    output.classList.remove('hide');  /**To make the #output element visible so the user can see your text. Output variable is an Element, which has a classList property. This property has a .remove() method, which accepts a string representing the class to remove from the element. */
} 
function getCaloriesFromInputs(list) {
    let calories = 0;

    for (const item of list) {
        const currVal = cleanInputString(item.value);
    
    if (invalidInputMatch) {    /**You need to check if invalidInputMatch is truthy – you can do this by passing the variable directly to your if condition (without a comparison operator). */
        alert(`Invalid Input: ${invalidInputMatch[0]}`);    /**Browsers have a built in alert() function, which you can use to display a pop-up message to the user. The message to display is passed as the argument to the alert() function. Using a template literal, in your if block, call the alert() function to tell the user Invalid Input: , followed by the first value in the invalidInputMatch array. */
        isError = true;
        return null;
    }

    calories += Number(currVal);        /**Return ends the execution of a function. After your if block, you need to handle the logic for when the input is valid. Because your if statement returns a value, you do not need an else statement. ou'll need to use the Number constructor to convert currVal to a number. The Number constructor is a function that converts a value to a number. If the value cannot be converted, it returns NaN which stands for "Not a Number".*/
    }
    return calories;
}
function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container')); /**Declaring an inputContainers variable, and assigning it to the value of querying the document for all elements with the class input-container. || document.querySelectorAll returns a NodeList, which is array-like but is not an array. However, the Array object has a .from() method that accepts an array-like and returns an array. This is helpful when you want access to more robust array methods.*/

    for (const container of inputContainers) {  /**Creating a for...of loop with a variable called container to iterate through the inputContainers array. Inside the loop, set the innerHTML property of the container to an empty string. This will clear all of the contents of that input container. */
        container.innerHTML = '';
    }

    budgetNumberInput.value = '';  /**After loop completes, budgetNumberInput needs to be cleared. Thats why we set the value property of budgetNumberInput to an empty string. */
    output.innerText = '';  /**To clear the output element's text. Doing this by setting the innerText property to an empty string. The difference between innerText and innerHTML is that innerText will not render HTML elements, but will display the tags and content as raw text. */
    output.classList.add('hide');  /**To finish off this function, we need to restore the hide class to the output element. The classList property has an .add() method which is the opposite of the .remove() method. It accepts a string representing the class to add to the element. Adding the hide class to your output. */
    clearButton.addEventListener("click", clearForm);  /**an event listener to the clearButton button. When the button is clicked, it should call the clearForm function. */
}
addEntryButton.addEventListener("click", addEntry); /**The addEventListener method takes two arguments. The first is the event to listen to. (Ex. 'click') The second is the callback function, or the function that runs when the event is triggered. */
calorieCounter.addEventListener("submit", calculateCalories);