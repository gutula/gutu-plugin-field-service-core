import { defineUiSurface } from "@platform/ui-shell";

import { BusinessAdminPage } from "./admin/main.page";

export const uiSurface = defineUiSurface({
  embeddedPages: [
    {
      shell: "admin",
      route: "/admin/business/field-service",
      component: BusinessAdminPage,
      permission: "field-service.dispatches.read"
    }
  ],
  widgets: []
});
