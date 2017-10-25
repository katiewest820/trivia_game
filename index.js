let sessionToken; 
let questionInfo = 0;
let apiInfo;
let ua;
//let correct;
let score = 0;
let categories = {
	gn: 9,
	enB: 10, 
	enF: 11,
	enM: 12,
	//enMTh: 13,
	enT: 14,
	enVG: 15,
	enBG: 16,
	sciNa: 17,
	sciC: 18,
	sciM: 19,
	myth: 20,
	sport: 21,
	geo: 22,
	hist: 23,
	poli: 24,
	//art: 25,
	celeb: 26,
	animal: 27,
	veh: 28
}
let answers = [];


function setup(){
	$('.start').on('click', function(){
		$.ajax('https://opentdb.com/api_token.php?command=request').done(function(data) {
			sessionToken = data.token;
			console.log(sessionToken)
		});
	$('.startPage').fadeOut(300);
	$('.setup').fadeIn(300).css('display', 'block');
	});
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function callAPI(){
	$('.button').on('click', function(){
	let categorySelection = $('.category').val();

	console.log(categories[categorySelection])
	let categoryToken = categories[categorySelection]
	let difficulty = $('.difficulty').val();

		$.ajax(`https://opentdb.com/api.php?amount=10&token=${sessionToken}&category=${categoryToken}&difficulty=${difficulty}`).done(function(data) {
			console.log(data)

			
			apiInfo = data.results;
			console.log(apiInfo)
			loadQuestion()
		});	
	});
}

function loadQuestion(){
//$('.button').on('click', function(){
	//let categorySelection = $('.category').val();

	//console.log(categories[categorySelection])
	//let categoryToken = categories[categorySelection]
	//let difficulty = $('.difficulty').val();
	//$.ajax(`https://opentdb.com/api.php?amount=10&token=${sessionToken}&category=${categoryToken}&difficulty=${difficulty}`).done(function(data) {
		//console.log(data)

		//answers.push(data.results[questionInfo].correct_answer, data.results[questionInfo].incorrect_answers[0], data.results[questionInfo].incorrect_answers[1], data.results[questionInfo].incorrect_answers[2]);
		//console.log(answers)
		//apiInfo = data.results;
		//correct = apiInfo[questionInfo].correct_answer;
		if(questionInfo <= 9){
		answers.push(apiInfo[questionInfo].correct_answer);

		for(let i = 0; i < apiInfo[questionInfo].incorrect_answers.length; i++){
		answers.push(apiInfo[questionInfo].incorrect_answers[i])//, apiInfo[questionInfo].incorrect_answers[1], apiInfo[questionInfo].incorrect_answers[2]);
		}
		console.log(answers)
		shuffleArray(answers)
		$('.question').html(apiInfo[questionInfo].question);
		for(let i = 0; i < answers.length; i++){
			$('.answers').append(`<input type="radio" value="${answers[i]}">${answers[i]}`);
		}
		$('.setup').fadeOut(300);
		$('.questionPage').fadeIn(300).css('display', 'block');
		}
		console.log(answers)
}

function nextQ(){
	$('.nextQ').on('click', function(){
		clearAnswers()
		answers = [];
		questionInfo = questionInfo + 1;
		loadQuestion()
		console.log(questionInfo)
	});
}

function clearAnswers(){
	$('.answers').empty()
}

function userAnswer(){
	$('.nextQ').on('click', function(){
		ua = $('.answers').find('input:checked').val()
		console.log(ua)
		correctAnswer();
		endOfGame();
	});
	
}

function correctAnswer(){
	if (ua == apiInfo[questionInfo].correct_answer){
		$('.questionPage').fadeOut(300).delay(3000).fadeIn(300)
		$('.lightBox').fadeIn(300).delay(3000).fadeOut(300);
		$('.correct').fadeIn(200).delay(3000).fadeOut(300);
		//alert('correct');
		score = score + 1;
	}else{
		$('.questionPage').fadeOut(300).delay(3000).fadeIn(300)
		$('.lightBox').fadeIn(300).delay(3000).fadeOut(300);
		$('.incorrect').fadeIn(200).delay(3000).fadeOut(300);
		//alert('incorrect');
	}
}

function endOfGame(){
	if(questionInfo == 9){
		correct = ' ';
		resultsPage()
	}
}

function resultsPage(){
	$('.questionPage').fadeOut(400);
	$('.resultsPage').fadeIn(400)
	$('.resultsScore').html(`Your Score is: ${score} out of 10`);
}

function playAgain(){
	$('.playAgain').on('click', function(){
		questionInfo = 0;
		score = 0;
		setup();
		$('.resultsPage').fadeOut(400);
		$('.setup').fadeIn(400);
	})
}


userAnswer()
callAPI()
nextQ()
setup()
playAgain()



