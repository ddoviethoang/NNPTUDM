// API Base URL
const API_URL = 'http://localhost:3000';

// ==================== POSTS MANAGEMENT ====================

/**
 * Lấy tất cả posts (bao gồm cả đã xoá mềm)
 */
async function loadPosts() {
    try {
        const response = await fetch(`${API_URL}/posts`);
        const posts = await response.json();
        displayPosts(posts);
        clearMessage('postMessage');
    } catch (error) {
        console.error('Error loading posts:', error);
        showMessage('postMessage', 'Lỗi khi tải posts', 'error');
    }
}

/**
 * Hiển thị posts với gạch ngang cho các post đã xoá mềm
 */
function displayPosts(posts) {
    const postsList = document.getElementById('postsList');
    
    if (!posts || posts.length === 0) {
        postsList.innerHTML = '<div class="empty-message">Chưa có bài viết</div>';
        return;
    }

    postsList.innerHTML = posts.map(post => `
        <div class="item ${post.isDeleted ? 'deleted' : ''}">
            <div class="item-title">
                ${post.title}
                ${post.isDeleted ? '<span class="deleted-badge">DELETED</span>' : ''}
            </div>
            <div class="item-meta">
                <span class="post-id-display">ID: ${post.id}</span> | 
                <span>Lượt xem: ${post.views}</span>
            </div>
            <div class="item-actions">
                <button class="btn-warning" onclick="editPost('${post.id}', '${escapeHtml(post.title)}', ${post.views})">Sửa</button>
                <button class="btn-danger" onclick="deletePost('${post.id}', ${post.isDeleted})">
                    ${post.isDeleted ? 'Khôi phục' : 'Xóa'}
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Tạo post mới với ID tự tăng
 */
async function createPost() {
    const title = document.getElementById('postTitle').value.trim();
    const views = parseInt(document.getElementById('postViews').value) || 0;

    if (!title) {
        showMessage('postMessage', 'Vui lòng nhập tiêu đề', 'error');
        return;
    }

    try {
        // Lấy tất cả posts để tính maxId
        const response = await fetch(`${API_URL}/posts`);
        const posts = await response.json();
        
        const maxId = posts.length > 0 
            ? Math.max(...posts.map(p => parseInt(p.id))) 
            : 0;
        
        const newPost = {
            id: String(maxId + 1),
            title: title,
            views: views,
            isDeleted: false
        };

        const createResponse = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        if (createResponse.ok) {
            showMessage('postMessage', 'Tạo post thành công!', 'success');
            document.getElementById('postTitle').value = '';
            document.getElementById('postViews').value = '0';
            loadPosts();
        }
    } catch (error) {
        console.error('Error creating post:', error);
        showMessage('postMessage', 'Lỗi khi tạo post', 'error');
    }
}

/**
 * Sửa post
 */
async function editPost(id, title, views) {
    const newTitle = prompt('Nhập tiêu đề mới:', title);
    if (!newTitle) return;

    const newViews = prompt('Nhập lượt xem mới:', views);
    if (newViews === null) return;

    try {
        const updateResponse = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle.trim(),
                views: parseInt(newViews) || 0
            })
        });

        if (updateResponse.ok) {
            showMessage('postMessage', 'Cập nhật post thành công!', 'success');
            loadPosts();
        }
    } catch (error) {
        console.error('Error updating post:', error);
        showMessage('postMessage', 'Lỗi khi cập nhật post', 'error');
    }
}

/**
 * Xóa mềm hoặc khôi phục post
 */
async function deletePost(id, isDeleted) {
    const action = isDeleted ? 'Khôi phục' : 'Xóa';
    if (!confirm(`Bạn có chắc chắn muốn ${action} post này không?`)) return;

    try {
        const updateResponse = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isDeleted: !isDeleted
            })
        });

        if (updateResponse.ok) {
            showMessage('postMessage', `${action} post thành công!`, 'success');
            loadPosts();
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        showMessage('postMessage', `Lỗi khi ${action} post`, 'error');
    }
}

// ==================== COMMENTS MANAGEMENT ====================

/**
 * Lấy tất cả comments (bao gồm cả đã xoá mềm)
 */
async function loadComments() {
    try {
        const response = await fetch(`${API_URL}/comments`);
        const comments = await response.json();
        displayComments(comments);
        clearMessage('commentMessage');
    } catch (error) {
        console.error('Error loading comments:', error);
        showMessage('commentMessage', 'Lỗi khi tải comments', 'error');
    }
}

/**
 * Hiển thị comments với gạch ngang cho các comment đã xoá mềm
 */
function displayComments(comments) {
    const commentsList = document.getElementById('commentsList');
    
    if (!comments || comments.length === 0) {
        commentsList.innerHTML = '<div class="empty-message">Chưa có bình luận</div>';
        return;
    }

    commentsList.innerHTML = comments.map(comment => `
        <div class="item ${comment.isDeleted ? 'deleted' : ''}">
            <div class="item-text">
                ${comment.text}
                ${comment.isDeleted ? '<span class="deleted-badge">DELETED</span>' : ''}
            </div>
            <div class="item-meta">
                <span class="post-id-display">ID: ${comment.id}</span> | 
                <span>Post ID: ${comment.postId}</span>
            </div>
            <div class="item-actions">
                <button class="btn-warning" onclick="editComment('${comment.id}', '${escapeHtml(comment.text)}')">Sửa</button>
                <button class="btn-danger" onclick="deleteComment('${comment.id}', ${comment.isDeleted})">
                    ${comment.isDeleted ? 'Khôi phục' : 'Xóa'}
                </button>
            </div>
        </div>
    `).join('');
}

/**
 * Tạo comment mới với ID tự tăng
 */
async function createComment() {
    const postId = document.getElementById('commentPostId').value.trim();
    const text = document.getElementById('commentText').value.trim();

    if (!postId || !text) {
        showMessage('commentMessage', 'Vui lòng nhập Post ID và nội dung bình luận', 'error');
        return;
    }

    try {
        // Kiểm tra post có tồn tại không
        const postResponse = await fetch(`${API_URL}/posts/${postId}`);
        if (!postResponse.ok) {
            showMessage('commentMessage', 'Post không tồn tại', 'error');
            return;
        }

        // Lấy tất cả comments để tính maxId
        const response = await fetch(`${API_URL}/comments`);
        const comments = await response.json();
        
        const maxId = comments.length > 0 
            ? Math.max(...comments.map(c => parseInt(c.id))) 
            : 0;
        
        const newComment = {
            id: String(maxId + 1),
            text: text,
            postId: postId,
            isDeleted: false
        };

        const createResponse = await fetch(`${API_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        });

        if (createResponse.ok) {
            showMessage('commentMessage', 'Tạo comment thành công!', 'success');
            document.getElementById('commentPostId').value = '';
            document.getElementById('commentText').value = '';
            loadComments();
        }
    } catch (error) {
        console.error('Error creating comment:', error);
        showMessage('commentMessage', 'Lỗi khi tạo comment', 'error');
    }
}

/**
 * Sửa comment
 */
async function editComment(id, text) {
    const newText = prompt('Nhập nội dung mới:', text);
    if (!newText || !newText.trim()) return;

    try {
        const updateResponse = await fetch(`${API_URL}/comments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: newText.trim()
            })
        });

        if (updateResponse.ok) {
            showMessage('commentMessage', 'Cập nhật comment thành công!', 'success');
            loadComments();
        }
    } catch (error) {
        console.error('Error updating comment:', error);
        showMessage('commentMessage', 'Lỗi khi cập nhật comment', 'error');
    }
}

/**
 * Xóa mềm hoặc khôi phục comment
 */
async function deleteComment(id, isDeleted) {
    const action = isDeleted ? 'Khôi phục' : 'Xóa';
    if (!confirm(`Bạn có chắc chắn muốn ${action} comment này không?`)) return;

    try {
        const updateResponse = await fetch(`${API_URL}/comments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isDeleted: !isDeleted
            })
        });

        if (updateResponse.ok) {
            showMessage('commentMessage', `${action} comment thành công!`, 'success');
            loadComments();
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        showMessage('commentMessage', `Lỗi khi ${action} comment`, 'error');
    }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Hiển thị thông báo tạm thời
 */
function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<div class="${type}-message">${message}</div>`;
    
    // Tự động xóa thông báo sau 4 giây
    setTimeout(() => {
        element.innerHTML = '';
    }, 4000);
}

/**
 * Xóa thông báo
 */
function clearMessage(elementId) {
    document.getElementById(elementId).innerHTML = '';
}

/**
 * Escape HTML để tránh XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==================== INITIALIZATION ====================

// Tải dữ liệu khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    loadComments();
});
