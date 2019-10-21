'use strict'
const Politician = use('App/Models/Politician')
const Membership = use('App/Models/Membership')
const Database = use('Database')


class PoliticiansController {
    async getAllPoliticians() {
        let politiciansWithoutMemberships = await Database.table('politicians').select('first_name', 'last_name', 'image_url', 'person_id');
        let politiciansWithMemberships = [];
        politiciansWithoutMemberships.forEach(politician => {
            getMemberships();
            async function getMemberships() {
                let memberships = await Database.select('party_name', 'start_date', 'end_date').table('memberships').where('person_id', politician.person_id)
                await convertNull(memberships.start_date);
                await convertNull(memberships.end_date);
                function convertNull(data) {data == "NULL" ?  data : "No Information"}
                politician.memberships = memberships;
                politiciansWithMemberships.push(politician)
            };
            console.log(politiciansWithMemberships)
        });
        return getPoliticiansWithMemberships();
    };
    countAllPoliticians() {
        return Politician.getCount();
    };
    searchPoliticians({ request, response }) {
        return
    }
}

module.exports = PoliticiansController
