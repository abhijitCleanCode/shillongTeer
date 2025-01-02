import Previous from "../models/previous.model.js";

export const addAndUpdateFRSR = async (req, res) => {
    try {
      const { FR, SR } = req.body;
  
      // If both FR and SR are missing, return an error
      if (!FR && !SR) {
        return res.status(400).json({ message: "No FR or SR in request body" });
      }
  
      // Get today's date in DD/MM/YYYY format
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const yyyy = now.getFullYear();
      const currentDate = `${dd}/${mm}/${yyyy}`;
  
      // Check for existing record for today's date
      let existingDoc = await Previous.findOne({ Date: currentDate });
  
      if (existingDoc) {
        // Update only the fields that are provided in the body
        if (FR !== undefined) existingDoc.FR = FR;
        if (SR !== undefined) existingDoc.SR = SR;
  
        await existingDoc.save();
        return res.status(200).json({
          message: `Data updated for ${currentDate}`,
          doc: existingDoc,
        });
      } else {
        // Create a new record
        const newDoc = await Previous.create({
          Date: currentDate,
          FR: FR || "", // if FR is missing, default to empty string
          SR: SR || "", // if SR is missing, default to empty string
        });
        return res.status(201).json({
          message: `Data added for ${currentDate}`,
          doc: newDoc,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  };
  

export const getPreviousDay = async (req, res) => {
    try {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        const Daydata = await Previous.findOne({ Date: formattedDate, Timing: "Day" })
        const Nightdata = await Previous.findOne({ Date: formattedDate, Timing: "Night" })
        return res.status(200).send({ Daydata, Nightdata })
    } catch (error) {
        return res.status(404).send("Error " + error)
    }
}

export const getPrevious = async (req, res) => {
    try {
        const data = await Previous.find({})
        if (!data) return res.status(404).send("Somthing wrong")
        return res.status(200).send(data)
    } catch (error) {
        return res.status(404).send("Error " + error)
    }
}

export const addManyPreviousResult = async (req, res) => {
  try {
    const startDate = new Date("2024-12-01");
    const endDate = new Date("2025-01-01");

    const dates = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = d.getFullYear();
      dates.push(`${day}/${month}/${year}`);
    }

    // Generate dummy FR and SR values for each date
    const results = dates.map((date) => ({
      Date: date,
      FR: Math.floor(Math.random() * 100).toString().padStart(2, "0"), // Random 2-digit number
      SR: Math.floor(Math.random() * 100).toString().padStart(2, "0"), // Random 2-digit number
    }));

    // Add the results to the database
    await Previous.insertMany(results);

    return res.status(201).json({
      message: "Previous results added successfully",
      results,
    });
  } catch (error) {
    console.error("Error in addManyPreviousResult:", error);
    return res.status(500).json({
      message: "Failed to add previous results",
      error: error.message,
    });
  }
};