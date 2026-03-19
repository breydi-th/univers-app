import { supabaseAdmin as supabase } from './supabase-admin';

export interface AuditLog {
  actor_name: string;
  action: string;
  target_type: string;
  target_name: string;
  created_at?: string;
}

/**
 * Log an administrative activity to the database.
 * @param action The action performed (e.g., 'Création', 'Suppression')
 * @param targetType The type of object affected (e.g., 'Élève', 'Classe')
 * @param targetName The name or ID of the object
 */
export async function logActivity(action: string, targetType: string, targetName: string) {
  try {
    const session = localStorage.getItem('user_session');
    const actor = session ? JSON.parse(session).full_name : 'Administrateur';

    const { error } = await supabase.from('audit_logs').insert([
      {
        actor_name: actor,
        action: action,
        target_type: targetType,
        target_name: targetName
      }
    ]);

    if (error) console.error("Audit log error:", error);
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
}

/**
 * Fetch the latest audit logs.
 * @param limit Number of logs to fetch
 */
export async function getAuditLogs(limit: number = 20) {
  const { data, error } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
    
  if (error) throw error;
  return data;
}
