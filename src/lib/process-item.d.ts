/**
 * Process step type enum
 */
export enum ProcessItemTypeEnum {
  CALL_RECEIVED = 'CALL_RECEIVED',
  IMAGES_RECEIVED = 'IMAGES_RECEIVED',
  KVA_REQUESTED = 'KVA_REQUESTED',
  KVA_RECEIVED = 'KVA_RECEIVED',
  LEASE_APPROVAL = 'LEASE_APPROVAL',
  FLEET_APPROVAL = 'FLEET_APPROVAL',
  INSURANCE_APPROVAL = 'INSURANCE_APPROVAL',
  WORKSHOP_APPOINTMENT = 'WORKSHOP_APPOINTMENT',
  REPAIRED = 'REPAIRED',
  PROCESS_COMPLETED = 'PROCESS_COMPLETED',
}



/**
 * Process step items
 */
export interface ProcessItem {
  /**
   * Enum of different process types
   */
  type: ProcessItemTypeEnum

  /**
   * The title of the process step
   */
  title: string

  /**
   * The timestamp of the process initiation
   */
  timestamp: string

  /**
   * A name of the contact person for the process step
   */
  contact: string

  /**
   * A status enum of the process step
   */
  status: string

  /**
   * Where is the process step happening
   */
  location: string

  /**
   * Additional comment of the user
   */
  comment?: string

  /**
   * Optional: External reference id, can be from a 3rd party system or internal note for the process step
   */
  referenceId?: string

  /**
   * Optional: count of damages being reported at once
   */
  amount?: number,
}
