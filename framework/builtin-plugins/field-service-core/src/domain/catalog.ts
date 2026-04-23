export const domainCatalog = {
  "erpnextModules": [
    "Support",
    "Maintenance",
    "Projects"
  ],
  "erpnextDoctypes": [
    "Issue",
    "Maintenance Visit",
    "Project",
    "Task"
  ],
  "ownedEntities": [
    "Dispatch",
    "Visit",
    "Parts Request",
    "Technician Timeline",
    "Field Billing Request"
  ],
  "reports": [
    "Dispatch Summary",
    "Visit Completion",
    "Parts Consumption Backlog"
  ],
  "exceptionQueues": [
    "dispatch-overdue",
    "parts-request-backlog",
    "visit-reconciliation-review"
  ],
  "operationalScenarios": [
    "dispatch-scheduling",
    "visit-execution",
    "parts-request-to-billing"
  ],
  "settingsSurfaces": [
    "Support Settings",
    "Maintenance Schedule"
  ],
  "edgeCases": [
    "disconnected field execution",
    "technician reassignment after start",
    "spare request without entitlement"
  ]
} as const;
