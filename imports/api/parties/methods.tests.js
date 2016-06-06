import {
    invite,
    rsvp
} from './methods';
import {
    Parties
} from './collection';

import {
    Meteor
} from 'meteor/meteor';

if (Meteor.isServer) {
    describe('Parties / Methods', function() {
        describe('invite', function() {
            function loggedIn(userId = 'userId') {
                return {
                    userId
                };
            }

            it('should be called from Method', function() {
                spyOn(invite, 'apply');

                try {
                    Meteor.call('invite');
                } catch (e) {}

                expect(invite.apply).toHaveBeenCalled();
            });

            it('should fail on missing partyId', function() {
                expect(function() {
                    invite.call({});
                }).toThrowError();
            });

            it('should fail on missing userId', function() {
                expect(function() {
                    invite.call({}, 'partyId');
                }).toThrowError();
            });

            it('should fail on not logged in', function() {
                expect(function() {
                    invite.call({}, 'partyId', 'userId');
                }).toThrowError(/logged in/i);
            });

            it('should look for a party', function() {
                const partyId = 'partyId';
                spyOn(Parties, 'findOne');

                try {
                    invite.call(loggedIn(), partyId, 'userId');
                } catch (e) {}

                expect(Parties.findOne).toHaveBeenCalledWith(partyId);
            });

            it('should fail if party does not exits', function() {
                spyOn(Parties, 'findOne').and.returnValue(undefined);

                expect(function() {
                    invite.call(loggedIn(), 'partyId', 'userId');
                }).toThrowError(/404/);
            });

            it('should fail if logged in user is not the owner', function() {
                spyOn(Parties, 'findOne').and.returnValue({
                    owner: 'notUserId'
                });

                expect(function() {
                    invite.call(loggedIn(), 'partyId', 'userId');
                }).toThrowError(/404/);
            });

            it('should fail on public party', function() {
                spyOn(Parties, 'findOne').and.returnValue({
                    owner: 'userId',
                    public: true
                });

                expect(function() {
                    invite.call(loggedIn(), 'partyId', 'userId');
                }).toThrowError(/400/);
            });

            it('should NOT invite user who is the owner', function() {
                spyOn(Parties, 'findOne').and.returnValue({
                    owner: 'userId'
                });
                spyOn(Parties, 'update');

                invite.call(loggedIn(), 'partyId', 'userId');

                expect(Parties.update).not.toHaveBeenCalled();
            });

            it('should NOT invite user who has already invited', function() {
                spyOn(Parties, 'findOne').and.returnValue({
                    owner: 'userId',
                    invited: ['invitedId']
                });
                spyOn(Parties, 'update');

                invite.call(loggedIn(), 'partyId', 'invitedId');

                expect(Parties.update).not.toHaveBeenCalled();
            });

            it('should invite user who has not been invited and is not the owner', function() {
                const partyId = 'partyId';
                const userId = 'userId';
                spyOn(Parties, 'findOne').and.returnValue({
                    owner: 'userId',
                    invited: ['invitedId']
                });
                spyOn(Parties, 'update');
                spyOn(Meteor.users, 'findOne').and.returnValue({});

                invite.call(loggedIn(), partyId, userId);

                expect(Parties.update).toHaveBeenCalledWith(partyId, {
                    $addToSet: {
                        invited: userId
                    }
                });
            });
        });

        describe('rsvp', function() {
            function loggedIn(userId = 'userId') {
                return {
                    userId
                };
            }

            it('should be called from Method', function() {
                spyOn(rsvp, 'apply');

                try {
                    Meteor.call('rsvp');
                } catch (e) {}

                expect(rsvp.apply).toHaveBeenCalled();
            });

            it('should fail on missing partyId', function() {
                expect(function() {
                    rsvp.call({});
                }).toThrowError();
            });

            it('should fail on missing rsvp', function() {
                expect(function() {
                    rsvp.call({}, 'partyId');
                }).toThrowError();
            });

            it('should fail if not logged in', function() {
                expect(function() {
                    rsvp.call({}, 'partyId', 'rsvp');
                }).toThrowError(/403/);
            });

            it('should fail on wrong answer', function() {
                expect(function() {
                    rsvp.call(loggedIn(), 'partyId', 'wrong');
                }).toThrowError(/400/);
            });

            ['yes', 'maybe', 'no'].forEach(function(answer) {
                it(`should pass on '${answer}'`, function() {
                    expect(function() {
                        rsvp.call(loggedIn(), 'partyId', answer);
                    }).not.toThrowError(/400/);
                });
            });

            // TODO: more tests
        });
    });
}
