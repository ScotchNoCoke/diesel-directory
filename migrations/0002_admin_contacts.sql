-- Inbound contacts, callouts, and triage messages
CREATE TABLE IF NOT EXISTS admin_contacts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    category TEXT DEFAULT 'general' CHECK(category IN ('general', 'quote_callout', 'claim_inquiry', 'emergency')),
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK(status IN ('new', 'in_progress', 'resolved', 'archived')),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_contacts_status ON admin_contacts(status);
CREATE INDEX IF NOT EXISTS idx_admin_contacts_created_at ON admin_contacts(created_at DESC);
