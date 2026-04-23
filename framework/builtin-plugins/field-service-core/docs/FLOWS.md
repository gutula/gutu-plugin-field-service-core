# Field Service Core Flows

## Happy paths

- `field-service.dispatches.schedule`: Schedule Dispatch
- `field-service.visits.start`: Start Field Visit
- `field-service.parts.request`: Request Spare Parts

## Operational scenario matrix

- `dispatch-scheduling`
- `visit-execution`
- `parts-request-to-billing`

## Action-level flows

### `field-service.dispatches.schedule`

Schedule Dispatch

Permission: `field-service.dispatches.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s idempotent semantics.

Side effects:

- Mutates or validates state owned by `field-service.dispatches`, `field-service.visits`, `field-service.parts-requests`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `field-service.visits.start`

Start Field Visit

Permission: `field-service.visits.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `field-service.dispatches`, `field-service.visits`, `field-service.parts-requests`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


### `field-service.parts.request`

Request Spare Parts

Permission: `field-service.parts-requests.write`

Business purpose: Expose the plugin’s write boundary through a validated, auditable action contract.

Preconditions:

- Caller input must satisfy the action schema exported by the plugin.
- The caller must satisfy the declared permission and any host-level installation constraints.
- Integration should honor the action’s non-idempotent semantics.

Side effects:

- Mutates or validates state owned by `field-service.dispatches`, `field-service.visits`, `field-service.parts-requests`.
- May schedule or describe follow-up background work.

Forbidden shortcuts:

- Do not bypass the action contract with undocumented service mutations in application code.
- Do not document extra hooks, retries, or lifecycle semantics unless they are explicitly exported here.


## Cross-package interactions

- Direct dependencies: `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `support-service-core`, `inventory-core`, `party-relationships-core`, `contracts-core`, `traceability-core`
- Requested capabilities: `ui.register.admin`, `api.rest.mount`, `data.write.field-service`, `events.publish.field-service`
- Integration model: Actions+Resources+Jobs+Workflows+UI
- ERPNext doctypes used as parity references: `Issue`, `Maintenance Visit`, `Project`, `Task`
- Recovery ownership should stay with the host orchestration layer when the plugin does not explicitly export jobs, workflows, or lifecycle events.
