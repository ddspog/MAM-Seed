import {
    UploadFS
} from 'meteor/jalik:ufs';
import {
    ImagesStore
} from './store';
import {
    dataURLToBlob,
    blobToArrayBuffer
} from './helpers';

/**
 * Uploads a new file
 *
 * @param {String}   dataUrl  Data of object uploaded
 * @param {String}   name     Name of object uploaded
 * @param {Function} resolve  Call after sucess
 * @param {Function} reject   Call on error
 */
export function upload(dataUrl, name, resolve, reject) {
    // convert to Blob
    const blob = dataURLToBlob(dataUrl);
    blob.name = name;

    // pick from an object only: name, type and size
    const file = _.pick(blob, 'name', 'type', 'size');

    // convert to ArrayBuffer
    blobToArrayBuffer(blob, (data) => {
        const upload = new UploadFS.Uploader({
            data,
            file,
            store: ImagesStore,
            onError: reject,
            onComplete: resolve
        });

        upload.start();
    }, reject);
}
