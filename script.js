// Función para abrir la barra lateral
function openNav() {
    document.getElementById("sidebar").style.left = "0";
}

// Función para cerrar la barra lateral
function closeNav() {
    document.getElementById("sidebar").style.left = "-250px";
}

// Función para mostrar la sección seleccionada
function showSection(section) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('show'));

    // Mostrar la sección correspondiente
    document.getElementById(section).classList.add('show');
}

// Seleccionar elementos
const commentInput = document.getElementById('comment-input');
const submitComment = document.getElementById('submit-comment');
const commentsContainer = document.getElementById('comments-container');

// Cargar comentarios almacenados
function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    commentsContainer.innerHTML = '';
    comments.forEach((comment, index) => renderComment(comment, index));
}

// Guardar comentarios en localStorage
function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Renderizar un comentario
function renderComment(comment, index) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    const commentText = document.createElement('p');
    commentText.textContent = comment;

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('comment-actions');

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = () => editComment(index);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = () => deleteComment(index);

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    commentDiv.appendChild(commentText);
    commentDiv.appendChild(actionsDiv);

    commentsContainer.appendChild(commentDiv);
}

// Agregar un nuevo comentario
submitComment.addEventListener('click', () => {
    const comment = commentInput.value.trim();
    if (comment === '') {
        alert('El comentario no puede estar vacío.');
        return;
    }

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    saveComments(comments);
    renderComment(comment, comments.length - 1);

    commentInput.value = '';
});

// Editar un comentario
function editComment(index) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    const newComment = prompt('Edita tu comentario:', comments[index]);
    if (newComment !== null && newComment.trim() !== '') {
        comments[index] = newComment.trim();
        saveComments(comments);
        loadComments();
    }
}

// Eliminar un comentario
function deleteComment(index) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.splice(index, 1);
    saveComments(comments);
    loadComments();
}

// Inicializar la carga de comentarios
loadComments();

