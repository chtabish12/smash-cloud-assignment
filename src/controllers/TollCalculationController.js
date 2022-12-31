import {
  VehicleEntered,
  VehicleExits,
  TaxCalculation,
} from "../service/TollCalculationService";
const path = require("path");
const fs = require("fs");
const filepath = path.resolve(__dirname, "../../config/database.json");

let response = {
  status: 200,
  message: "OK",
};

class TollCalculationController {
  async TollEntry(req, res) {
    try {
      let request = req.body;
      const result = await VehicleEntered(request);
      response.message = "Vehicle Entry created successfully";
      response.data = result;
      res.status(200).send(response);
    } catch (error) {
      return console.log(error);
    }
  }
  async TollExist(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        response.message = "Wrong id found!";
        response.status = 403;
        res.status(403).send(response);
        return;
      }
      fs.readFile(filepath, async (err, data) => {
        if (err) throw err;
        let index = JSON.parse(data).findIndex((db) => db.id == id);
        if (index === -1) {
          response.message = "No record found!";
          response.status = 404;
          res.status(403).send(response);
          return;
        }
        const request = req.body;
        const result = await VehicleExits(request, index);
        const calculatedTax = await TaxCalculation(result);
        response.message = "Tax calculated successfully!";
        response.status = 200;
        response.tax = calculatedTax;
        res.status(200).send(response);
      });
    } catch (error) {
      return console.log(error);
    }
  }
}

export default new TollCalculationController();
