export const scenarioDefinitions = [
  {
    "id": "dispatch-scheduling",
    "owningPlugin": "field-service-core",
    "workflowId": "field-service-lifecycle",
    "actionIds": [
      "field-service.dispatches.schedule",
      "field-service.visits.start",
      "field-service.parts.request",
      "field-service.dispatches.hold",
      "field-service.dispatches.release",
      "field-service.dispatches.amend",
      "field-service.dispatches.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "support.service-orders.dispatch",
        "inventory.transfers.request"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "visit-execution",
    "owningPlugin": "field-service-core",
    "workflowId": "field-service-lifecycle",
    "actionIds": [
      "field-service.dispatches.schedule",
      "field-service.visits.start",
      "field-service.parts.request",
      "field-service.dispatches.hold",
      "field-service.dispatches.release",
      "field-service.dispatches.amend",
      "field-service.dispatches.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "support.service-orders.dispatch",
        "inventory.transfers.request"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "parts-request-to-billing",
    "owningPlugin": "field-service-core",
    "workflowId": "field-service-lifecycle",
    "actionIds": [
      "field-service.dispatches.schedule",
      "field-service.visits.start",
      "field-service.parts.request",
      "field-service.dispatches.hold",
      "field-service.dispatches.release",
      "field-service.dispatches.amend",
      "field-service.dispatches.reverse"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "support.service-orders.dispatch",
        "inventory.transfers.request"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
