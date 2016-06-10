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
    let user = {
        username: 'userCreatedName',
        password: 'userCreatedPassword',
        create: false,
        _id: ''
    }

    spies.restoreAll();
    stubs.restoreAll();
    // Initialize module
    beforeEach(function(done) {
        window.module(PartyAdd);

        if (!user.create) {
            Accounts.createUser({
                username: user.username,
                password: user.password
            }, function(error) {
                user.create = true;
                if (!Meteor.userId()) {
                    Meteor.loginWithPassword(user.username, user.password, function() {
                        user._id = Meteor.userId();
                        done();
                    });
                } else {
                    user._id = Meteor.userId();
                    done();
                }
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
        const doneCallback = function() {};

        // Initialize controller
        beforeEach(function(done) {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyAdd, {
                    $scope: $rootScope.$new(true)
                }, {
                    done: doneCallback
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
                spies.create('insert', Parties, 'insert');
                spies.create('reset', controller, 'reset');

                controller.party = party;

                if (!Meteor.userId()) {
                    Meteor.loginWithPassword(user.username, user.password, function() {
                        controller.submit();
                        done();
                    });
                } else {
                    controller.submit();
                    done();
                }
            });

            afterEach(function(done) {
                if (spies.insert)
                    spies.insert.restore();
                if (spies.reset)
                    spies.reset.restore();
                done();
            });

            it('should insert a new party', function(done) {
                expect(Meteor.userId()).to.not.equal(null);
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
