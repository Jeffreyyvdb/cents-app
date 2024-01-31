import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://ewmfeqyidtxqgfdrcdol.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bWZlcXlpZHR4cWdmZHJjZG9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NDMxNDAsImV4cCI6MjAyMjMxOTE0MH0.EfjSafdVgA27QjsKOFPtkipkRamheVxN94QzoVwLCas'
);
