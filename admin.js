import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const loginForm = document.getElementById('adminLogin');
const authStatus = document.getElementById('authStatus');
const adminDashboard = document.getElementById('adminDashboard');
const adminContent = document.getElementById('adminContent');
const signOutBtn = document.getElementById('signOutBtn');
const authPanel = document.getElementById('authPanel');

function renderMessages(messages) {
    if (!messages.length) {
        adminContent.innerHTML = '<p style="color: var(--gray);">لا توجد رسائل حتى الآن.</p>';
        return;
    }

    adminContent.innerHTML = messages.map(msg => {
        const dateString = msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString('ar-EG') : '';
        return `
            <div class="admin-card" style="margin-bottom:18px; padding:18px; border:1px solid rgba(0,194,209,0.12); border-radius:16px; background: rgba(10,10,18,0.9);">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; align-items:center;">
                    <strong style="font-size:1rem;">${msg.name || 'اسم غير متوفر'}</strong>
                    <small style="color: var(--gray);">${dateString}</small>
                </div>
                <div style="margin-top:10px; color: var(--cyan);">${msg.project || 'بدون مشروع'}</div>
                <div style="margin-top:8px; color: var(--text);">${msg.email} • ${msg.phone || '-'}</div>
                <p style="margin-top:14px; line-height:1.7; color: var(--gray);">${msg.message || ''}</p>
            </div>
        `;
    }).join('');
}

async function loadMessages() {
    const messagesQuery = query(collection(db, 'contactRequests'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(messagesQuery);
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    renderMessages(messages);
}

loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    authStatus.textContent = 'جاري تسجيل الدخول...';
    authStatus.style.color = 'var(--cyan)';

    const email = document.getElementById('adminEmail').value.trim();
    const password = document.getElementById('adminPassword').value.trim();

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        authStatus.textContent = 'خطأ في تسجيل الدخول، تأكد من البريد وكلمة المرور.';
        authStatus.style.color = '#ff6666';
    }
});

signOutBtn.addEventListener('click', () => {
    signOut(auth);
});

onAuthStateChanged(auth, user => {
    if (user) {
        authPanel.classList.add('hidden');
        adminDashboard.classList.remove('hidden');
        loadMessages();
    } else {
        authPanel.classList.remove('hidden');
        adminDashboard.classList.add('hidden');
        authStatus.textContent = '';
    }
});
