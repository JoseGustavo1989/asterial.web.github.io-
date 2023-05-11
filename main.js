// Start Code for variables

let targetsReveals = 0;
let target1 = null;
let target2 = null;
let firstResult = null;
let secondResult = null;

//Random Numbers

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]

numbers = numbers.sort(()=>{return Math.random()-0.5})

console.log(numbers);

//Function Onclick

function reveal(id){

	targetsReveals++;
	console.log(targetsReveals);

	if(targetsReveals == 1){
		//Showing firts number
		target1 = document.getElementById(id);
		firstResult = numbers [id]
		target1.innerHTML = firstResult;
		//Disabled first button
		target1.disabled = true;
	}

}



