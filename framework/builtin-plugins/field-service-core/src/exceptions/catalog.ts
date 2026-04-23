export const exceptionQueueDefinitions = [
  {
    "id": "dispatch-overdue",
    "label": "Dispatch Overdue",
    "severity": "medium",
    "owner": "dispatcher",
    "reconciliationJobId": "field-service.reconciliation.run"
  },
  {
    "id": "parts-request-backlog",
    "label": "Parts Request Backlog",
    "severity": "medium",
    "owner": "dispatcher",
    "reconciliationJobId": "field-service.reconciliation.run"
  },
  {
    "id": "visit-reconciliation-review",
    "label": "Visit Reconciliation Review",
    "severity": "medium",
    "owner": "dispatcher",
    "reconciliationJobId": "field-service.reconciliation.run"
  }
] as const;
