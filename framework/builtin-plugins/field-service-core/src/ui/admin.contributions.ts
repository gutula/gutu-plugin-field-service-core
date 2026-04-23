import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "field-service",
      label: "Field Service",
      icon: "truck",
      description: "Dispatch, on-site execution, and spare-parts coordination.",
      permission: "field-service.dispatches.read",
      homePath: "/admin/business/field-service",
      quickActions: ["field-service-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "field-service",
      group: "control-room",
      items: [
        {
          id: "field-service-core.overview",
          label: "Control Room",
          icon: "truck",
          to: "/admin/business/field-service",
          permission: "field-service.dispatches.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "field-service-core.page",
      kind: "dashboard",
      route: "/admin/business/field-service",
      label: "Field Service Control Room",
      workspace: "field-service",
      group: "control-room",
      permission: "field-service.dispatches.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "field-service-core.open.control-room",
      label: "Open Field Service Core",
      permission: "field-service.dispatches.read",
      href: "/admin/business/field-service",
      keywords: ["field service core","field service","business"]
    })
  ]
};
