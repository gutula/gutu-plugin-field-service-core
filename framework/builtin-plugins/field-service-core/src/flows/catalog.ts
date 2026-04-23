import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "field-service.dispatches.schedule",
    "label": "Schedule Dispatch",
    "phase": "create",
    "methodName": "scheduleDispatch"
  },
  {
    "id": "field-service.visits.start",
    "label": "Start Field Visit",
    "phase": "advance",
    "methodName": "startFieldVisit"
  },
  {
    "id": "field-service.parts.request",
    "label": "Request Spare Parts",
    "phase": "reconcile",
    "methodName": "requestSpareParts"
  }
] as const;

export async function scheduleDispatch(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function startFieldVisit(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function requestSpareParts(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
