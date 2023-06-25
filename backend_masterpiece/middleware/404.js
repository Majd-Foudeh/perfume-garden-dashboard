module.exports = (req,res,next)=>{
    res.status(404).send({err: 'Path not found'});
  };
  