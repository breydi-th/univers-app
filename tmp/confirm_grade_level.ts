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
  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
  
  const { error } = await supabase.from('classes').insert([{ name: 'Probe Class 2', grade_level: 'Test' }]);
  if (error) {
    console.log('Insert with "grade_level" failed:', error.message);
  } else {
    console.log('Insert with "grade_level" SUCCESSFUL!');
  }
}

run();
