import {
    Meteor
} from 'meteor/meteor';

export function ConfigGoogleMap(uiGmapGoogleMapApiProvider) {
    'ngInject';

    Meteor.call('getGoogleAPIBrowserConfiguration', (error, result) => {
        if (error) {
            if(Meteor.isProduction)
              console.error('Oops, unable to get API Key!');
        } else {
            uiGmapGoogleMapApiProvider.configure(result);
        }
    });
}
