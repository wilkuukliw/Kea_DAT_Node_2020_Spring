$("body").css("text-align", "center")     //two parameters, key and value,  cause it is a json file

$("#title h2").text("New title")             //hash because we re accesing by id, several ccesses with white space therefore ' h2'

$(".subtitle-box").css("background-color", "#8888ff")    //accesing by clas therefore . in the beggining 

$(".temp").hide()

$("div.reason").css("border-style", "dotted")

$("ol li").css("font-weight","bold")

$("#first-list li:last").css("text-decoration","underline")   //first and last

$("#first-list li:eq(1)").css("text-decoration","line-through")    //another way to access elements

$(".second-list").css("font-style","italic")

$(".second list span").css("font-size","0.5em")    //span?


//remove first line
$(".unused-box label:eq(0)").remove()    //eq is element query

//add a 2nd paragraph
$(".unused-box").append("<p>Second sentence</p>")   //append is add at the end of

// add a paragraph before (so 1st)
$(".unused-box").prepend("<p>First sentence</p>") // prepend is to add before 

// change class name
$(".unused-box").attr("class", "used-box")    // class -  attribute, used-box - value 

//add a class name

$(document).ready(() => {
    $(".used-box").click(() => {   //"attach click event to a DOM"
    $(".used-box").toggleClass("used-boxed-clicked")    //what is toggling?
    })
})

// change title of the button when hover over 

$("#submit-button").mouseenter(() => {
    $(event.currentTarger).text("You're ready to click.")
}) .mouseout(() => {
    $(event.currentTarger).text("Click")
})

// add a reason to the ordered list

$("#first-list").append($("<li>Reason 4</li>"))

