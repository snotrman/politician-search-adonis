'use strict'

/*
|--------------------------------------------------------------------------
| PoliticianSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const request = require('request');
const Politician = use('App/Models/Politician')

class PoliticianSeeder {
  async run() {
    const politiciansUrl = "https://cdn.rawgit.com/everypolitician/everypolitician-data/6e83936a571e4c050a321390930985e07c917848/data/Latvia/Saeima/ep-popolo-v1.0.json";
    request(politiciansUrl, (err, res, body) => {
      let data = JSON.parse(body);
      let politicians = data.persons;
      politicians.forEach(politician => {
        const newPolitician = Politician.findOrCreate(
          { person_id: politician.id },
          {
            first_name: politician.given_name,
            last_name: politician.family_name,
            image_url: politician.image,
            person_id: politician.id,
          }
        )
      });
    });
  }
}

module.exports = PoliticianSeeder
