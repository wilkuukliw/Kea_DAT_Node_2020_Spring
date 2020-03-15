//hoisiting
addition(1,1);

//hoisiting

//this doesnt work for let
//test = 1;
//let test;

const example = "this is how you write a const";
console.log(example);

function addition(a,b) {
    return a+ b;
}

var sym = addition(2,5);

console.log(addition(2,5));

function pokeMe() {
    console.log("Meow");
}

pokeMe();   //funtions need to be called

function approachSomeone(someoneToPoke){
    console.log("steps steps steps")
}

approachSomeone(pokeMe);  // function passed as a parameter


const introduce = function(name) {              //another way to make function in js
    console.log("Hello my name is", name);
}

introduce("Anna"); 

const prepareIntroduction = function(introducerFunction, name){
    console.log("hmhmhmhmmh");
    introducerFunction(name);
}

prepareIntroduction(introduce, "Anna");

// make above function into arrow function/ remove function keyword and add arrow

const prepareIntroduction2 = (introducerFunction, name) => {
    console.log("hmhmhmhmmh");
    introducerFunction(name);
}

prepareIntroduction2(introduce, "Anna");


// function with object passed

const aboutMe = (me) => {
    console.log("My hobby is", me.hobby);
}

const me = {
    hobby: "skiing"
}; 

aboutMe(me);

const calLater = {
    toCall: () => {
        console.log("ring ring");
    }
};

callLater.toCall();
console.log(callLater);
