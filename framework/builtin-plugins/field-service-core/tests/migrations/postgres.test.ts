import { describe, expect, it } from "bun:test";

import {
  buildFieldServiceCoreMigrationSql,
  buildFieldServiceCoreRollbackSql,
  getFieldServiceCoreLookupIndexName,
  getFieldServiceCoreStatusIndexName
} from "../../src/postgres";

describe("field-service-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildFieldServiceCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS field_service_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS field_service_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS field_service_core.exception_records");
    expect(sql).toContain(getFieldServiceCoreLookupIndexName());
    expect(sql).toContain(getFieldServiceCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildFieldServiceCoreRollbackSql({ schemaName: "field_service_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS field_service_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS field_service_core_preview CASCADE");
  });
});
