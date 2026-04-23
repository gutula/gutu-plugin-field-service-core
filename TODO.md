# Field Service Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

- Exports 7 governed actions: `field-service.dispatches.schedule`, `field-service.visits.start`, `field-service.parts.request`, `field-service.dispatches.hold`, `field-service.dispatches.release`, `field-service.dispatches.amend`, `field-service.dispatches.reverse`.
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

## Current Gaps

- No additional gaps were identified beyond the plugin’s stated non-goals.

## Recommended Next

- Deepen technician mobility, offline follow-up, and completion-proof flows as field execution becomes more demanding.
- Clarify downstream inventory, billing, and entitlement orchestration before higher-volume service dispatch goes live.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Issue`, `Maintenance Visit`, `Project`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
