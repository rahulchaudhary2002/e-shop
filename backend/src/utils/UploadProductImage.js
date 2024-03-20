import multer, { diskStorage } from 'multer'
import { existsSync, mkdirSync } from 'fs'
import { extname, basename } from 'path'

const storage = diskStorage({
    destination: function (req, file, cb) {
        let dstn = 'public/images/products'
        if (!existsSync(dstn)) {
            mkdirSync(dstn, { recursive: true })
        }
        cb(null, dstn)
    },
    filename: function (req, file, cb) {
        let ext = extname(file.originalname)
        let filename = basename(file.originalname, ext)
        const uniqueSuffix = Date.now() + '-' + Math.random(Math.random() * 1E9)
        filename = filename + uniqueSuffix + ext
        cb(null, filename)
    }
})

const fileFilter = (req, file, next) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return next(new Error("Invalid file format"), false);
    }
    next(null, true);
};

const uploadProductImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024
    }
})

export default uploadProductImage