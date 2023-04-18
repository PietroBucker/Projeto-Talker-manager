const { readFile } = require('./readFile');

const filterTalker = async (rate, q, watchedAt) => {
  const readFileResp = await readFile();
  const search = readFileResp.filter((byRate, _ind, arr) => {
    if (byRate.talk.rate === Number(rate)) {
      return byRate;
    } 
    if (!rate) {
      return arr;
    }
    return null;
  }).filter((byDate) => byDate.talk.watchedAt.includes(watchedAt))
      .filter((element) => element.name.includes(q));
  return search;
};

module.exports = filterTalker;