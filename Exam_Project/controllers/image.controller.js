// const db = require("../models");
// const Image = db.images;
// const Op = db.Sequelize.Op;

// exports.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
//     Tutorial.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving images."
//         });
//       });
//   };
  