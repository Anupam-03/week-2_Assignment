document.addEventListener('DOMContentLoaded', function () {
    const fileNameInput = document.getElementById('fileName');
    const contentInput = document.getElementById('content');
    const responseDiv = document.getElementById('response');

    document.getElementById('createBtn').addEventListener('click', function () {
        const fileName = fileNameInput.value;
        const content = contentInput.value;
        if (fileName && content) {
            const url = `http://localhost:3000/?file=${fileName}&content=${encodeURIComponent(content)}`;
            fetch(url, { method: 'POST' })
                .then(response => response.text())
                .then(data => {
                    responseDiv.textContent = data;
                })
                .catch(error => {
                    responseDiv.textContent = 'Error: ' + error.message;
                });
        } else {
            responseDiv.textContent = 'Please provide both file name and content for create operation.';
        }
    });

    document.getElementById('readBtn').addEventListener('click', function () {
        const fileName = fileNameInput.value;
        if (fileName) {
            const url = `http://localhost:3000/?file=${fileName}`;
            fetch(url, { method: 'GET' })
                .then(response => response.text())
                .then(data => {
                    responseDiv.textContent = data;
                })
                .catch(error => {
                    responseDiv.textContent = 'Error: ' + error.message;
                });
        } else {
            responseDiv.textContent = 'Please provide a file name for read operation.';
        }
    });

    document.getElementById('deleteBtn').addEventListener('click', function () {
        const fileName = fileNameInput.value;
        if (fileName) {
            const url = `http://localhost:3000/?file=${fileName}`;
            fetch(url, { method: 'DELETE' })
                .then(response => response.text())
                .then(data => {
                    responseDiv.textContent = data;
                })
                .catch(error => {
                    responseDiv.textContent = 'Error: ' + error.message;
                });
        } else {
            responseDiv.textContent = 'Please provide a file name for delete operation.';
        }
    });
});
