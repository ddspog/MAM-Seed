import {
    name as PartyRemove
} from '../partyRemove';
import {
    Parties
} from '../../../../api/parties';
import 'angular-mocks';

describe('PartyRemove', () => {
    // Initialize module
    beforeEach(() => {
        window.module(PartyRemove);
    });

    // Test inside controller
    describe('controller', () => {
        let controller;
        const party = {
            _id: 'partyId'
        };

        // Initialize controller
        beforeEach(() => {
            inject(($rootScope, $componentController) => {
                controller = $componentController(PartyRemove, {
                    $scope: $rootScope.$new(true)
                }, {
                    party
                });
            });
        });

        describe('remove()', () => {
            // Monitors remove calls
            beforeEach(() => {
                spyOn(Parties, 'remove');
                controller.remove();
            });

            it('should remove a party', () => {
                expect(Parties.remove).toHaveBeenCalledWith(party._id);
            });
        });
    });
});
