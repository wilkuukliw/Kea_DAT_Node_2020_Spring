const { Model } = require('objection');  //ORM that connect relational data in db to objects in js



class Photo extends Model {

    static tableName = 'photos';

    static relationMappings = {

    }

}