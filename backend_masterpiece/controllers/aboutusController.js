const About = require("../models/aboutusModel");

const addAbout = async (req, res) => {
  try {
    const { text} = req.body;

    const newAbout = await About({
    text:text
    });

    newAbout.save();

    res.status(200).json("about text added successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to add about text" });
  }
};

const updateAbout = async (req, res) => {
  try {
    const {text } = req.body;
    const aboutID  = req.params.id;

    const update = await About.findOneAndUpdate(
      { _id: aboutID },
      {
       text:text
      }
    );

    res.status(201).json('about text updated successfully ')
  } catch (error) {
    res.status(500).json({ error: "Failed to update about text" });
}
};

const showAbout = async(req , res)=>{
    try{
       const about = await About.find({});
       res.json(about);
    }catch(error){

        res.status(500).json({ error: "cannot get about text" });
    }
}

module.exports = {
  addAbout,
  updateAbout,
  showAbout,
};
