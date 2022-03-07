/**
 * On this module you should write your answer to question #3.
 * This file would be executed with the following command:
 * $ node scritp.js 'a * (b + c)'
 */

const args = process.argv.slice(-1);
console.log(`Running question #3 with args ${args}`);

/**
 * Check if a character is of type parenthesis.
 * @param {String} char - Character to be evaluated.
 * @returns {int} Returns 1 if char is of type opening parenthesis; returns -1 if char is of type close parenthesis; returns 0 otherwise.
**/
function isParenthesis(char) {
    var res = 0;
    const openParenthesis = [
        '(',
        '[',
        '{'
    ];
    const closeParenthesis = [
        ']',
        ')',
        '}',
    ];
    if (openParenthesis.includes(char))
        res = 1;
    else if (closeParenthesis.includes(char))
        res = -1;

    return res;
}

/**
 * Given a char with a closing parenthesis, returns the corresponding opening parenthesis.
 * @param {String} char - Character with a closing parenthesis.
 * @returns {int} Returns the corresponding opening parenthesis of char. If char is not a valid character, reeturns an empty string.
**/
function getOpeningPraenthesis(char) {
    var res = "";
    switch(char) {
    case ")":
        res = "(";
        break;
    case "]":
        res = "[";
        break;
    case "}":
        res = "{";
        break;
    }
    return res;
}
/**
 * Check if a string has correct use of parenthesis.
 *
 * @param {String} str - String to be evaluated
 * @returns {Boolean} Returns true if string is valid.
 */
function parenthesisChecker(str) {
    const stackParenthesis = [];
    var error = false;

    for (var i = 0; i < str.length && !error; i++) {
        // console.log('----------------------------------------------');
        var char = str[i];
        const parenthesisType = isParenthesis(char);
        if (parenthesisType > 0)
            stackParenthesis.push(char);
        else if (parenthesisType < 0) {
            // console.log('stackParenthesis: ' + stackParenthesis[stackParenthesis.length - 1]);
            // console.log('char:             ' + getOpeningPraenthesis(char));
            // console.log('equals : ' + (stackParenthesis[stackParenthesis.length - 1].localeCompare(char) == 0));
            if (stackParenthesis.length != 0 && stackParenthesis[stackParenthesis.length - 1].localeCompare(getOpeningPraenthesis(char)) == 0)
                stackParenthesis.pop();
            else
                error = true;
        }
        // console.log('error: ' + error);
    }
    return !error && stackParenthesis.length == 0;
}


const isValid = parenthesisChecker(args[0]);
console.log(`parenthesisChecker("${args}") = ${isValid}`);
