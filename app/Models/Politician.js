'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Politician extends Model {
    
    membership() {
        return this.hasMany('App/Models/Membership')
    }
}

module.exports = Politician
