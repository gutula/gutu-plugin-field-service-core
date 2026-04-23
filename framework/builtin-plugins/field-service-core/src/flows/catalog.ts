import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "field-service.dispatches.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "field-service.dispatches.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "field-service.dispatches.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "field-service.dispatches.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
