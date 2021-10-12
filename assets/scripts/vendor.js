const previousBtn = document.getElementById('previous-btn');
const nextBtn = document.getElementById('next-btn');
const addResultGameModal=document.getElementById('add-modal');
const backdrop=document.getElementById('backdrop');
const cancelResultGameModal = addResultGameModal.querySelector('.btn--passive');
const addBoardSubscription = addResultGameModal.querySelector('.btn--success');
const addModalSubscription = document.getElementById('add-modal_2');
const notSentDataToScoreBoardElem = document.querySelector('.btn--passive2');
const sentDataToScoreBoardElem = document.querySelector('.btn--success2');
const userInputsElem = addModalSubscription.querySelectorAll('input');

const previousSelection = [] ;
const storePoints= [];
const HARD = 'hard';
const MEDIUM = 'medium';
const EASY = 'easy';
let increment=0;
let copyAnswerSelected;


const logicSetupScoring = (item) => {
  let scoring = {};
  let answSelected = item[increment]['answSelected'];
  let corrAnsw = item[increment]['corrAnsw'];
  let difficulty = item[increment]['headerData'][1];
  let question = item[increment]['headerData'][2];
  increment++;
  if(answSelected===corrAnsw){
    if(difficulty===HARD){
      scoring.point = 3;
      scoring.difficulty = difficulty;
      scoring.question = question;
      storePoints.push(scoring);
        return;
    }else if(difficulty===MEDIUM){
      scoring.point = 2;
      scoring.difficulty = difficulty;
      scoring.question = question;
      storePoints.push(scoring);
        return;
    }else if(difficulty===EASY){
      scoring.point = 1;
      scoring.difficulty = difficulty;
      scoring.question = question;
      storePoints.push(scoring);
      return;
    }
 }else{
     scoring.point = 0;
     scoring.difficulty = difficulty;
     scoring.question = question;
     storePoints.push(scoring);
  }
};

const renderHeadTitles = (category, difficulty, question) => {
  const h1titleGame = document.getElementById("title-game");
  const h4category = document.getElementById("category");
  const h5difficulty = document.getElementById("difficulty");
  const h5question = document.getElementById("question");
  h1titleGame.innerHTML = "TRIVIA GAMES";
  h4category.innerHTML = "<b>Category is </b>" + category;
  h5difficulty.innerHTML = "<b>Difficulty: </b>" + difficulty;
  h5difficulty.style.margin = 1;
  h4category.style.margin = 1;
  h5question.innerHTML = "<b>Question</b>:" + question;
};

// setUp radio button
const renderSetupRadioButtons=(questions,index,headerData)=>{
  const correctsA   = questions[index].correct_answer;
  const incorrectsA = questions[index].incorrect_answers;
  const answers = shuffle([correctsA,...incorrectsA]);
  radioButtons(output='',answers,correctsA,incorrectsA,headerData);
};

//shuggle array elements
const shuffle= (array) => {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

const returnRadiobutton=(output,answers)=>{
  for(var i=0; i< answers.length; i++){
    listAnswer=answers[i];
    output+= `<li> <b>${i+1})</b><input type="radio" id="pippo"  value="{${listAnswer}}" >`+ listAnswer+`</li>`;
    document.getElementById("questions-container").innerHTML=output;
  }
}

// render Radio Buttons
const radioButtons=(output,answers,correctsA,incorrectsA,headerData)=>{

  returnRadiobutton(output,answers,);
  
  const listItems = document.querySelectorAll('li')
  const radioButtons = document.querySelectorAll('input');
  const divAnswerCorrect = document.getElementById('correct-answer');
  listItems.forEach((listItem)=>{
    listItem.addEventListener('click',(event)=>{
      const answerSelected = event.target.value.replace(/[{()}]/g, '');
       copyAnswerSelected=answerSelected;
      if (!previousSelection.includes(answerSelected)) {
        let answered = {
          'index':previousSelection.length,
          'selected':false,
          'answSelected':null,
          'corrAnsw':correctsA,
          'listAnsw':answers,
          'headerData': headerData
        };
        answered['answSelected']=answerSelected;
        answered['selected'] = true;
        previousSelection.push(answered);
        console.log('answer added: ',previousSelection)
        logicSetupScoring(previousSelection);
      }
      radioButtons.forEach((radioButton,index,array)=>{
        radioButton.setAttribute('disabled','');
        const correctAnsw = correctsA.replace(/[{()}]/g, ''); 
        if(answerSelected === correctAnsw){
          divAnswerCorrect.textContent= `CORRECT ANSWER!: ${correctAnsw}`;
          //call function only one time.
          if(index===(array.length-1)){
            setUpButton();
            return;
          } 
        } else {
          //call function only one time.
          if(index===(array.length-1)) setUpButton();
          divAnswerCorrect.textContent= `WRONG, CORRECT ANSWER IS: ${correctAnsw}`; 
        }
      });
    });
  });
};

//rander radio buttons just clicked

const radioButtonClicked=(answers,correctAnswer)=>{
  setUpButton();
  radioButtonalreadySelected(answers,correctAnswer);
};
const radioButtonalreadySelected=(answers,correctAnswer)=>{
  let output='';
  for(var i=0; i< answers[0].length; i++){
    output+= `<li> <b>${i+1})</b><input type="radio" id="pippo"  value="{${answers[0][i]}}">`+ answers[0][i]+`</li>`;
    document.getElementById("questions-container").innerHTML=output;
    document.querySelectorAll('input').forEach(element=>element.disabled=true)
  }
  document.getElementById('correct-answer').innerHTML ='CORRECT ANSWER:<b>'+ correctAnswer+'</b>, YOUR ANSWER: '+copyAnswerSelected;

}
//remove disabled attribute from button
const setUpButton=()=>{
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button=>button.disabled=false);
};

const disableNextButon = () =>{
  const buttons = document.getElementById('next-btn');
  buttons.setAttribute('disabled','');
};
const toggleBackdrop = () =>{
  backdrop.classList.toggle('visible');
}
const toggleGameModal=()=>{
  addResultGameModal.classList.toggle('visible');
  toggleBackdrop();
};

const backdropClickHandler=()=>{
  toggleGameModal();
};

const cancelfinalGameModal =()=>{
  toggleGameModal();
  location.reload();
};

const toggleBoardSubscription = () => {
  toggleGameModal();
  addModalSubscription.classList.toggle('visible');
  toggleBackdrop();
  userInputsElem[0].disabled=false;
  userInputsElem[1].disabled=false;
};

const cancelSendDataHandler =()=>{
  addModalSubscription.classList.toggle('visible');
  location.reload();
};

//need only to create post API call method to display the result on the board when the system is re-uploaded 
const sendDataHandler = ( ) =>{
  const titleValue  = userInputsElem[0].value;
  const titleValue2 = userInputsElem[1].value;
  const date = returnCompleteDate();
  const userScoreBoard = {
    'user':titleValue,
    'highest-score':finalScoreUser,
    'date':date
  }
  if(titleValue.trim()==='' || titleValue2.trim()===''){
    alert('please insert no empty value');
    return;
  }
  cancelSendDataHandler();
  httpDataScorePost(userScoreBoard);
}


const returnCompleteDate = () =>{
  let date = new Date();
  let day = date.getDay();
  let month = date.getDate();
  let fullyear = date.getFullYear();
  let hours = date.getUTCHours(); 
  let minutes = date.getUTCMinutes();
  return  `${day}-${month}-${fullyear},[${hours}.${minutes}]`; 
};

const renderUserToBoard=(scoresUsers)=>{
  //conver object into an array of obeject
  const board = document.getElementById('sub-score-board');
  const arrScoreUser = Object.keys(scoresUsers).map(igKey => scoresUsers[igKey]);
  const arrscoreUserSorted = arrScoreUser.sort((a,b)=>a['highest-score']-b['highest-score']).reverse();
  sortUserScore(arrscoreUserSorted); 
};


const sortUserScore =(arrscoreUserSorted)=>{
  let boardScores='';
  arrscoreUserSorted.forEach((score,i,arr)=>{
    boardScores+= `<ul id="score-user">
                      <li>${i+1}) <b></b><label><b>Username:</b> </label>${score['user']},</li>
                      <li><label><b>Highest score:</b></label>${score['highest-score']},</li>
                      <li><b>Date:</b>${score['date']}.</li>
                   </ul>`; 
  document.getElementById("sub-score-board").innerHTML=boardScores;
});
}