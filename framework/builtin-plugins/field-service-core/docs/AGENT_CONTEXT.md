# Field Service Core Agent Context

## Mission

Owns dispatch, visit execution, and parts-request coordination for on-site service work while keeping inventory and accounting boundaries explicit.

## Code map

- Package root: `framework/builtin-plugins/field-service-core`
- Service layer: `framework/builtin-plugins/field-service-core/src/services/main.service.ts`
- Action layer: `framework/builtin-plugins/field-service-core/src/actions/default.action.ts`
- Resource layer: `framework/builtin-plugins/field-service-core/src/resources/main.resource.ts`
- UI layer: `framework/builtin-plugins/field-service-core/src/ui`

## Safe assumptions

- Use `field-service-core` as the stable plugin identifier and `@plugins/field-service-core` as the package import name.
- Treat declared actions and resources as the public integration surface before reaching into services.
- Prefer explicit command, event, job, and workflow orchestration over undocumented side effects.

## Forbidden claims

- Do not document generic WordPress-style hooks unless they are explicitly exported.
- Do not promise live external connectors, distributed worker infrastructure, or portal/admin surfaces that are not present in the code.
- Do not claim a higher maturity tier than `Hardened` without adding the missing verification and operational depth first.

## Verification

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`
