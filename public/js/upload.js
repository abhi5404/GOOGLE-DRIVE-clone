document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.querySelector('label[for="dropzone-file"]');
  const fileInput = document.getElementById('dropzone-file');
  const progressBar = document.getElementById('progressBar');
  const uploadProgress = document.getElementById('uploadProgress');
  const fileGrid = document.getElementById('fileGrid');
  const previewBox = document.getElementById('previewBox');

  function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload');

    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        uploadProgress.classList.remove('hidden');
        progressBar.style.width = percent + '%';
      }
    };

    xhr.onload = function () {
      uploadProgress.classList.add('hidden');
      progressBar.style.width = '0%';
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        if (res.success) {
          const f = res.file;
          addFileToGrid(f.url || f.url, f.originalName, f.mimetype);
          showPreview(f.url || f.url, f.mimetype);
        } else {
          alert(res.message || 'Upload failed');
        }
      } else {
        alert('Upload error');
      }
    };

    xhr.onerror = function () {
      uploadProgress.classList.add('hidden');
      progressBar.style.width = '0%';
      alert('Upload failed (network error)');
    };

    xhr.send(formData);
  }

  function addFileToGrid(url, name, type) {
    const item = document.createElement('div');
    item.className = 'bg-gray-800 rounded p-2 flex items-center gap-2';
    const isImage = type && type.startsWith('image/');
    if (isImage) {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'w-20 h-20 object-cover rounded';
      item.appendChild(img);
    } else {
      const icon = document.createElement('div');
      icon.className = 'w-20 h-20 bg-gray-700 rounded flex items-center justify-center text-gray-300';
      icon.textContent = name.split('.').pop().toUpperCase();
      item.appendChild(icon);
    }
    const label = document.createElement('div');
    label.innerHTML = `<div class="text-sm text-white">${name}</div>`;
    item.appendChild(label);
    fileGrid.prepend(item);
  }

  function showPreview(url, type) {
    const isImage = type && type.startsWith('image/');
    previewBox.innerHTML = '';
    if (isImage) {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'w-full h-full object-cover rounded';
      previewBox.appendChild(img);
    } else {
      const div = document.createElement('div');
      div.className = 'text-white p-3';
      div.textContent = url;
      previewBox.appendChild(div);
    }
    previewBox.classList.remove('hidden');
  }

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
  });
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500');
  });
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500');
    if (e.dataTransfer.files.length) uploadFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) uploadFile(e.target.files[0]);
  });

  document.getElementById('manualUploadBtn').addEventListener('click', () => fileInput.click());

  // Load existing files from server
  async function loadFiles() {
    try {
      const res = await fetch('/files');
      const json = await res.json();
      if (json.success) {
        json.files.forEach((f) => addFileToGrid(f.url, f.originalName, f.mimetype));
      }
    } catch (err) {
      console.error('Could not load files', err);
    }
  }

  loadFiles();
});