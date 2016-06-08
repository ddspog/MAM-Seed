import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

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
    let userCreate = false;
    let userCreatedId;
    const userCreatedName = 'userCreatedName';
    const userCreatedPassword = 'userCreatedPassword';

    // Initialize module
    beforeEach(function(done) {
        window.module(PartyAdd);

        spies.restoreAll();
        stubs.restoreAll();

        if (!userCreate) {
            Accounts.createUser({
                username: userCreatedName,
                password: userCreatedPassword
            });
            userCreate = true;
            Meteor.loginWithPassword(userCreatedName, userCreatedPassword, function() {
                userCreatedId = Meteor.userId();
                Meteor.logout(done);
            });
        } else {
            done();
        }
    });

    // Test inside controller
    describe('controller', function() {
        let controller;

        const party = {
            name: 'Foo',
            description: 'Birthday of Foo',
            public: true
        };
        const donePartyAdd = function() {};

        // Initialize controller
        beforeEach(function(done) {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyAdd, {
                    $scope: $rootScope.$new(true)
                }, {
                    done: donePartyAdd
                });
            });
            done();
        });

        describe('reset()', function() {
            it('should clean up party object', function(done) {
                controller.party = party;
                controller.reset();

                expect(controller.party).to.be.deep.equal({});
                done();
            });
        });

        describe('submit()', function() {
            // Monitors insert, reset on submit calls
            beforeEach(function(done) {
                if (spies.insert)
                    spies.insert.restore();
                if (spies.reset)
                    spies.reset.restore();

                spies.create('insert', Parties, 'insert');
                spies.create('reset', controller, 'reset');

                controller.party = party;

                Meteor.loginWithPassword(userCreatedName, userCreatedPassword, function() {
                    controller.submit();
                    done();
                });
            });

            afterEach(function(done) {
                if (Meteor.userId()) {
                    Meteor.logout(done);
                } else {
                    done();
                }
            });

            it('should insert a new party', function(done) {
                expect(spies.insert).to.have.been.calledWith({
                    name: party.name,
                    description: party.description,
                    public: party.public,
                    owner: Meteor.userId()
                });
                done();
            });

            it('should call reset()', function(done) {
                expect(spies.reset).to.have.been.called;
                done();
            });
        });
    });
});
