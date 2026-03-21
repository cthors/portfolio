// Code Improvement # 1: Drop-down Navigation Menu

// hide the menu by default
let ddMenu = document.querySelector('nav ul li ul');
ddMenu.classList.add('hidden');

// add the handler for dropping down or back up
let navClicker = document.querySelector('nav ul li:first-child a');
navClicker.addEventListener('click', flipMenu);

function flipMenu(e){
	e.preventDefault();
	let menu = e.target.nextElementSibling;
	menu.classList.toggle("hidden");
}

// Code Improvement # 2: Dynamic Breadcrumbs
// displays 2 levels of breadcrumbs if the current page was reached via link in the body of another page
// displays 1 level of breadcrumbs if the current page was reached via the menu or a regular url

const pageKey = [	{link:"index.html", text:"Home"},
					{link:"lamp.html", text:"Sculptural Lamp"},
					{link:"web.html", text:"Website Design"},
					{link:"panels.html", text:"Light Panels"},
					{link:"resources.html", text:"Resources"}	];

// parameter that only exists if this page was reached via a link within another page
const params = new URLSearchParams(window.location.search);
const lastPgCode = params.get('pg');

// an arrow to go between each breadcrumb
const arrow = document.createElement('span');
arrow.innerHTML = " > ";

// if an original linking page exists, add its breadcrumb:
if (lastPgCode){
	const lastLink = document.createElement('a');
	lastLink.href = pageKey[lastPgCode].link;
	lastLink.innerHTML = pageKey[lastPgCode].text;
	document.querySelector('#breadcrumb').appendChild(arrow);
	document.querySelector('#breadcrumb').appendChild(lastLink);
}

// add the current page's breadcrumb
const currPgCode = document.getElementsByTagName('body')[0].dataset.page;
const currLink = document.createElement('a');
currLink.href = pageKey[currPgCode].link;
currLink.innerHTML = pageKey[currPgCode].text;
document.querySelector('#breadcrumb').appendChild(arrow);
document.querySelector('#breadcrumb').appendChild(currLink);

// JS Feature: Notification

// add an item to the menu to deomonstate a popup notification
const li = document.createElement('li');
li.innerHTML = '<a href="#" onclick="notificationDemo()">About</a>';
document.querySelector('#menu nav ul ul').appendChild(li);

function notificationDemo(){
	window.alert('Hello, Welcome to my portfolio.\n\n If you have any interesting links to add to the Resources page, feel free to email me at the address below :)');
}

// JS Feature: Conditional

// Add a class for the type of page we're on, to apply page-specific styles:
let page = window.location.pathname.split('/').pop();
console.log("PAGE: " + page);
if(page=="index.html"){
	document.querySelector('body').classList.add('front-page');
}
else{
	document.querySelector('body').classList.add('content-page');
}

// JS Feature: Color Changer

// For changing the theme when first loading the page:
window.addEventListener('DOMContentLoaded', function() {
	if(localStorage.getItem('colorScheme')!=null){
		let body = document.querySelector('body');
		let colorScheme = localStorage.getItem('colorScheme');
		body.classList.remove('soap-scheme'); // remove the default scheme (soap)
		body.classList.add(colorScheme);
		//select the correct color-picker button
		let allBtns = document.querySelectorAll('#color-controls button');
			allBtns.forEach(btn=>{
			if (btn.dataset.scheme == colorScheme){
				btn.className = 'curr';
			}
			else{
				btn.className = '';
			}
		});
	}
});

// for changing the theme when clicking a color scheme button:
let themeBtns = document.querySelectorAll('#color-controls button');

themeBtns.forEach(btn =>{
	btn.addEventListener('click', setColorScheme)
});

function setColorScheme(e){

	let body = document.querySelector('body');
	let currBtn = e.target;
	let colorScheme = currBtn.dataset.scheme;

	if(localStorage.getItem('colorScheme')==null){
		body.classList.remove('soap-scheme'); // remove the default scheme (soap)
	}
	else{
		body.classList.remove(localStorage.getItem('colorScheme')); // remove the last scheme used
	}

	// set all the buttons back to their un-selected state
	let allBtns = document.querySelectorAll('#color-controls button'); 
	allBtns.forEach(btn=>{
		btn.className = '';
	});

	currBtn.className = 'curr'; // update the color scheme picker
	body.classList.add(colorScheme); // add the current color scheme
	localStorage.setItem('colorScheme', colorScheme); // save it
}

// JS Feature: Event Handler

// Highlight thumbnails on mouseover:

let thumbnails = document.querySelectorAll('.thumb');

thumbnails.forEach(thumb => {
	thumb.addEventListener('mouseover', zoomIn)
	thumb.addEventListener('mouseout', zoomOut)
});

function zoomIn(e){
	e.target.style.filter = 'brightness(2.5)';
	e.target.style.filter = 'brightness(1.5) hue-rotate(30deg)';
}

function zoomOut(e){
	e.target.style.filter = '';
}