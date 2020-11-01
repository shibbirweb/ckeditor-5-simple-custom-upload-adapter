import _axios from 'axios';

export default class UploadAdapter {
    constructor(loader, configuration, t) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this.validateConfig(configuration)
        this.configuration = configuration
        this.t = t
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                // configure axios
                this.configureAxios();
                // prepare form data
                const data = this.prepareFormData(file)
                // send request
                this.send(data, resolve, reject);
            }));
    }

    // Aborts the upload process.
    abort() {
        // Abort
        let cancelUpload = this.cancelUpload
        cancelUpload();
    }

    /**
     * Configure axios
     */
    configureAxios() {
        const {token} = this.configuration;

        this.axios = _axios.create({
            headers: {
                'X-CSRF-TOKEN': token
            }
        });
    }

    /**
     * Show validation error message
     * @param configuration
     */
    validateConfig(configuration) {
        if (typeof configuration !== 'object' || configuration === null) {
            console.info('Upload adapter configuration should be an object')
            console.error('CKEditor Upload file configuration is not valid.')
        }
    }

    /**
     * Prepare form data
     * @param file
     * @returns {FormData}
     */
    prepareFormData(file) {
        const data = new FormData()
        data.append('image', file)
        return data;
    }

    send(data, resolve, reject) {
        const loader = this.loader;
        const {uploadUrl} = this.configuration;
        if (!uploadUrl){
            console.error('CKEditor5 Upload FileAdapter : uploadUrl is not defined.')
        }

        const axios = this.axios;

        // cancel upload token
        const CancelToken = _axios.CancelToken
        let cancelUpload = this.cancelUpload

        axios.post(uploadUrl, data, {
            onUploadProgress: progressEvent => {
                loader.uploadTotal = progressEvent.total
                loader.uploaded = progressEvent.loaded
            },
            cancelToken: new CancelToken(function executor(c){
                cancelUpload = c
            })
        })
            .then(response => {
                resolve({
                    default: response.data.url
                })
            }).catch(error => {
            let message = 'Something went wrong. Try again later'
            //Unprocessable Entity
            if (error.response && error.response.status === 422) {
                message = error.response.data.errors.image[0]
            }
            return reject(message)
        })
    }
}
