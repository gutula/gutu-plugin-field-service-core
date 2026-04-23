# Field Service Core Developer Guide

Dispatch, visit execution, technician posture, and spare-parts request orchestration for field service and on-site delivery operations.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns dispatch, visit execution, and parts-request coordination for on-site service work while keeping inventory and accounting boundaries explicit.

### This plugin is the right fit when

- You need **dispatch**, **field visits**, **spare-parts requests** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/field-service-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/field-service-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/field-service-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/field-service-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/field-service-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/field-service-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/field-service-core` |
| Manifest ID | `field-service-core` |
| Display Name | Field Service Core |
| Domain Group | Operational Data |
| Default Category | Business / Support & Service |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `support-service-core`, `inventory-core`, `party-relationships-core`, `contracts-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.field-service`, `events.publish.field-service` |
| Provides Capabilities | `field-service.dispatches`, `field-service.visits`, `field-service.parts-requests` |
| Owns Data | `field-service.dispatches`, `field-service.visits`, `field-service.parts-requests`, `field-service.reconciliation` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `field-service.dispatches.schedule` | Permission: `field-service.dispatches.write` | Schedule Dispatch<br>Idempotent<br>Audited |
| Action | `field-service.visits.start` | Permission: `field-service.visits.write` | Start Field Visit<br>Non-idempotent<br>Audited |
| Action | `field-service.parts.request` | Permission: `field-service.parts-requests.write` | Request Spare Parts<br>Non-idempotent<br>Audited |
| Resource | `field-service.dispatches` | Portal disabled | Dispatch and technician assignment records.<br>Purpose: Own dispatch truth separately from tickets, stock, and billing state.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `field-service.visits` | Portal disabled | On-site visit execution and completion records.<br>Purpose: Track field execution as a first-class operational boundary.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `field-service.parts-requests` | Portal disabled | Spare-parts and material requests linked to field work.<br>Purpose: Request downstream inventory handling without mutating stock truth directly.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `field-service.projections.refresh` | `field-service-projections` | Retry policy not declared | No timeout declared |
| `field-service.reconciliation.run` | `field-service-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `field-service-lifecycle` | `dispatcher`, `technician`, `service-lead` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep technician execution, spare-parts requests, and service billing follow-up explicit. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `field-service.projections.refresh`, `field-service.reconciliation.run`.
- Workflow surface: `field-service-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/field-service-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/field-service-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["field-service.dispatches.schedule"]
  action --> validation["Schema + permission guard"]
  validation --> service["Field Service Core service layer"]
  service --> state["field-service.dispatches"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, createPrimaryRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/field-service-core";

export const pluginSurface = {
  manifest,
  createPrimaryRecordAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, createPrimaryRecordAction } from "@plugins/field-service-core";

console.log("plugin", manifest.id);
console.log("action", createPrimaryRecordAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 3 governed actions: `field-service.dispatches.schedule`, `field-service.visits.start`, `field-service.parts.request`.
- Owns 3 resource contracts: `field-service.dispatches`, `field-service.visits`, `field-service.parts-requests`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 5 owned entity surface(s): `Dispatch`, `Visit`, `Parts Request`, `Technician Timeline`, `Field Billing Request`.
- Carries 3 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Support`, `Maintenance`, `Projects`.
- Operational scenario matrix includes `dispatch-scheduling`, `visit-execution`, `parts-request-to-billing`.
- Governs 2 settings or policy surface(s) for operator control and rollout safety.

### Current gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

### Recommended next

- Deepen technician mobility, offline follow-up, and completion-proof flows as field execution becomes more demanding.
- Clarify downstream inventory, billing, and entitlement orchestration before higher-volume service dispatch goes live.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Issue`, `Maintenance Visit`, `Project`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
