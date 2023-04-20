import {createClient} from '@supabase/supabase-js'


const SUPABASE_URL =  'https://ichpxxukdyuswctwimtf.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljaHB4eHVrZHl1c3djdHdpbXRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE5MzIyMTcsImV4cCI6MTk5NzUwODIxN30.ZwKf43pdXQ-MUM6r6USGIUWgODPoBdyHgukqWuUufts'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)