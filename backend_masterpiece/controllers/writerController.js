const Writer = require("../models/writerModel");

const addWriter = async (req, res) => {
  try {
    const { name, job , image , description , link} = req.body;

    const newWriter = await Writer({
      name: name,
      job: job,
      image: image,
      description: description,
      link:link
    });

    newWriter.save();

    res.status(200).json("writer added successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to add writer" });
  }
};

const updateWriter = async (req, res) => {
  try {
    const { name, job , image , description , link} = req.body;
    const writerID  = req.params.id;

    const update = await Writer.findOneAndUpdate(
      { _id: writerID },
      {
        name: name,
        job: job,
        image: image,
        description: description,
        link:link
      }
    );

    res.status(201).json('writer updated successfully ')
  } catch (error) {
    res.status(500).json({ error: "Failed to update writer info" });
}
};

const showWriters = async(req , res)=>{
    try{
       const writers = await Writer.find({});
       res.json(writers);
    }catch(error){

        res.status(500).json({ error: "cannot get quotes" });
    }
}

module.exports = {
    addWriter,
  updateWriter,
  showWriters,
};
