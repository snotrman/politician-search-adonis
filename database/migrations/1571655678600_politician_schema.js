'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PoliticianSchema extends Schema {
  up () {
    this.create('politicians', (table) => {
      table.increments(),
      table.string('first_name', 80).notNullable(),
      table.string('last_name', 80).notNullable(),
      table.string('image_url'),
      table.string('person_id').notNullable().unique(),
      table.timestamps()
    })
  }

  down () {
    this.drop('politicians')
  }
}

module.exports = PoliticianSchema
