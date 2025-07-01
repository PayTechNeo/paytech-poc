export const FIELDS_CONTSTANT_NAMES = {
    "BMI": "Body Mass Index",
    "providerId": 'Provider',
    "blockDaysStartTime": "Start Time",
    "blockDaysEndTime": "End Time",
    'availabilityLocationId': 'Location',
    'serviceLocationId': 'Service Location',
    'pos': 'Place of Service',
    'dos': 'Date',
    'renderingProviderId': 'Rendering Provider',
    'patientId': "Patient Name",
    'startDate': "start date",
    'locationIds': 'Work location'
} as const

export const NO_LOADER_FOR_API_ENDPOINT = ["notification-log/details"] as const

export type FieldConstantName = keyof typeof FIELDS_CONTSTANT_NAMES 