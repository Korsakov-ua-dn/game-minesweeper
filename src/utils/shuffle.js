// рандомно перемешивает значения в массиве
export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
  
      // меняет элементы местами
      [array[i], array[j]] = [array[j], array[i]];
    }
  }