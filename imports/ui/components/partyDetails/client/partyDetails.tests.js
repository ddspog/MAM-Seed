import {
    name as PartyDetails
} from '../partyDetails';
import {
    Parties
} from '../../../../api/parties';

import 'angular-mocks';

import {
    chai
} from 'meteor/practicalmeteor:chai';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

should();

describe('PartyDetails', function() {
    beforeEach(function() {
        window.module(PartyDetails);
        spies.restoreAll();
    });

    describe('controller', function() {
        let controller;
        const party = {
            _id: 'partyId',
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };

        beforeEach(function() {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyDetails, {
                    $scope: $rootScope.$new(true)
                });
            });
        });

        describe('save()', function() {
            beforeEach(function() {
                if (spies.update)
                    spies.update.restore();
                spies.create('update', Parties, 'update');

                controller.party = party;
                controller.save();
            });

            it('should update a proper party', function() {
                expect(spies.update.lastCall.args[0]).to.be.deep.equal({
                    _id: party._id
                });
            });

            it('should update with proper modifier', function() {
                expect(spies.update.lastCall.args[1]).to.be.deep.equal({
                    $set: {
                        name: party.name,
                        description: party.description,
                        public: party.public,
                        location: party.location
                    }
                });
            });
        });
    });
});
