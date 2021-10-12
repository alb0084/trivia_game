
const triviaQuestionsGetHttp = () => {
  return fetch("https://opentdb.com/api.php?amount=10").
    then( response=>{
         return response.json()
        });
    };

const httpDataScorePost=(dataUser)=>{
    return fetch("https://trivia2-7935a-default-rtdb.europe-west1.firebasedatabase.app/scoreUsers.json",{
      method:'POST',
      body:JSON.stringify(dataUser),
      headers:{
        'Content-Type':'application/json',
      },
      mode:'no-cors'
    }
    ).then(response=>{ 
      console.log(response.json())
    });
};

const getDataBoard=()=>{
  return fetch("https://trivia2-7935a-default-rtdb.europe-west1.firebasedatabase.app/scoreUsers.json").
  then( response=>{
       return response.json()
      });
  };
