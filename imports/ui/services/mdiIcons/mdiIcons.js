import angular from 'angular';
import MDIToUnicode from './mdiIconsTable.json';

class MDIIconsProvider {
/**
  *   Public functions
  */
    constructor() {

        this.table = MDIToUnicode;
    }

    getUnicode(key) {
        return this.table[key];
    }
}

export default MDIIconsProvider;
