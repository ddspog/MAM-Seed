import {
    name as PartyUninvited
} from '../partyUninvited';

import 'angular-mocks';

import {
    Meteor
} from 'meteor/meteor';
import {
    Parties
} from '../../../../api/parties/collection';

import {
    sinon
} from 'meteor/practicalmeteor:sinon';

describe('PartyUninvited', function() {
    let user = {
        username: 'userCreatedName',
        password: 'userCreatedPassword',
        create: false,
        _id: ''
    }

    if (!process.env.TESTING)
        process.env.TESTING = 1;

    spies.restoreAll();
    stubs.restoreAll();

    beforeEach(function(done) {
        window.module(PartyUninvited);

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

    describe('controller', function() {
        let controller;
        let party = {
            _id: 'partyId',
            name: 'partyName',
            description: 'partyDescription',
            owner: user._id
        };
        let userNotInvited = {
            username: 'userNotInvitedName',
            password: 'userNotInvitedPassword',
            emails: [{
                address: 'userNotInvitedEmail'
            }],
            _id: 'userNotInvitedId'
        }

        beforeEach(function(done) {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyUninvited, {
                    $scope: $rootScope.$new(true)
                }, {
                    party
                });
            });
            done();
        });

        describe('invite()', function() {
            beforeEach(function(done) {
                spies.create('callMethod', Meteor, 'call');
                stubs.create('findOne', Parties, 'findOne').returns(party);
                stubs.create('usersFindOne', Meteor.users, 'findOne')
                  .returns(userNotInvited);

                if (!Meteor.userId()) {
                    Meteor.loginWithPassword(user.username, user.password, done);
                } else {
                    done();
                }
            });

            it('should call invite with user not invited', function(done) {
                controller.party.owner = user._id;
                controller.invite(userNotInvited);

                expect(spies.callMethod).to.be.calledWith('invite', party._id, userNotInvited._id);

                spies.callMethod.restore();
                stubs.findOne.restore();
                stubs.usersFindOne.restore();
                done();
            });
        });
    });
});
