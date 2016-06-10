import {
    name as PartyRemove
} from '../partyRemove';
import {
    Parties
} from '../../../../api/parties';

import 'angular-mocks';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('PartyRemove', function() {
    // Initialize module
    beforeEach(function(done) {
        window.module(PartyRemove);
        spies.restoreAll();
        done();
    });

    // Test inside controller
    describe('controller', function() {
        let controller;
        const party = {
            _id: 'partyId'
        };

        // Initialize controller
        beforeEach(function(done) {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyRemove, {
                    $scope: $rootScope.$new(true)
                }, {
                    party
                });
            });
            done();
        });

        describe('remove()', function() {
            // Monitors remove calls
            beforeEach(function(done) {
                if (spies.remove)
                    spies.remove.restore();

                spies.create('remove', Parties, 'remove');
                controller.remove();
                done();
            });

            it('should remove a party', function(done) {
                expect(spies.remove).to.have.been.calledWith(party._id);
                done();
            });
        });
    });
});
