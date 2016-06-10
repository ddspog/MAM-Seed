import {
    name as PartyRsvp
} from '../partyRsvp';

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

describe('PartyRsvp', function() {
    let user = {
        username: 'userCreatedName',
        password: 'userCreatedPassword',
        create: false,
        _id: ''
    };

    if (!process.env.TESTING)
        process.env.TESTING = 1;

    spies.restoreAll();
    stubs.restoreAll();

    beforeEach(function(done) {
        window.module(PartyRsvp);

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

        beforeEach(function(done) {
            inject(function($rootScope, $componentController) {
                controller = $componentController(PartyRsvp, {
                    $scope: $rootScope.$new(true)
                }, {
                    party
                });
            });
            done();
        });

        describe('answer()', function() {
            beforeEach(function(done) {
                spies.create('callMethod', Meteor, 'call');
                stubs.create('findOne', Parties, 'findOne').returns(party);

                if (!Meteor.userId()) {
                    Meteor.loginWithPassword(user.username, user.password, done);
                } else {
                    done();
                }
            });

            ['yes', 'maybe', 'no'].forEach(function(answer) {
                it(`should call rsvp with '${answer}'`, function(done) {
                    controller.party.owner = user._id;
                    controller.answer(answer);

                    expect(spies.callMethod).to.be.calledWith('rsvp', party._id, answer);

                    spies.callMethod.restore();
                    stubs.findOne.restore();
                    done();
                });
            });
        });
    });
});
