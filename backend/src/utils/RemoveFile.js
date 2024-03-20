import fs from 'fs'

const removeFile = (filePath) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log('File does not exist');
                return;
            }
            console.error('Error checking file existence:', err);
            return;
        }

        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting file:', unlinkErr);
                return;
            }
            console.log('File deleted successfully');
        });
    });
}

export default removeFile