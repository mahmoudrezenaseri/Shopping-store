const FileManager = require("src/models/filemanager");

const path = require('path');
const ImageSize = require('image-size');
const FileType = require('file-type');

var resolvers = {
    Query: {
        getAllFiles: async (param, args, { req }) => {

            // check if user has logged in and is administrator
            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
                return;
            }

            const { media } = await getAllFilesHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return media.docs;
        }
    },
    Mutation: {
        createFile: async (param, args, { req, res }) => {

            if (!await common.checkIfAdmin(req, config.secretId)) {
                handleErrors(null, 403, "امکان استفاده از این بخش وجود ندارد");
                return;
            }

            const { file } = await fileUploadHandler(args)
                .catch((error) => {
                    handleErrors(error, error.code, error.message)
                });

            return {
                status: 200,
                message: "اطلاعات با موفقیت ثبت شد",
                data: file
            };
        }
    },
};

const fileUploadHandler = async (args) => {

    const { createReadStream, filename } = await args.image;
    const stream = createReadStream();
    const { filePath } = await common.saveImage({ stream, filename });

    let file = await FileManager.create({
        name: filename,
        dir: filePath
    });

    return new Promise((resolve, reject) => {
        resolve({ file })
    })
}
// queries
const getAllFilesHandler = async (args) => {

    const page = args.page || 1;
    const limit = args.limit || 10;
    const media = await FileManager.paginate({}, { page, limit });

    for (let index = 0; index < media.doc.length; index++) {
        const element = media.doc[index];
        ImageSize(path.join(__dirname, `/public/${element.dir}`), async (err, dim) => {
            element.dimWidth = await dim.width;
            element.dimheight = await dim.height;
        })

        const type = await FileType.fromFile(path.join(__dirname, `/public/${element.dir}`));
        element.format = type.ext;
    }

    return new Promise((resolve, reject) => {
        resolve({ media })
    });
}

module.exports = resolvers;
