import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';

import UploadAdapter from './UploadAdapter';

export default class UploadAdapterPlugin extends Plugin {
    static get requires() {
        return [FileRepository];
    }

    init() {
        const configuration = this.editor.config.get('uploadAdapter');
        const t = this.editor.t;

        if (!configuration) {
            console.warn('CKEditor5 Upload FileAdapter : configuration is not defined.');
            console.warn('View configuration documentation: https://github.com/shibbirweb/ckeditor-5-simple-custom-upload-adapter');
            return;
        }

        this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, configuration, t);
        };
    }
}
