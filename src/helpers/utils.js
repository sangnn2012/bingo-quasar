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
  matrixify: function(array, rowNum) {
    let tempArr = JSON.parse(JSON.stringify(array));
    const newArr = [];
    while(tempArr.length) {
      newArr.push(tempArr.splice(0, rowNum))
    }
    return newArr;
  },
  transpose: function(array) {
    return array[0].map((x,i) => array.map(x => x[i]));
  }
};

//let mainArray = [...Array(90).keys()].map(num => ++num);

