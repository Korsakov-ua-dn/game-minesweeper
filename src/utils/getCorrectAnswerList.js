
export const getCorrectAnswerList = (listOfSteps, bid) => {
    return listOfSteps.filter(number => number % bid)
}