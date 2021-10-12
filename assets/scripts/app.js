let listOfTriviaProperty;
let questionStreamed;
let tag=true
let count = 0;
let questionsNoSelected=[];
const questioAddedList=[];
let newArrayQuestionsSelected=[];
let counterAnswerGiven = 0;
let previousPoint = [];
let finalScoreUser;


const renderQuestions = async (index) => {
      if (counterAnswerGiven<=10) document.getElementById('answer-given-text').textContent = counterAnswerGiven;
      if((index===0 && tag)  || (index===11 && tag)){
         tag = false;
         questionStreamed  = await triviaQuestionsGetHttp();
         listOfTriviaProperty = questionStreamed.results;
         let dataUserScores = await getDataBoard();
         renderUserToBoard(dataUserScores);
      }
      getDataBoard()
      if(index<=9){
            let category = listOfTriviaProperty[index].category;
            let difficulty = listOfTriviaProperty[index].difficulty;
            let question = listOfTriviaProperty[index].question;
            let headerataArray = [category, difficulty, question];
            questionNoSelected = headerataArray[2];
            questionsNoSelected.push(questionNoSelected);

      if(!newArrayQuestionsSelected.includes(questionsNoSelected[questionsNoSelected.length - 1])){
            renderHeadTitles(category, difficulty, question);
            renderSetupRadioButtons(listOfTriviaProperty, index, headerataArray);
            disableNextButon();
      }else{
            renderQuestionsAnswered(index);
           }
      }
 return;
};

const renderQuestionsAnswered=(index)=>{
       //array  previousSelection is instantiated inside vendor.js
       let category = previousSelection[index]['headerData'][0];
       let difficulty = previousSelection[index]['headerData'][1];
       let question = previousSelection[index]['headerData'][2];
       let allAnswer = [previousSelection[index]['listAnsw']];
       let correctAns = previousSelection[index]['corrAnsw'];
       renderHeadTitles(category, difficulty, question);
       radioButtonClicked(allAnswer,correctAns);
};

nextBtn.addEventListener('click',()=>{
      newArrayQuestionsSelected= [];
      count++;
      //array  previousSelection is instantiated inside vendor.js
      let questionsAdded = previousSelection;
      if(count>=11){
       count=0;
       const reducer = (previousValue, currentValue) => previousValue + currentValue;
       const answerGivenCorrect = previousPoint.filter(point=>point>0)
       finalScoreUser = previousPoint.reduce(reducer);
       document.getElementById('final-score').textContent=previousPoint.reduce(reducer);
       document.getElementById('answer-given-correct').textContent=answerGivenCorrect.length+'-->('+previousPoint+')';
       toggleGameModal();
      } 
      questioNoselected = questionsNoSelected[questionsNoSelected.length-1];
      questionsAdded.forEach(question=>{
      newArrayQuestionsSelected.push(question['headerData'][2]);
      });
            
      if (counterAnswerGiven<=10){
            document.getElementById('answer-given-text').textContent = counterAnswerGiven;
      } 
      if(storePoints.length>0 && previousPoint.length===0 && storePoints[counterAnswerGiven].point !== undefined){
            document.getElementById('actual-score-text').textContent = storePoints[counterAnswerGiven].point;
            previousPoint.push(storePoints[counterAnswerGiven].point)
      }else if(previousPoint.length>0 && previousPoint.length<=9 ) {
            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            document.getElementById('actual-score-text').textContent = previousPoint.reduce(reducer);
            previousPoint.push(storePoints && storePoints[counterAnswerGiven].point)
      }

      document.getElementById('correct-answer').innerHTML='';
      counterAnswerGiven++;
      renderQuestions(count);       
});

previousBtn.addEventListener("click", () => {
  count--;
  if (count >= 0) {
    renderQuestionsAnswered(count);
  }
  if (count === -1) count = 0;
  counterAnswerGiven--;
});

backdrop.addEventListener("click",backdropClickHandler);

cancelResultGameModal.addEventListener("click",cancelfinalGameModal);

addBoardSubscription.addEventListener("click",toggleBoardSubscription);

notSentDataToScoreBoardElem.addEventListener("click",cancelSendDataHandler);

sentDataToScoreBoardElem.addEventListener("click",sendDataHandler)

renderQuestions(index=0);

    


