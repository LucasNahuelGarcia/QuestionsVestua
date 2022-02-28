/**
 * On this module you should write your answer to question #3.
 * This file would be executed with the following command:
 * $ node scritp.js 'a * (b + c)'
 */

const args = process.argv.slice(-1);
console.log(`Running question #3 with args ${args}`)

/**
 * Check if a string has correct use of parenthesis.
 * 
 * @param {String} str - String to be evaluated
 * @returns {Boolean} Returns true if string is valid.
 */
function parenthesisChecker(str) {
  let stack = [];
  
  for(let char of str){
    if(isParenthesis(char)){
      if(stack.length > 0 && canCloseParenthesis(char, stack[stack.length - 1])) stack.pop();
      else stack.push(char);
    }
  }
  
  return stack.length == 0;
}

function isParenthesis(char){
  if(char == '(' || char == ')' || char == '{' || char == '}' || char == '[' || char == ']') return true;
  return false;
}

function canCloseParenthesis(parenthesis, parenthesisToClose){
  if(parenthesis == ')' && parenthesisToClose == '(') return true;
  if(parenthesis == '}' && parenthesisToClose == '{') return true;
  if(parenthesis == ']' && parenthesisToClose == '[') return true;
  return false;
}

const isValid = parenthesisChecker(args);
console.log(`parenthesisChecker("${args}") = ${isValid}`);

