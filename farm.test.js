const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factor: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const environmentFactors = {
    sun: "low",
  };
  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });

  test("Get yield for plant with environment factor", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });

  test("Get yield for plant with medium sun environment factor", () => {
    expect(getYieldForPlant(corn, { sun: "medium" })).toBe(30);
  });

  test("Get yield for plant with high sun environment factor", () => {
    expect(getYieldForPlant(corn, { sun: "high" })).toBe(45);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
  test("get yield for crop with factor", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };

    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(150);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });

  test("Calculate total yield for multiple crops and environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops }, environmentFactors)).toBe(11.5);
  });
});

describe("getCostsForCrop", () => {
  test("Calculate the cost for a crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 2,
    };
    expect(getCostsForCrop(input)).toBe(20);
  });
});

describe("getRevenueForCrop", () => {
  test("Calculate the revenue for a crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 2,
      salePrice: 2,
    };
    expect(getRevenueForCrop(input)).toBe(60);
  });

  test("Calculate the revenue for a crop with environement factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };

    const input = {
      crop: corn,
      numCrops: 10,
      cost: 2,
      salePrice: 2,
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(30);
  });
});

describe("getProfitForCrop", () => {
  test("calculate the profit for a crop", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 2,
      salePrice: 2,
    };
    expect(getProfitForCrop(input)).toBe(40);
  });
  test("Calculate the profit for a crop with environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const environmentFactors = {
      sun: "low",
    };
    const input = {
      crop: corn,
      numCrops: 10,
      cost: 2,
      salePrice: 2,
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(10);
  });
});

describe("getTotalProfit", () => {
  test("calculate the profit for multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 3,
    };
    const crops = [
      { crop: corn, numCrops: 10, cost: 2, salePrice: 2 },
      { crop: pumpkin, numCrops: 10, cost: 2, salePrice: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(80);
  });
  test("Calculate the profit for multiple crops and environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 3,
      factor: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
    };
    const crops = [
      { crop: corn, numCrops: 10, cost: 2, salePrice: 2 },
      { crop: pumpkin, numCrops: 10, cost: 2, salePrice: 2 },
    ];
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(20);
  });
});
