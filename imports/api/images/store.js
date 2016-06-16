import {
    UploadFS
} from 'meteor/jalik:ufs';
import {
    Images,
    Thumbs
} from './collection';

export const ThumbsStore = new UploadFS.store.GridFS({
    collection: Thumbs,
    name: 'thumbs',
    transformWrite: function(from, to, fileId, file) {
        // Resize to 32x32
        const gm = require('gm');

        if (gm) {
            gm(from)
                .resize(32, 32)
                .gravity('Center')
                .extent(32, 32)
                .quality(75)
                .stream()
                .pipe(to);
        } else {
            console.error('Couldn\'t use GM.');
        }
    }
});

export const ImagesStore = new UploadFS.store.GridFS({
    collection: Images,
    name: 'images',
    filter: new UploadFS.Filter({
        contentTypes: ['image/*']
    }),
    copyTo: [
        ThumbsStore
    ]
});
