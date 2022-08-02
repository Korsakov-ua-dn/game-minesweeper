import { getRandomInt } from "./getRandomInt"
import { shuffle } from "./shuffle"

export const getSteps = (aspectRatio, bid, сoefficient) => {
    let multiple = new Set();
    let notMultiple = new Set();

    // вычисляем максимальный размер массива для кратных и не кратных отдельно т.к. общая длинна массива всех ячеек может быть не четной
    const notMultipleMaxSize = Math.ceil(Math.pow(aspectRatio, 2)/2) // если не четная округляем в большую сторону
    const multipleMaxSize = Math.floor(Math.pow(aspectRatio, 2)/2) // если не четная округляем в меньшую сторону
    
    // генерируем набор уникальных значений в заданном диапозоне
    while (multiple.size < multipleMaxSize || notMultiple.size < notMultipleMaxSize) {
        // debugger
        const nextStep = getRandomInt(bid, bid*10*сoefficient)

        if (nextStep % bid && notMultiple.size < notMultipleMaxSize) notMultiple.add(nextStep)
        if (!(nextStep % bid) && multiple.size < multipleMaxSize) multiple.add(nextStep)
       
    }

    // склеиваем оба массива в один => перемешиваем значения
    let result = [...multiple, ...notMultiple]
    shuffle(result)

    return result
}