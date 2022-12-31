import {
  PKM,
  DAYS,
  Distance,
  SAT_SUN_DIST_RATE,
  NATIONAL_HOLIDAYS_DIST_RATE,
  EVEN_ODD_DIST_RATE,
} from "../../Constants";

const DistanceCharges = async (data) => {
  let distanceCharges = parseFloat(
    (
      PKM *
      (Distance[data.interchangeExit] - Distance[data.Interchange])
    ).toFixed(2)
  );
  let today = DAYS[new Date(data.dateTimeExit).getDay()];
  if (["Saturday", "Sunday"].includes(today)) {
    return SAT_SUN_DIST_RATE * distanceCharges;
  }
  return distanceCharges;
};

const GetDiscount = async (data) => {
  const nationalHolidays =
    GetDate(data.dateTime) + " " + GetMonthFromGivenDate(data.dateTime);
  const today = DAYS[new Date(data.dateTime).getDay()];
  const vehicleNum = data.numberPlate.split("-")[1];
  if (["23 March", "14 August", "25 December"].includes(nationalHolidays)) {
    return NATIONAL_HOLIDAYS_DIST_RATE;
  }
  if (
    (["Monday", "Wednesday"].includes(today) && vehicleNum % 2 === 0) ||
    (["Tuesday", "Thursday"].includes(today) && vehicleNum % 2 !== 0)
  ) {
    return EVEN_ODD_DIST_RATE;
  }
  return 0;
};

const GetDate = (date) => {
  return new Date(date).getUTCDate();
};

const GetMonthFromGivenDate = (date) => {
  return new Date(date).toLocaleString("default", { month: "long" });
};

module.exports = { DistanceCharges, GetDiscount };
