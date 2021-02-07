export const helpers = {
  shuffle: function(array) {
    let shuffleArr = [...array];
    var currentIndex = shuffleArr.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = shuffleArr[currentIndex];
      shuffleArr[currentIndex] = shuffleArr[randomIndex];
      shuffleArr[randomIndex] = temporaryValue;
    }
    return shuffleArr;
  },
  matrixify: function(array) {
    const newArr = [];
    while(array.length) {
      newArr.push(array.splice(0, 5))
    }
    return newArr;
  }
};

//let mainArray = [...Array(90).keys()].map(num => ++num);

