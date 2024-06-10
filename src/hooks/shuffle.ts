export default function shuffle <T extends { type: "old" | "new" }>(
  type: string,
  words: T[],
  frequency:number
): T[] {
  const length=words.length;
  if ((type =="review")) {
    const oldWords = words.filter((w) => (w.type == "old"));
    let oldCurrent = oldWords.length - 1;
    const oldLength=oldWords.length-1;
    let oldRandom;
    while (oldCurrent > -1) {
      oldRandom = Math.floor(oldLength * Math.random()); //随机下标
      [oldWords[oldCurrent], oldWords[oldRandom]] = [oldWords[oldRandom],oldWords[oldCurrent]]; //交换
      oldCurrent--;
    }
    const newWords = words.filter((w) => (w.type == "new"));
    let newCurrent = newWords.length - 1;
    const newLength= newWords.length - 1;
    let newRandom;
    while (oldCurrent > -1) {
      newRandom = Math.floor(newLength * Math.random()); //随机下标
      [newWords[newCurrent], newWords[newRandom]] = [newWords[newRandom],newWords[newCurrent]]; //交换
      newCurrent--;
    }
    return frequency==0?oldWords.concat(newWords):shuffle(type,oldWords.concat(newWords),frequency-1)
  } else {
    let current = words.length - 1;
    let random;
    while (current > -1) {
      random = Math.floor(length * Math.random()); //随机下标
      [words[current], words[random]] = [words[random], words[current]]; //交换
      current--;
    }
    return frequency==0?words:shuffle(type,words,frequency-1)
  }
}
