import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "field-service-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-field-service-core",
  "displayName": "Field Service Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "support_service",
    "subcategoryLabel": "Support & Service"
  },
  "description": "Dispatch, visit execution, technician posture, and spare-parts request orchestration for field service and on-site delivery operations.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "support-service-core",
    "party-relationships-core",
    "traceability-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Field Service Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Field Service Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Field Service Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Field Service Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Field Service Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "support-service-core",
      "class": "required",
      "rationale": "Required for Field Service Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "party-relationships-core",
      "class": "required",
      "rationale": "Required for Field Service Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for Field Service Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "contracts-core",
      "class": "optional",
      "rationale": "Recommended with Field Service Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "inventory-core",
      "class": "capability-enhancing",
      "rationale": "Improves Field Service Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "business-portals-core",
      "class": "capability-enhancing",
      "rationale": "Improves Field Service Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "maintenance-cmms-core",
      "class": "capability-enhancing",
      "rationale": "Improves Field Service Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "analytics-bi-core",
      "class": "capability-enhancing",
      "rationale": "Improves Field Service Core with deeper downstream automation, visibility, or workflow coverage."
    }
  ],
  "recommendedPlugins": [
    "contracts-core"
  ],
  "capabilityEnhancingPlugins": [
    "inventory-core",
    "business-portals-core",
    "maintenance-cmms-core",
    "analytics-bi-core"
  ],
  "integrationOnlyPlugins": [],
  "suggestedPacks": [],
  "standaloneSupported": false,
  "installNotes": [
    "Field execution depends on ticketing or entitlement context; install this as an operational extension, not as a first plugin."
  ],
  "optionalWith": [
    "contracts-core"
  ],
  "conflictsWith": [],
  "providesCapabilities": [
    "field-service.dispatches",
    "field-service.visits",
    "field-service.parts-requests"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.field-service",
    "events.publish.field-service"
  ],
  "ownsData": [
    "field-service.dispatches",
    "field-service.visits",
    "field-service.parts-requests",
    "field-service.reconciliation"
  ],
  "extendsData": [],
  "publicCommands": [
    "field-service.dispatches.schedule",
    "field-service.visits.start",
    "field-service.parts.request",
    "field-service.dispatches.hold",
    "field-service.dispatches.release",
    "field-service.dispatches.amend",
    "field-service.dispatches.reverse"
  ],
  "publicQueries": [
    "field-service.dispatch-summary",
    "field-service.visit-summary"
  ],
  "publicEvents": [
    "field-service.dispatch-scheduled.v1",
    "field-service.visit-started.v1",
    "field-service.parts-requested.v1"
  ],
  "domainCatalog": {
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
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
