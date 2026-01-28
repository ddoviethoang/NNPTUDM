// API Base URL
const API_URL = 'http://localhost:3000';

// ==================== POSTS ====================

async function loadPosts() {
    try {
        const res = await fetch(`${API_URL}/posts`);
        const posts = await res.json();
        displayPosts(posts);
    } catch {
        alert('Lỗi tải posts');
    }
}

function displayPosts(posts) {
    const el = document.getElementById('postsList');
    el.innerHTML = posts.map(p => `
        <div class="${p.isDeleted ? 'deleted' : ''}">
            <b>${p.title}</b> - Views: ${p.views}
            <button onclick="deletePost(${p.id}, ${p.isDeleted})">
                ${p.isDeleted ? 'Khôi phục' : 'Xóa'}
            </button>
        </div>
    `).join('');
}

async function createPost() {
    const title = document.getElementById('postTitle').value.trim();
    const views = Number(document.getElementById('postViews').value) || 0;

    if (!title) return alert('Nhập tiêu đề');

    await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            views,
            isDeleted: false
        })
    });

    loadPosts();
}

async function deletePost(id, isDeleted) {
    await fetch(`${API_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: !isDeleted })
    });

    loadPosts();
}

// ==================== COMMENTS ====================

async function loadComments() {
    try {
        const res = await fetch(`${API_URL}/comments`);
        const comments = await res.json();
        displayComments(comments);
    } catch {
        alert('Lỗi tải comments');
    }
}

function displayComments(comments) {
    const el = document.getElementById('commentsList');
    el.innerHTML = comments.map(c => `
        <div class="${c.isDeleted ? 'deleted' : ''}">
            ${c.text} (Post ${c.postId})
            <button onclick="deleteComment(${c.id}, ${c.isDeleted})">
                ${c.isDeleted ? 'Khôi phục' : 'Xóa'}
            </button>
        </div>
    `).join('');
}

async function createComment() {
    const postId = Number(document.getElementById('commentPostId').value);
    const text = document.getElementById('commentText').value.trim();

    if (!postId || !text) return alert('Thiếu dữ liệu');

    await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            postId,
            text,
            isDeleted: false
        })
    });

    loadComments();
}

async function deleteComment(id, isDeleted) {
    await fetch(`${API_URL}/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: !isDeleted })
    });

    loadComments();
}

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    loadComments();
});
