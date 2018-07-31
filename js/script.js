/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
let pageNum = 1;
let pageCount; 
const studentsPerPage = 10;
const studentView = document.querySelector('.student-list');
const studentList = document.querySelectorAll('.student-item');
const pageHeaderDiv = document.querySelector('.page-header');

//Create error messages div for the search
const errorDiv = document.createElement("DIV")
$(studentView).append(errorDiv);

//Creates div and ul element for the page buttons. Adds necessary classes.
const buttonsDiv = document.createElement("DIV")
buttonsDiv.className += "pagination";
const buttonsUl = document.createElement("UL");

//Creates the search div, need subelements as input field an button and adds necessary classes and attributes .
const searchDiv = document.createElement("DIV");
searchDiv.className += "student-search";
//Input element
const searchInput = document.createElement("INPUT");
$(searchInput).attr('placeholder', 'Search for students...');
$(searchDiv).append(searchInput);
//Button element
const searchButton = document.createElement("BUTTON");
$(searchButton).text("Search");
$(searchButton).addClass("unsearched");
$(searchDiv).append(searchButton);
//Append searchDiv to page header
$(pageHeaderDiv).append(searchDiv);



//Function for calculation the amount of pages needed, depending on the amout of students per page and how many should be visible filter from a search or as default (all).
function getPageCount(){
	let studentCount = 0;

	//Loops through all students and for each which isn't deselected the loops adds one to the student counter.
	for (var i = 0; i < studentList.length; i++) {
		if ($(studentList[i]).hasClass("deselected") === false) {
			studentCount++;
		}
	}

	//Calculates how many pages by taking the student count and divdeds it with studentsPerPage.
	pageCount = Math.ceil(studentCount / studentsPerPage);

}

// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
//The showStudents functions takes one parameter of pageNum. The page number is used to determin which students should be visible on the list.
function showStudents(pageNum) {
	const stopNum = pageNum * 10;
	const startNum = stopNum - 10;
	let selectedList = [];

	//For debuging
	//console.log(startNum + " - " + stopNum);
	
	//Looping through all students first to check if they are deselected (if they are hide them), if not they are added to the selected list.
	for (var i = 0; i < studentList.length; i++) {
		if ($(studentList[i]).hasClass('deselected') === false) {
			selectedList.push(studentList[i]);
			
		} else {
			$(studentList[i]).css("display", "none");

		}
	}

	//the selected list is loop through to find the students for current page.
	for (var i = 0; i < selectedList.length; i++) {
		if (i < stopNum && i >= startNum) {
			$(selectedList[i]).css("display", "");

		}	else {
			$(selectedList[i]).css("display", "none");

		}
	}
	

}


// Create and append the pagination links - Creating a function that can do this is a good approach
//The setPageLinks uses the getPageCount to get an updated count for how many pages is needed. This is then used to genereate the button elements and append them to the right elements.
function setPageLinks() {

	//clears Button div 
	$(buttonsUl).empty();

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

	//Appends the buttons to the html page after the student list.
	$(buttonsDiv).insertAfter(studentView);

}

//function for changeing which pagge button is active, by removing the active class and only adding it to the button which is passed as an argument. 
function setActiveButton(clickedButton) {
	const buttonList = $(buttonsUl).children();

	for (var i = 0; i < buttonList.length; i++) {
		$(buttonList[i]).children().removeClass("active");
	}

	$(clickedButton).addClass("active");

}

//Function for always setting button 1 as active
function setB1Active() {
	buttonsUl.children[0].children[0].className += "active";
}


// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
//An event listener for the buttonsDiv which triggers the setActiveButton and showStudents functions. In both cases information from the event(.target) is used as arguments.
buttonsDiv.addEventListener('click', (event) => {
	const button = event.target;
	const buttonNum = button.textContent;
	if (button.tagName === 'A') {
		setActiveButton(button);
		showStudents(buttonNum);
	}


});

//Event listener for the search button.
searchButton.addEventListener('click', (event) => {
	//Gets the string the user wants to search
	let searchQuery = searchInput.value.toLowerCase();
	//Sets the varible to get amount of search results
	let resultCount = 0;

	//Checks if the already is in a search in order to provide the clear button to show all students again.
	if ($(searchButton).hasClass("unsearched")) {
		//If the user started a search the unsearched class will be remove and the button will change into a red clear button.
		$(searchButton).removeClass("unsearched");
		$(searchButton).text("Clear");
		$(searchButton).css("background-color", "#DE0031");

		//The following loop check is the name or email of each student contains the string the user searched for.
		for (var i = 0; i < studentList.length; i++) {
			//setting name and email of current student
			let name = studentList[i].children[0].children[1].innerHTML.toLowerCase();
			let email = studentList[i].children[0].children[2].innerHTML.toLowerCase();

			if (name.indexOf(searchQuery) > -1 || email.indexOf(searchQuery) > -1) {
				//If the name or email of the current student contains the searched string, we will make sure that it is not deselected. Add 1 one to resultCount.
	      $(studentList[i]).removeClass('deselected');
	      resultCount++;

	    } else {
	    	//If the name or email of the current student does not contain the searched string, we will deselected it.
	    	$(studentList[i]).addClass('deselected');
	    }

		}

	} else {
		// if the users presses the clear button the class wil change back to unsearched and the button will become the normal search button.
		$(searchButton).addClass("unsearched");
		$(searchButton).text("Search");
		$(searchButton).css("background-color", "#4ba6c3");

		//The loop below will make sure all students are selected again so everyone is shown in the list.
		for (var i = 0; i < studentList.length; i++) {
			$(studentList[i]).removeClass("deselected");
		}

		//Resest the search input field.
		$(searchInput).val("");

		//clears the error messages if shown
		errorDiv.innerHTML = "";

	}

	//checks if the resultCount if 0 or not and if the user is searching or clearing. If it is 0 show error messages.
		if (resultCount === 0 && $(searchButton).hasClass("unsearched") === false){
			errorDiv.innerHTML = "<h2>Your serach - " + searchQuery + " - return 0 results.";
		}

	

	//Calculation and appending page links, showing students for the first page of the results and making the button for page link 1 active.
	setPageLinks();
	showStudents(1);
	setB1Active()


});


//Sets up the page on load.
//Generates the page links based on the about of students in the list and the only show the first 10.
setPageLinks();
showStudents(pageNum);
setB1Active()


