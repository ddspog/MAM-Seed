import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import {
    Counts
} from 'meteor/tmeasday:publish-counts';

import partiesListTemplate from './partiesList.html';
import pageButtonTemplate from './pageButton.html';

import {
    Parties
} from '../../../api/parties/index';
import {
    name as PartiesSort
} from '../partiesSort/partiesSort';
import {
    name as PartiesMap
} from '../partiesMap/partiesMap';
import {
    name as PartyAddButton
} from '../partyAddButton/partyAddButton';
import {
    name as PartyRemove
} from '../partyRemove/partyRemove';
import {
    name as PartyCreator
} from '../partyCreator/partyCreator';
import {
    name as PartyRsvp
} from '../partyRsvp/partyRsvp';
import {
    name as PartyRsvpsList
} from '../partyRsvpsList/partyRsvpsList';

import {
    name as MDIIconFilter
} from '../../filters/mdiIcon/mdiIconFilter';

/**
 *  PartiesList Component
 */
class PartiesList {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);

        this.perPage = 3;
        this.page = 1;
        this.sort = {
            name: 1
        };
        this.searchString = '';

        this.subscribe('parties', () => [{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage),
            sort: this.getReactively('sort')
        }, this.getReactively('searchText')]);

        this.subscribe('users');

        this.helpers({
            parties() {
                return Parties.find({}, {
                    sort: this.getReactively('sort')
                });
            },
            partiesCount() {
                return Counts.get('numberOfParties');
            },
            isLoggedIn() {
              return !!Meteor.userId();
            },
            currentUserId() {
              return Meteor.userId();
            }
        });
    }

    isOwner(party) {
      return this.isLoggedIn && party.owner === this.currentUserId;
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    sortChanged(sort) {
        this.sort = sort;
    }
}

const name = 'partiesList';

// Create a module
export default angular.module(name, [
        angularMeteor,
        uiRouter,
        utilsPagination,
        PartiesSort,
        PartiesMap,
        PartyAddButton,
        PartyRemove,
        PartyCreator,
        PartyRsvp,
        PartyRsvpsList,
        MDIIconFilter
    ]).component(name, {
        template: partiesListTemplate,
        controllerAs: name,
        controller: PartiesList
    })
    .config(config);

function config($stateProvider, paginationTemplateProvider) {
    'ngInject';

    $stateProvider
        .state('parties', {
            url: '/parties',
            template: '<parties-list></parties-list>'
        });

    paginationTemplateProvider.setString(pageButtonTemplate);
}
