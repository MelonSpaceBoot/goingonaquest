// Supabase Configuration
const SUPABASE_URL = 'https://bptfgghjuvizlrpzmovv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdGZnZ2hqdXZpemxycHptb3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NTE4ODgsImV4cCI6MjEwNDEyNzg4OH0.K9hyeCnwQgRcDrCGbKPL0Bpz337vOnoDI7oXyWmu6SU';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Dynamically determine GitHub Pages subfolder base path
const BASE_PATH = window.location.pathname.includes('/going-on-a-quest') 
  ? '/going-on-a-quest' 
  : '';

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('quest_account')) || null;
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = `${BASE_PATH}/login/`;
  }
  return user;
}

function logout() {
  localStorage.removeItem('quest_account');
  window.location.href = `${BASE_PATH}/login/`;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

