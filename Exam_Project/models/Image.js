const { Model } = require('objection'); 

class Image extends Model {

    static tableName = 'images'
    
}

module.exports = Image;