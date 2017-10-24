let sessionToken; 
let questionInfo = 0;
let apiInfo;
let categories = {
	gn: 9,
	enB: 10, 
	enF: 11,
	enM: 12,
	enMTh: 13,
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
	art: 25,
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

function loadQuestion(){
$('.button').on('click', function(){
	let categorySelection = $('.category').val();

	console.log(categories[categorySelection])
	let categoryToken = categories[categorySelection]
	let difficulty = $('.difficulty').val();
	$.ajax(`https://opentdb.com/api.php?amount=10&token=${sessionToken}&category=${categoryToken}&difficulty=${difficulty}`).done(function(data) {
		console.log(data)

		answers.push(data.results[questionInfo].correct_answer, data.results[questionInfo].incorrect_answers[0], data.results[questionInfo].incorrect_answers[1], data.results[questionInfo].incorrect_answers[2]);
		console.log(answers)
		apiInfo = data.results;
		$('.question').html(apiInfo[questionInfo].question);
		$('.setup').fadeOut(300);
		$('.questionPage').fadeIn(300).css('display', 'block');
		shuffleArray(answers)
		console.log(answers)
	});	
});
}

function nextQ(){
	$('.nextQ').on('click', function(){
		questionInfo = questionInfo + 1;
		loadQuestion()
		console.log(questionInfo)

	})
}



loadQuestion()
nextQ()
setup()



