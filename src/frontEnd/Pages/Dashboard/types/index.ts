export interface MenuItem {
  path: string;
  icon: JSX.Element;
  label: string;
  subItems?: MenuItem[];
}

export interface StatCard {
  title: string;
  value: string;
  icon: JSX.Element;
  color?: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  appointmentDate?: string;
  time: string;
  type: string;
  status:  "SCHEDULED" |  "CONFIRMED" |  "CANCELLED"
}

export interface MedicalNote {
  id: number;
  patientName: string;
  timestamp: string;
  content: string;
}