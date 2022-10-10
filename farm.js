const functions = {
  getYieldForPlant: (plant, factors) => {
    if (!factors || factors.sun == "medium") {
      return plant.yield;
    } else {
      if (factors.sun == "low") {
        return plant.yield / 2;
      } else {
        return plant.yield + plant.yield / 2;
      }
    }
  },
  getYieldForCrop: (input, factors) =>
    input.numCrops * functions.getYieldForPlant(input.crop, factors),
  getTotalYield: (obj, factors) => {
    let total = 0;
    const { crops } = obj;
    for (crop in crops) {
      total += functions.getYieldForCrop(crops[crop], factors);
    }
    return total;
  },
  getCostsForCrop: (crop) => crop.cost * crop.numCrops,
  getRevenueForCrop: (crop, factors) =>
    functions.getYieldForCrop(crop, factors) * crop.salePrice,
  getProfitForCrop: (crop, factors) =>
    functions.getRevenueForCrop(crop, factors) -
    functions.getCostsForCrop(crop),
  getTotalProfit: (obj, factors) => {
    let total = 0;
    const { crops } = obj;
    for (crop in crops) {
      total += functions.getProfitForCrop(crops[crop], factors);
    }
    return total;
  },
};

module.exports = functions;
