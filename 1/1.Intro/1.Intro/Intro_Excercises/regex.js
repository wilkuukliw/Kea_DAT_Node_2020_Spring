// Test shows if the pattern appears in the string
// i flag = case insensitive
const myRegEx = /hello/i;
const result = myRegEx.test("Hello world");

// Pipe = or

const petString = "Anders has an alpaca"; 
const petRegEx = /alpaca|cow|sheep/;
// console.log(petRegEx.test(petString));

// Match
const extractString = "Extract this word from the string";
const wordRegex = /word/;
// console.log(extractString.match(wordRegex));

// The Global flag
// console.log("Repeat, Repeat, Repeat".match(/Repeat/g));

let twinkleStarSong = "Twinkle, twinkle, little star";
// console.log(twinkleStarSong.match(/twinkle/ig));


// Wildcards

const humStr = "That's humbug!";
const hugStr = "I need a hug.";
const huRegex = /hu./;

// console.log(humStr.match(huRegex));
// console.log(hugStr.match(huRegex));

//  console.log("He's a fun 'un".match(/.un/g));

// Wildcard II - One of the following letters
// console.log("I found big bugs in my bag".match(/b[aiu]g/ig));

// console.log("I found big bugs in my bag".match(/[aeiou]/ig));

// Range
// console.log("123abc456".match(/[0-9]/g));

console.log(twinkleStarSong.match(/[a-z]/ig));