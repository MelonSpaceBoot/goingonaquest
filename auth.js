// Supabase Configuration
const SUPABASE_URL = 'https://bptfgghjuvizlrpzmovv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdGZnZ2hqdXZpemxycHptb3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NTE4ODgsImV4cCI6MjEwNDEyNzg4OH0.K9hyeCnwQgRcDrCGbKPL0Bpz337vOnoDI7oXyWmu6SU';

let supabase = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.error("Supabase init error:", e);
}

// Calculate base path reliably across Android & Desktop
const cleanPath = window.location.pathname.replace(/\/index\.html$/, '');
const pathSegments = cleanPath.split('/').filter(Boolean);
const BASE_PATH = window.location.hostname.includes('github.io') && pathSegments.length > 0 
  ? `/${pathSegments[0]}` 
  : '';

function getCurrentUser() {
  try {
    const raw = window.localStorage.getItem('quest_account');
    if (!raw || raw === 'undefined' || raw === 'null') return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Storage access restricted or invalid session:", e);
    return null;
  }
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = `${window.location.origin}${BASE_PATH}/login/`;
    return null;
  }
  return user;
}

function logout() {
  try {
    window.localStorage.removeItem('quest_account');
  } catch(e) {}
  window.location.href = `${window.location.origin}${BASE_PATH}/login/`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
