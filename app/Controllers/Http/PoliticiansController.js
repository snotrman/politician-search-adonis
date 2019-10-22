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
                await convertNullToText(memberships.start_date);
                await convertNullToText(memberships.end_date);
                await humanizePartyName(memberships.party_name);
                politician.memberships = memberships;
                politiciansWithMemberships.push(politician)
            };
        });
        function convertNullToText(data) {data == "NULL" ?  data : "No Information"}
        function humanizePartyName(partyName) {
            var frags = partyName.split('_');
            for (i = 0; i < frags.length; i++) {
                frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
            }
            var removeMark = frags.join(' ').split('&#34;');
            for (i = 0; i < removeMark.length; i++) {
                removeMark[i] = removeMark[i].charAt(0).toUpperCase() + removeMark[i].slice(1);
            }
            return removeMark.join(' ');
        };
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
