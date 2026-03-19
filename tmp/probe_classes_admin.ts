import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Simple .env reader
function loadEnv() {
  const envFile = fs.readFileSync('c:/1-School app/.env', 'utf8');
  const env: any = {};
  envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      env[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
  });
  return env;
}

async function run() {
  const env = loadEnv();
  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_SERVICE_ROLE_KEY);
  
  // Try to insert with "level" using service_role
  const { error: err1 } = await supabase.from('classes').insert([{ name: 'Check Level ' + Date.now(), level: '9th' }]);
  if (err1) {
    console.log('Insert with "level" (service_role) failed:', err1.message);
  } else {
    console.log('Insert with "level" successful!');
  }

  // Try to insert with "grade_level" using service_role
  const { error: err2 } = await supabase.from('classes').insert([{ name: 'Check grade_level ' + Date.now(), grade_level: '9th' }]);
  if (err2) {
    console.log('Insert with "grade_level" (service_role) failed:', err2.message);
  } else {
    console.log('Insert with "grade_level" successful!');
  }
}

run();
