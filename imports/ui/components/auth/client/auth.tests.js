import {
    name as Auth
} from '../auth';

import 'angular-mocks';

import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

import {
    chai
} from 'meteor/practicalmeteor:chai';

should();


describe('Auth', function() {
    let userCreate = false;
    let userCreatedId;
    const userCreatedName = 'userCreatedName';
    const userCreatedPassword = 'userCreatedPassword';

    beforeEach(function(done) {
        window.module(Auth);
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

    describe('controller', function() {
        let controller;

        beforeEach(function(done) {
            inject(function($rootScope, $componentController) {
                controller = $componentController(Auth, {
                    $scope: $rootScope.$new(true)
                });
            });

            if (Meteor.userId()) {
                Meteor.logout(done);
            } else {
                done();
            }
        });

        afterEach(function(done) {
            if (Meteor.userId()) {
                Meteor.logout(done);
            } else {
                done();
            }
        });

        describe('logout()', function() {
            it('should logout when user is logged', function(done) {
                Meteor.loginWithPassword(userCreatedName, userCreatedPassword, function() {
                    controller.logout(function() {
                        expect(Meteor.userId()).to.be.null;
                        done();
                    });
                });
            });

            it('should do nothing when user is not logged', function(done) {
                controller.logout(function() {
                    expect(Meteor.userId()).to.be.null;
                    done();
                });
            });
        });
    });
});
