export const titlize = (str) => str.toLowerCase().replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatize = (str) => str.toLowerCase().replace(/[^0-9a-z]/g, ".").replace(/\.+/g, '.').trim('.');

export const getTimestamp = () => Date.now();

export const getHumanTime = (ts = Date.now()) => new Date(ts).toJSON().substring(11, 19)

export const getHumanDate = (ts = Date.now()) => new Date(ts).toJSON().substring(0, 10)

export const getDatatime = (ts = Date.now()) => new Date(ts).toJSON().substring(0, 19).replace(/[-:]/gi, '').replace(/T/gi, '-');

export const getDatatimeJSON = (ts = Date.now()) => new Date(ts).toJSON()

export const getDatatimeUTC = (ts = Date.now()) => new Date(ts).toLocaleString();

export const getUsername = (str) => {
    if (str.indexOf("@") !== -1) return str.split("@")[0]
    return str;
}

export const humanSize = (bytes) => {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
}

export const getBrowserLanguage = () => navigator.language || navigator.userLanguage;

export const getBrowserAgent = () => navigator.userAgent;

export const navTo = (url) => location.href = url;

export const dialogPrompt = (question, defaultAnswer = '') => {
    return new Promise((resolve, reject) => {
        const userAnswer = window.prompt(question, defaultAnswer);
        if (!userAnswer) return reject("dialogPrompt: user as enter a invalid answer");
        resolve(userAnswer);
    });
}

export const dialogConfirm = (question) => {
    return new Promise((resolve, reject) => {
        const confirm = window.confirm(question)
        if (!confirm) return reject("dialogConfirm: cancel by user");
        resolve(confirm);
    });
}

export const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const randomStr = (length = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    for (const i = 0, str = ''; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

export const forceDownload = (fileUrl, fileName = '') => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
}


const audioMimeTypesMap = {
    'wav': ["audio/wave",
        "audio/wav",
        "audio/x-wav",
        "audio/x-pn-wav"
    ],
    'aac': ["audio/aac", "audio/x-aac"],
    'm4a': ["audio/mp4", "audio/m4a", "audio/x-m4a"],
    'ogg': ['video/ogg',
        'audio/ogg',
        "audio/ogg; codecs=opus",
        "audio/ogg; codecs=vorbis"
    ],
    'mp3': ['audio/mpeg',
        'audio/mp3', 
        'audio/x-mp3', 
        'audio/x-mpeg'
    ],
    'webm': ["video/webm",
        "audio/webm",
        "audio/webm; codecs=opus",
        "audio/webm; codecs=vorbis"
    ],
    'flac': ['audio/flac',
        'audio/x-flac'
    ]
};

export const getAudioMimeTypes = () => {
    return [].concat(...Object.values(audioMimeTypesMap))
}

export const getAudioTypeExtention = (mimeType) => {
    const index = Object.values(audioMimeTypesMap).findIndex(item => item.indexOf(mimeType) !== -1)
    return Object.keys(audioMimeTypesMap)[index]
}

export const getAudioSupportedPlayTypes = () => {
    getAudioMimeTypes().map(type => {
        console.log("canPlay " + type + ": " + (new Audio().canPlayType(type) ? "Maybe" : "No"));
    })
}

export const getAudioSupportedRecorderTypes = () => {
    getAudioMimeTypes().map(type => {
        console.log("canRecord " + type + ": " + (MediaRecorder.isTypeSupported(type) ? "Maybe" : "No"));
    })
}

/* var types = [
    "audio/ogg",
    "video/ogg",
    "application/ogg",
    "audio/flac",
    "audio/x-flac",
    "audio/ogg; codecs=opus",
    "audio/wave",
    "audio/wav",
    "audio/x-wav",
    "audio/x-pn-wav",
    "audio/webm",
    "audio/webm; codecs=opus",
    "video/webm",
    "video/webm; codecs=vp8",
    "video/webm; codecs=daala",
    "video/webm; codecs=h264",
    "video/mp4",
    "video/mpeg"
]; */