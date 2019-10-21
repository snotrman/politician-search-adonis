'use strict'

/*
|--------------------------------------------------------------------------
| MembershipSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const request = require('request');
const Membership = use('App/Models/Membership')

class MembershipSeeder {
  async run() {
    const politiciansUrl = "https://cdn.rawgit.com/everypolitician/everypolitician-data/6e83936a571e4c050a321390930985e07c917848/data/Latvia/Saeima/ep-popolo-v1.0.json";
    request(politiciansUrl, (err, res, body) => {
      let data = JSON.parse(body);
      let memberships = data.memberships;
      memberships.forEach(membership => {
        const newMembership = Membership.findOrCreate(
          { person_id: membership.person_id },
          {
            party_name: membership.on_behalf_of_id,
            person_id: membership.person_id,
            start_date: membership.start_date,
            end_date: membership.end_date,
          }
        )
      });
    });
  }
}
module.exports = MembershipSeeder
