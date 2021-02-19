import { toast } from 'react-toastify';

//#region - functions - 

// get files from event
function getFiles(event) {
    if (event.type === "drop") {
        return event.dataTransfer.files;
    } else {
        return event.target.files;
    }
}

// remove files from event
function removeFiles(event) {
    if (event.type === "drop") {
        event.dataTransfer.clearData();
    } else {
        event.target.value = null;
    }
}


//#endregion

//#region - export - 

export const checkType = (event) => {
    let files = getFiles(event);
    let err = '';

    const types = ['image/png', 'image/jpg', 'image/jpeg'];

    for (let index = 0; index < files.length; index++) {
        const element = files[index];

        if (types.every(type => type !== element.type)) {
            err = "فایل یا فایل های وارد شده دارای فرمت غیرمجاز می باشند."
        }
    }

    if (err !== '') {
        removeFiles(event);
        toast.error(err);
        return false;
    }

    return true;
}

export const maxSelectedFile = (event) => {
    let files = getFiles(event)
    let err = '';

    if (files.length > 3) {
        removeFiles(event);
        err = "بیش از 3 فایل را همزمان نمی توانید آپلود کنید.";
        toast.error(err);
        return false;
    }

    return true;
}

export const checkFileSize = (event) => {
    let files = getFiles(event)
    let err = '';
    let size = 3000000;

    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        if (element.size > size) {
            err = "حجم فایل " + element.name + " بیشتر از حد مجاز است."
            toast.error(err);
        }
    }

    if (err !== '') {
        removeFiles(event);
        return false;
    }

    return true;
}

//#endregion
