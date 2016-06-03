import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import {
    Meteor
} from 'meteor/meteor';
import {
    Accounts
} from 'meteor/accounts-base';

import template from './login.html';

import {
    name as Register
} from '../register/register';

import MonitorProvider from '../../services/monitor/monitor';
import MDIIconsProvider from '../../services/mdiIcons/mdiIcons';

class Login {
    constructor($scope, $reactive, $state, MDIIcons) {
        'ngInject';

        this.$state = $state;
        this.MDIIcons = MDIIcons;

        $reactive(this).attach($scope);

        this.credentials = {
            email: '',
            password: ''
        };

        this.error = '';
    }

    getIcon(name){
        if(name)
          return this.MDIIcons.getUnicode(name);
    }

    login() {
        Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                } else {
                    this.$state.go('parties');
                }
            })
        );
    }

    loginGoogle() {
        Meteor.loginWithGoogle({
            requestPermissions: ['profile', 'email']
        }, (err) => {
            if (err) {
                this.error = err;
            } else {
                this.$state.go('parties');
            }
        });
    }

    loginFacebook() {
        Meteor.loginWithFacebook({
            requestPermissions: ['public_profile', 'email']
        }, (err) => {
            if (err) {
                this.error = err;
            } else {
                this.$state.go('parties');
            }
        });
    }

    isLoginServicesReady() {
        if (Accounts.loginServicesConfigured()) {
            return true;
        } else {
            return false;
        }
    }
}

const name = 'login';

// create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Login
    })
    .config(config)
    .service('Monitor', MonitorProvider)
    .service('MDIIcons', MDIIconsProvider)
    .run(run);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('login', {
        url: '/login',
        template: '<login></login>'
    });
}

// Fix to https://github.com/angular/material/issues/1376
function run(Monitor) {
    'ngInject';

    Monitor.whenAutofill('input.fix-float', (elem) => {
        elem.parent().addClass('md-input-has-value');
    });
}
