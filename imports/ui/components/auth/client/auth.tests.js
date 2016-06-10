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
    let user = {
        username: 'userCreatedName',
        password: 'userCreatedPassword',
        create: false,
        _id: ''
    }

    beforeEach(function(done) {
        window.module(Auth);
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

        describe('logout()', function() {
            it('should logout when user is logged', function(done) {
                Meteor.loginWithPassword(user.username, user.password, function() {
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
