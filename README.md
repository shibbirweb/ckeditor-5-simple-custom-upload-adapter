[![npm](https://img.shields.io/npm/v/ckeditor-5-simple-custom-upload-adapter.svg)](https://www.npmjs.com/package/ckeditor-5-simple-custom-upload-adapter) [![Downloads](https://img.shields.io/npm/dt/ckeditor-5-simple-custom-upload-adapter.svg)](https://www.npmjs.com/package/ckeditor-5-simple-custom-upload-adapter)

# CKEditor 5 - Simple Custom Upload Adapter
Simplify custom upload adapter for CKEditor. Inspired from: [ckeditor5-upload-adapter](https://github.com/RasmusRummel/ckeditor5-upload-adapter)


## Usage: 

Use In Build
```js
// app.js

import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
//import UploadAdapterPlugin from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter'; // Remove this if it exists
//import CKFinderPlugin from '@ckeditor/ckeditor5-ckfinder/src/ckfinder'; // Remove this if it exists
//import EasyImagePlugin from '@ckeditor/ckeditor5-easy-image/src/easyimage'; // Remove this if it exists
import UploadAdapterPlugin from 'ckeditor-5-simple-custom-upload-adapter'; // Add this
// ...

ClassicEditor.builtinPlugins = [
    EssentialsPlugin,
    AutoformatPlugin,
    BoldPlugin,
    ItalicPlugin,
    BlockQuotePlugin,
    //UploadAdapterPlugin, // Remove this if it exists
    //CKFinderPlugin, // Remove this if it exists
    //EasyImagePlugin, // Remove this if it exists
    ImagePlugin,
    ImageUploadPlugin,
    UploadAdapterPlugin // Add this (the exported classname from ckeditor5-upload-adapter, UploadAdapterPlugin, is the same as from ckeditor5-adapter-ckfinder, however the source files are different)
    // ...
]
```

Use in CKEditor initialization
```js
ClassicEditor.create(document.querySelector('#editor'), {
    //... 
    uploadAdapter: {
        uploadUrl: '/home/ImageUpload', // url to server-side http endpoint // mandatory
        token : '[YOUR-CSRF-TOKEN]', // csrf token for laravel
    }
    // ...
});
```
Backend response setup

```php
function uploadImageForQuestion(Request $request)
    {
        // do your stuff with the files
        $image_url = 'http://example.com/sample.png';

        return json_encode([
            'url' => $image_url, // image url
        ]);
    }
```
