// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nejvuawwgupsigtoatsp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lanZ1YXd3Z3Vwc2lndG9hdHNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MDA3MTYsImV4cCI6MjA2NTA3NjcxNn0.WYdx21ns6lQvBMDw8DOwpdJyxPkU3eUfW3y46RifrnI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);