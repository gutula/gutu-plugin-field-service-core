export const reportDefinitions = [
  {
    "id": "field-service-core.report.01",
    "label": "Dispatch Summary",
    "owningPlugin": "field-service-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "dispatch-overdue",
      "parts-request-backlog",
      "visit-reconciliation-review"
    ]
  },
  {
    "id": "field-service-core.report.02",
    "label": "Visit Completion",
    "owningPlugin": "field-service-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "dispatch-overdue",
      "parts-request-backlog",
      "visit-reconciliation-review"
    ]
  },
  {
    "id": "field-service-core.report.03",
    "label": "Parts Consumption Backlog",
    "owningPlugin": "field-service-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "dispatch-overdue",
      "parts-request-backlog",
      "visit-reconciliation-review"
    ]
  }
] as const;
