const calculateDominantCondition = (conditionCounts) => {
    return Object.keys(conditionCounts).reduce((a, b) => conditionCounts[a] > conditionCounts[b] ? a : b);
  };
  
  module.exports = { calculateDominantCondition };
  