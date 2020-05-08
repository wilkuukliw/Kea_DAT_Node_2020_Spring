const { Model } = require('objection');

const Role = require('./Role.js')

class User extends Model {
    static tableName = 'users'


   
    static relationMappings = {   //docummentation on that is vincit.githb.io
        role: {
            relation: Model.BelongsToOneRelation,   // bi-directional
            modelClass: Role,
            join: {
                from: 'users.roleId',
                to: 'roles.id'
            }


        }

    }
}

module.exports = User;