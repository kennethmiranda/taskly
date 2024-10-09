const connection = require('./mysql'); // Import your MySQL connection
class FileAttachment {
    constructor(fileName, fileSize, fileType, uploadDate, taskId) {
      this.fileName = fileName;
      this.fileSize = fileSize;
      this.fileType = fileType;
      this.uploadDate = uploadDate || new Date(); // Default to current date
      this.taskId = taskId; // Associate file with a specific task
    }
    getFileInfo(){
        return {
            fileName: this.fileName,
            fileSize: this.fileSize,
            fileType: this.fileType,
            uploadDate: this.uploadDate,
            taskId: this.taskId
        };

    }

    upload(){
        console.log('Uploading file:', this.fileName);
        connection.query('INSERT INTO file_attachments (file_name, file_size, file_type, upload_date, task_id) VALUES (?, ?, ?, ?, ?)', [this.fileName, this.fileSize, this.fileType, this.uploadDate, this.taskId], (err, results) => {
            if (err) {
                console.error('Error inserting file:', err);
                return;
            }
            console.log('File inserted successfully');
        });

    }
}

module.exports = FileAttachment;
