const { Model } = require("objection"); // objection is ORM that connect relational data in db to objects in js

class Image extends Model {

    static tableName = 'images'
}

module.exports = Image;