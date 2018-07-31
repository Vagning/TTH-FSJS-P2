/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const studentsPerPage = 10;
const studentView = document.querySelector('.student-list');
const studentList = document.querySelectorAll('.student-item');
const buttonsDiv = document.createElement("DIV")
const buttonsUl = document.createElement("UL");
let pageNum = 1;
let pageCount; 

function getPageCount(){
	let visibleStudents = [];

	for (var i = 0; i < studentList.length; i++) {
		if ($(studentList[i]).hasClass("deselected") === false) {
			visibleStudents.push(studentList[i]);
		}
	}

	pageCount = Math.ceil(visibleStudents.length / studentsPerPage);

}

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
function showStudents(pageNum) {
	const stopNum = pageNum * 10;
	const startNum = stopNum - 10;

	//For debuging
	//console.log(startNum + " - " + stopNum);
	
	for (var i = 0; i < studentList.length; i++) {
		if (i < stopNum && i >= startNum) {
			$(studentList[i]).css("display", "");

		}	else {
			$(studentList[i]).css("display", "none");

		}
	}


}


// Create and append the pagination links - Creating a function that can do this is a good approach
function setPageLinks() {

	getPageCount();

	for (var i = 1; i <= pageCount; i++) {
    let buttonLi = document.createElement('li');
    let buttonLink = document.createElement('a');
    buttonLink.href = '#';
    buttonLink.textContent = i;

    //Append the a element to the li element which is appended to the ul element which is appended to the div
    buttonLi.appendChild(buttonLink);
    buttonsUl.appendChild(buttonLi);
    buttonsDiv.appendChild(buttonsUl);
    
	}

	$(buttonsDiv).insertAfter(studentView);

}

//function for changeing which pagge button is active 
function setActiveButton(clickedButton) {
	const buttonList = $(buttonsUl).children();

	for (var i = 0; i < buttonList.length; i++) {
		$(buttonList[i]).children().removeClass("active");
	}

	$(clickedButton).addClass("active");

}


// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
buttonsDiv.addEventListener('click', (event) => {
	const button = event.target;
	const buttonNum = button.textContent;
	setActiveButton(button);
	showStudents(buttonNum);


});




//Sets up the page on load.
//Generates the page links based on the about of students in the list and the only show the first 10.
setPageLinks();
showStudents(pageNum);
buttonsDiv.className += "pagination";
//Sets first page button to active 
buttonsUl.children[0].children[0].className += "active";
