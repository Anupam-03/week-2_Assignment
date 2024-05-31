function createFile() {
    const fileName = document.getElementById('file-name').value;
    const fileContent = document.getElementById('file-content').value;

    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, fileContent }),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('file-output').textContent = data;
    });
}

function readFile() {
    const fileName = document.getElementById('file-name').value;

    fetch(`/read?fileName=${fileName}`)
    .then(response => response.text())
    .then(data => {
        document.getElementById('file-output').textContent = data;
    });
}

function deleteFile() {
    const fileName = document.getElementById('file-name').value;

    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('file-output').textContent = data;
    });
}