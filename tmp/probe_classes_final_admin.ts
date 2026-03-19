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
  
  const { data, error } = await supabase.from('classes').insert([{ name: 'Check Class Final ' + Date.now() }]).select('*');
  if (error) {
    console.log('Insert with only name (service_role) failed:', error.message);
  } else {
    console.log('SUCCESS! Columns found:', data && data[0] ? Object.keys(data[0]) : 'Still no columns?');
  }
}

run();
