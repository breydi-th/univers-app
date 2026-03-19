import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

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
  // using ANON KEY just like the app
  const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);
  
  const { data, error } = await supabase.from('classes').insert([{ name: 'Test App Anon Env ' + Date.now() }]).select();
  if (error) {
    console.error('Insert failed with anon key:', error.message);
  } else {
    console.log('Insert SUCCESSFUL with anon key!', data);
  }
}

run();
