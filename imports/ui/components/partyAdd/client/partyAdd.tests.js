import {
    Meteor
} from 'meteor/meteor';
import {
    name as PartyAdd
} from '../partyAdd';
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

describe('PartyAdd', function() {
    // Initialize module
    beforeEach(function() {
        window.module(PartyAdd);
        spies.restoreAll();
        stubs.restoreAll();
    });

    // Test inside controller
    describe('controller', function() {
        let controller;
        const party = {
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };
        const user = {
            _id: 'userId'
        }

        // Initialize controller
        beforeEach(function() {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyAdd, {
                    $scope: $rootScope.$new(true)
                });
            });

            if (stubs.user)
                stubs.user.restore();

            stubs.create('user', Meteor, 'user').returns(user);
        });

        describe('reset()', function() {
            it('should clean up party object', function() {
                controller.party = party;
                controller.reset();

                expect(controller.party).to.be.deep.equal({});
            });
        });

        describe('submit()', function() {
            // Monitors insert, reset on submit calls
            beforeEach(function() {
                if (spies.insert)
                    spies.insert.restore();
                if (spies.reset)
                    spies.reset.restore();

                spies.create('insert', Parties, 'insert');
                spies.create('reset', controller, 'reset');

                controller.party = party;

                controller.submit();
            });

            it('should insert a new party', function() {
                expect(spies.insert).to.have.been.calledWith({
                    name: party.name,
                    description: party.description,
                    public: party.public,
                    owner: user._id
                });
            });

            it('should call reset()', function() {
                expect(spies.reset).to.have.been.called;
            });
        });
    });
});
