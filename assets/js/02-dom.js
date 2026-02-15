/* ============ DOM Into ======== */
/*
What is the DOM?
The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM provides a tree-like structure where each node represents a part of the document (like elements, attributes, and text).
Nodes: Elements in the DOM are referred to as nodes. There are different types of nodes, such as element nodes, text nodes, and attribute nodes.
Manipulation: With the DOM, you can dynamically change the content, structure, and style of a webpage using languages like JavaScript.
*/

// console.log(window)
// console.log(document)
/*
let myProducts = document.getElementById("our-products");
let allParagraphs = document.getElementsByTagName("p");
let allSpans = document.getElementsByClassName("my-span")
let allSpansByQuery = document.querySelector(".my-span")
let allSpansByAllQuery = document.querySelectorAll(".my-span")

console.log(myProducts)
console.log(allParagraphs)
console.log(allSpans)
console.log(allSpansByQuery)
console.log(allSpansByAllQuery)
console.log(allSpansByAllQuery[0])
console.log(allSpansByAllQuery[1])
// -------------------------------------------
console.log('-------------------------------------------')
console.log(document.title)
console.log(document.body)
console.log(document.forms)
console.log(document.forms[0])
console.log(document.forms[0].username.value)
console.log(document.forms[1].password.value)
console.log(document.links)
console.log(document.links[1].href)
*/

// Getting and setting text content:
// -------------------------------------------
/*
let title = document.getElementById("title");
console.log(title.textContent);
title.textContent = "Updated Title"
*/

// Getting and setting HTML content
/*
let title = document.getElementById("title");
console.log(container.innerHTML);
container.innerHTML = "<h1><i><b>New paragraph updated.</b></i></h1>"
*/

// Getting and setting attributes
/*
 const link = document.getElementById("myLink");
console.log(link.getAttribute("href"));
link.setAttribute("href","https://www.Newlink.com")
*/
/*
let backgroundImage = document.getElementById('bk');

console.log(backgroundImage.getAttribute("src"));
console.log(backgroundImage.getAttribute("alt"));
backgroundImage.setAttribute("alt", "about-us-icon");
backgroundImage.removeAttribute("alt");
*/
/*
//Check Attributes get and set:
const myElement = document.getElementById("myElement");
const myParagraph = document.getElementById("myParagraph");
const myLink = document.getElementById("myLink");

//Checking:
console.log(myElement.hasAttribute("data-info"));
console.log(myElement.hasAttribute("data-nonexistent"));
console.log(myParagraph.hasAttribute("title"));
console.log(myLink.hasAttribute("href"));
console.log("-------------------------------------------");
// Getting:
console.log(myElement.getAttribute("data-info"));
console.log(myParagraph.getAttribute("title"));
console.log(myLink.getAttribute("href"));
console.log(myElement.getAttribute("data-nonexistent"));
//Setting:
myElement.setAttribute("data-info", "updated");
myParagraph.setAttribute("title", "Updated Title");
myLink.setAttribute("href", "https://www.newexample.com");
//Removing:
myElement.removeAttribute("data-info");
myParagraph.removeAttribute("title");
myLink.removeAttribute("target");
*/

/* +++++ Create And Append Elements: +++++*/
/*
let product = document.createElement("div");
let productAttribute = document.createAttribute("data-custom");
let productText = document.createTextNode("Product One");
let myComment = document.createComment("This Is comment for div");

product.setAttribute("data-custom","Product Item")
product.className = "product-item";
 

product.appendChild(myComment);
product.appendChild(productText);


document.body.appendChild(product)
*/
/* +++++ Children Elements: +++++*/
/*
let myElement = document.querySelector(".oldOne");
console.log(myElement.childNodes);
console.log("--------------- children ---------------------");
console.log(myElement.children);
console.log(myElement.children[0]);
console.log(myElement.children[1]);
console.log("----------------- childNodes -------------------");
console.log(myElement.childNodes[0]);
console.log(myElement.childNodes[1]);
console.log("------------------ firstChild & lastChild ------------------");
console.log(myElement.firstChild);
console.log(myElement.lastChild);
console.log("--------------- firstElementChild & last---------------------");
console.log(myElement.firstElementChild);
console.log(myElement.lastElementChild);
// let newDiv = document.querySelector("#myDiv");
// console.log(newDiv.childNodes);
*/

/* +++++ Dom Events: +++++*/
// Click Event

const clickButton = document.getElementById("clickButton")
// clickButton.addEventListener("click", function() {
//     alert("click me button")
// })

// clickButton.addEventListener("dblclick", function() {
//     alert("click me button")
// })

// Mouse Over Event
 const hoverDiv = document.getElementById("hoverDiv");
 hoverDiv.addEventListener("mouseover", function() {
   console.log("Mouse is over the div!");
 });

  hoverDiv.addEventListener("mouseout", function() {
   console.log("Mouse is out of the div!");
 });