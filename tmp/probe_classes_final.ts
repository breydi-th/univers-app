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
  
  const { data: ins, error: insErr } = await supabase.from('classes').insert([{ name: 'Check Class ' + Date.now() }]).select('*');
  if (insErr) {
    console.log('Insert with only name failed:', insErr.message);
  } else {
    console.log('SUCCESS! Columns found:', ins && ins[0] ? Object.keys(ins[0]) : 'Still no columns?');
  }
}

run();
