import {
    name as PartyRemove
} from '../partyRemove';
import {
    Parties
} from '../../../../api/parties';
import 'angular-mocks';

describe('PartyRemove', function() {
    // Initialize module
    beforeEach(function() {
        window.module(PartyRemove);
    });

    // Test inside controller
    describe('controller', function() {
        let controller;
        const party = {
            _id: 'partyId'
        };

        // Initialize controller
        beforeEach(function() {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyRemove, {
                    $scope: $rootScope.$new(true)
                }, {
                    party
                });
            });
        });

        describe('remove()', function() {
            // Monitors remove calls
            beforeEach(function() {
                spyOn(Parties, 'remove');
                controller.remove();
            });

            it('should remove a party', function() {
                expect(Parties.remove).toHaveBeenCalledWith(party._id);
            });
        });
    });
});
