
function divideArrIntoDays(message) {

    
    const patientAnswerList = message.reduce((patientAnswerList, answer) => {
        const date = answer.createdAt.split('T')[0];
        if (!patientAnswerList[date]) {
            patientAnswerList[date] = [];
        }
        patientAnswerList[date].push(answer);
        return patientAnswerList;
      }, {});
      
      // Edit: to add it in the array format instead
      const answerArrays = Object.keys(patientAnswerList).map((date) => {
        return { 
          date,
          answers: patientAnswerList[date]
        };
      });
      
      return answerArrays;
}
