'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Membership extends Model {
    politician() {
        return this.belongsTo('App/Models/Politician')
    }
}

module.exports = Membership
