'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MembershipsSchema extends Schema {
  up () {
    this.create('memberships', (table) => {
      table.increments(),
      table.string('person_id', 50).references('person_id').inTable('politicians')  
      table.string('party_name', 80).notNullable(),
      table.date('start_date'),
      table.date('end_date'),
      table.timestamps()
    })
  }

  down () {
    this.drop('memberships')
  }
}

module.exports = MembershipsSchema
