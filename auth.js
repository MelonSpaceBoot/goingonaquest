// Supabase Project Credentials
const SUPABASE_URL = 'https://bptfgghjuvizlrpzmovv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdGZnZ2hqdXZpemxycHptb3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NTE4ODgsImV4cCI6MjEwNDEyNzg4OH0.K9hyeCnwQgRcDrCGbKPL0Bpz337vOnoDI7oXyWmu6SU';

// Safely initialize Supabase Client
let supabase = null;
if (window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Calculate base path for GitHub Pages subfolders
const pathSegments = window.location.pathname.split('/').filter(Boolean);
const repoName = window.location.hostname.includes('github.io') && pathSegments.length > 0 ? `/${pathSegments[0]}` : '';
const BASE_PATH = repoName;

// Session Management
function getCurrentUser() {
  try {
    const raw = localStorage.getItem('quest_account');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    localStorage.removeItem('quest_account');
    return null;
  }
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = `${BASE_PATH}/login/`;
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem('quest_account');
  window.location.href = `${BASE_PATH}/login/`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
