import Common from "../models/common.model.js";

export const addCommon = async (req, res) => {
    try {
      const { Direct, House, Ending } = req.body;
  
      // Make sure these fields exist and are arrays
      if (!Array.isArray(Direct) || !Array.isArray(House) || !Array.isArray(Ending)) {
        return res.status(400).json({
          message: "Direct, House, and Ending must be arrays",
        });
      }
  
      // Make sure exactly 4 items are provided for each array
      if (
        Direct.length !== 4 ||
        House.length !== 4 ||
        Ending.length !== 4
      ) {
        return res.status(400).json({
          message: "Must provide exactly 4 values each for Direct, House, and Ending",
        });
      }
  
      // Remove all existing documents from the collection
      await Common.deleteMany({});
  
      // Create 4 new documents, one for each index
      for (let i = 0; i < 4; i++) {
        await Common.create({
          Direct: Direct[i],
          House: House[i],
          Ending: Ending[i],
        });
      }
  
      return res.status(201).json({
        message: "Successfully added 4 new documents",
      });
    } catch (error) {
      return res.status(404).send("Error " + error);
    }
  };
  

  export const getCommon = async (req, res) => {
    try {
      const data = await Common.find({});
      return res.status(200).json(data);
    } catch (error) {
      return res.status(404).send("Error " + error);
    }
  };
  

