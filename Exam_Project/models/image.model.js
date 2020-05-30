// const { Model } = require('objection');  //ORM that connect relational data in db to objects in js


// class Photo extends Model {

//     static tableName = 'photos'

// }

// module.exports = Photo;

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {

      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.BLOB("long"),
      },
    });
  
    return Image;
  };
  