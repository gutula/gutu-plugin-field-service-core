import { describe, expect, it } from "bun:test";

import {
  buildFieldServiceCoreSqliteMigrationSql,
  buildFieldServiceCoreSqliteRollbackSql,
  getFieldServiceCoreSqliteLookupIndexName,
  getFieldServiceCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("field-service-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildFieldServiceCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS field_service_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS field_service_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS field_service_core_exception_records");
    expect(sql).toContain(getFieldServiceCoreSqliteLookupIndexName("field_service_core_"));
    expect(sql).toContain(getFieldServiceCoreSqliteStatusIndexName("field_service_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildFieldServiceCoreSqliteRollbackSql({ tablePrefix: "field_service_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS field_service_core_preview_exception_records");
  });
});
