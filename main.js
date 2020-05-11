function mouseOnElement(elem){
	elem.hover(()=>{elem[0].style.opacity = 0.5;}, ()=>{elem[0].style.opacity = 1;});
}

function stopMouse(id){
	for (let j = 1; j<=4; j+=1) {
		let elem = $("#ans_" + id + "_" + j);
		elem.off();
	}
}

function quizBoxInit(id){
	box = $("#q" + id)
	box.append($('<h2>', {id:('num_'+ id)}))
	if (id) {$('#num_'+ id)[0].innerText = id + "/2";}
	box.append($('<h1>', {id:('question_'+ id)}));
	if (id) {$('#question_0')[0].style.marginTop = "50px";}
	
	$('#question_'+ id)[0].style.fontSize = h1Size;
	$('#question_'+ id)[0].innerText = texts[id][0];
	box.append($('<img>',{id:('img_' + id),src:('images/img_' + id + '.png'), class:"quiz-img"}));

	if (id){
	box.append($('<div>', {id: ('ans-box_'+id), class:"ans-box"}));

	for (let j = 1; j<=3; j+=1) {
		$("#ans-box_" + id).append($('<div>', {id:('ans_' + id + "_" + j), class: "ans-button bottom-border"}));
		$('#ans_' + id + "_" + j)[0].innerText = texts[id][j];
		mouseOnElement($("#ans_" + id + "_"+j));
	}
	$('#ans_' + id + "_" + 3)[0].className =  "ans-button";
	}

	box.append($('<div>', {class: "next-button", id: ("next_"+id)}));
	$("#next_"+id)[0].innerText = "ДАЛЬШЕ";
	if (id) {$("#next_0")[0].innerText = "НАЧАТЬ";}
	mouseOnElement($("#next_"+id));
}

texts = [["Получить промокод очень просто: ответь на два простых вопроса и оставь свой email!"], [
	"Здравствуй, дорогой друг! Что привело тебя в долину стартапов?", 
	"Ищу возможности для развития своего проекта", "Хочу создать свою технологическую команду или присоединиться к существующей", "Скучаю на карантине и хочу узнать, какие решения люди находят в корпорациях"
], 
[
	"Знаешь ли ты, что в дни Startup Village 21-22 мая у тебя будет возможность пообщаться с представителями Газпромбанка и его партнёров?", 
	"Конечно, я собираюсь оставить свои контакты или даже представить свой проект Банку и венчурным фондам", " Возможно, загляну к вам на стенд… Посмотрю, что ещё вы хотите мне предложить", "Пришлите информацию мне на почту и я обязательно изучу! А ещё лучше – напоминание в дни конференции"
]];

for (i = 0; i<= 2; i+=1) {quizBoxInit(i);}

var allAnswers = '';

function start(){
	let box = $("#q0");
	box[0].style.display = "inline-block";
	$("#next_0")[0].style.backgroundColor = "rgb(128, 7, 105)";
			$("#next_0").click(()=>{
				box[0].style.display = "none";
				clickAns(1);
				window.scrollTo(0, 0);
			})
}

function clickAns(id) {
	if (id == 3) {exit(); return;}
	let box = $("#q" + id);
	box[0].style.display = "inline-block";
	for (let j = 1; j <= 3; j+=1){
		let b = $("#ans_" + id + "_" + j);
		b.click(()=>{
			b[0].style.backgroundColor = "#23B484";
			allAnswers += j;

			b[0].style.opacity = "1";
			stopMouse(id);
			$("#next_"+id)[0].style.backgroundColor = "rgb(128, 7, 105)";
			$("#next_"+id).click(()=>{
				box[0].style.display = "none";
				clickAns(id+1);
				window.scrollTo(0, 0);
			})
		})
	}
}


function exit(){
	box = $("#finish");
	box.append($('<h1>', {id: 'finish-text'}));
	$("#finish")[0].style.paddingBottom = "50px";
	$('#finish-text')[0].style.marginTop = "50px";
	$('#finish-text')[0].style.fontSize = h1Size;
	$('#finish-text')[0].innerText = "Спасибо за ваши ответы! Чтобы получить промокод, оставьте свой адрес электронной почты";
	box[0].style.height = "60vh";
//	box.append($('<img>',{id:('img_final'),src:('images/finished.png'), class:"quiz-img"}));
/*	box.append($('<div>', {id: ('text-box'), class:"ans-box"}));
	$("#text-box")[0].style.marginTop = "50px";
	$("#text-box")[0].style.marginBottom = "50px";
	$("#text-box")[0].style.height= "auto";
*/

	emailForm();

	box[0].style.display = "inline-block";
}

function emailForm(){
	var form = document.createElement('form');
	form.action = 'send.php';
	form.method='post';
	$("#finish").append(form);
	var input = document.createElement('input');
	input.id = "email-text";
	input.type = 'text';
	input.name = 'email';
	input.placeholder="Укажите ваш email";
	form.append(input);
	var button = document.createElement('input');
	button.type = "submit";
	button.id="email-button";
	button.value = " ";
	form.append(button);
}


start(0);