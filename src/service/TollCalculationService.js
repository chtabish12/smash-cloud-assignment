import { v1 as uuidv1 } from "uuid";
const path = require("path");
const fs = require("fs");
const filepath = path.resolve(__dirname, "../../config/database.json");
import { BASETAXRATE } from "../../Constants";
import { DistanceCharges, GetDiscount } from "../utils/index";

const VehicleEntered = async (data) => {
  const tollEntry = { id: uuidv1() };
  tollEntry.Interchange = data.Interchange;
  tollEntry.numberPlate = data.numberPlate;
  tollEntry.dateTime = data.dateTime;
  fs.readFile(filepath, (err, data) => {
    if (err) throw err;
    let database = JSON.parse(data);
    database.push(tollEntry);
    let dataToWrite = JSON.stringify(database);
    fs.writeFile(filepath, dataToWrite, (err) => {
      if (err) throw err;
      console.log("Database updated", dataToWrite);
    });
  });
};

const TaxCalculation = async (data) => {
  const baseRate = BASETAXRATE;
  const discountRate = await DistanceCharges(data);
  const grandTotal = discountRate + baseRate;
  const discount = parseFloat(
    ((await GetDiscount(data)) * grandTotal).toFixed(2)
  );
  const totalTax = parseFloat(grandTotal - discount);
  return {
    baseRate,
    discountRate,
    grandTotal,
    discount,
    totalTax,
  };
};

const VehicleExits = async (reqData, index) => {
  const database = fs.readFileSync(filepath, async (err, data) => {
    if (err) throw err;
    return data;
  });
  let DB = JSON.parse(database);
  DB[index]["dateTimeExit"] = reqData.dateTime;
  DB[index]["interchangeExit"] = reqData.Interchange;
  let dataToWrite = JSON.stringify(DB);
  fs.writeFileSync(filepath, dataToWrite, async (err) => {
    if (err) throw err;
    console.log("data has been written");
  });
  return DB[index];
};

module.exports = { VehicleEntered, VehicleExits, TaxCalculation };
