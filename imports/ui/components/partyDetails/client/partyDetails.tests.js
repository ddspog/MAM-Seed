import {
    name as PartyDetails
} from '../partyDetails';
import {
    Parties
} from '../../../../api/parties';
import 'angular-mocks';

describe('PartyDetails', function() {
    beforeEach(function() {
        window.module(PartyDetails);
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
                spyOn(Parties, 'update');
                controller.party = party;
                controller.save();
            });

            it('should update a proper party', function() {
                expect(Parties.update.calls.mostRecent().args[0]).toEqual({
                    _id: party._id
                });
            });

            it('should update with proper modifier', function() {
                expect(Parties.update.calls.mostRecent().args[1]).toEqual({
                    $set: {
                        name: party.name,
                        description: party.description,
                        public: party.public
                    }
                });
            });
        });
    });
});
