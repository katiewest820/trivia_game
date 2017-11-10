let sessionToken; 
let questionInfo = 0;
let apiInfo;
let userAnsArr = [];
let correctAnsArr = []
let score = 0;
let categories = {
	gn: 9,
	enB: 10, 
	enF: 11,
	enM: 12,
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
	$('.greeting').addClass('animated bounceOutRight');
	$('.start').addClass('animated bounceOutLeft');	
	setTimeout(function(){
		$('.startPage').hide();
		$('.setup').css('display', 'block');
	}, 600);
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
	let categoryToken = categories[categorySelection];
	let difficulty = $('.difficulty').val();
		$.ajax(`https://opentdb.com/api.php?amount=10&token=${sessionToken}&category=${categoryToken}&difficulty=${difficulty}`).done(function(data) {
			console.log(data)
			if(data.response_code !== 0){
				console.log('noooo')
				$.ajax(`https://opentdb.com/api.php?amount=10&token=${sessionToken}&category=${categoryToken}`).done(function(data) {
					apiInfo = data.results;
					console.log(apiInfo)
					loadQuestion()
				});
			}else{
				apiInfo = data.results;
				console.log(apiInfo)
				loadQuestion();
			}
		});	
	});
}

function loadQuestion(){
	if(questionInfo <= 9){
		answers.push(apiInfo[questionInfo].correct_answer);
		correctAnsArr.push(apiInfo[questionInfo].correct_answer);
	for(let i = 0; i < apiInfo[questionInfo].incorrect_answers.length; i++){
		answers.push(apiInfo[questionInfo].incorrect_answers[i]);
	}
	console.log(answers)
	shuffleArray(answers);
	$('.question').html(apiInfo[questionInfo].question);
	$('.questionNumber').html(`${questionInfo + 1} of 10`);
	for(let i = 0; i < answers.length; i++){
		$('.answers').append(`<label for="${answers[i]}"><input type="radio" name="answer" id="${answers[i]}" class="${answers[i]}" value="${answers[i]}"/><p>${answers[i]}</p></label>`);
	}
	$('.categoryHeader').addClass('animated bounceOutRight');
	$('.categoryDropdowns').addClass('animated bounceOutLeft');	
	setTimeout(function(){
		$('.setup').fadeOut(300);
		$('.questionPage').fadeIn(300).css('display', 'block');
	}, 600);
	}
	console.log(answers)
}

function nextQ(){
	$('.nextQ').on('click', function(){
		if(ua == undefined){
			return;
		}else{
			clearAnswers()
			answers = [];
			questionInfo = questionInfo + 1;
			loadQuestion()
			console.log(questionInfo)
		}
	});
}

function noAnswer(){
	if(ua == undefined){
		$('.questionPage').fadeOut(300).delay(1200).fadeIn(300);
		$('.lightBox').fadeIn(300).delay(1000).fadeOut(300);
		$('.noAnswer').fadeIn(200).delay(1000).fadeOut(300);
	}else{
		correctAnswer();
	}
}

function clearAnswers(){
	$('.answers').empty()
}

function userAnswer(){
	$('.nextQ').on('click', function(){
		ua = $('.answers').find('input:checked').val()
		if(ua !== undefined ){
			userAnsArr.push(ua);
		}
		console.log(userAnsArr)
		noAnswer();
		endOfGame();
	});
	
}

function correctAnswer(){
	if (ua == apiInfo[questionInfo].correct_answer){
		score = score + 1;
	}
}

function endOfGame(){
	if(questionInfo >= 9){
		correct = ' ';
		resultsPage()
	}
}

function resultsPage(){
	$('.questionPage').fadeOut(400);
	$('.resultsPage').fadeIn(400).css('display', 'grid');
	$('.resultsScore').html(`Your Score is: ${score} out of 10`);
	
		for(let i = 0; i < 10; i++){
			$('.correctAnswers').fadeIn(400).css('display', 'grid').append(`<div class="resultsQuestion">Q ${[i + 1]}:
			${apiInfo[i].question}</div><div class="resultsCorrect">Correct answer: ${apiInfo[i].correct_answer}</div>
			<div class="resultsUA${i}">Your answer: ${userAnsArr[i]}</div>` )
			resultsColor();
		}
	$('.playAgain').fadeIn(400);
}

function resultsColor(){
	console.log('hello')
	console.log(correctAnsArr);
	console.log(userAnsArr);
	for(let i = 0; i < 10; i++){
		if(correctAnsArr[i] == userAnsArr[i]){
			$('.resultsUA' + i).css('color', 'green');
		}else{
			$('.resultsUA' + i).css('color', 'red');
		}	
	}
}

function playAgain(){
	$('.playAgain').on('click', function(){
		questionInfo = 0;
		score = 0;
		userAnsArr = [];
		correctAnsArr = [];
		answers = [];
		$.ajax('https://opentdb.com/api_token.php?command=request').done(function(data) {
			sessionToken = data.token;
			$('.playAgain').fadeOut();
			$('.correctAnswers').fadeOut();
			$('.correctAnswers').fadeOut();
			$('.resultsPage').fadeOut(200);
			$('.setup').fadeIn(200);
			$('.categoryHeader').removeClass('animated bounceOutRight');
			$('.categoryDropdowns').removeClass('animated bounceOutLeft');
		});
	});
}

$(function(){
userAnswer()
callAPI()
nextQ()
setup()
playAgain()
});


