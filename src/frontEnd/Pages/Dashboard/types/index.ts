export interface MenuItem {
  path: string;
  icon: JSX.Element;
  label: string;
  subItems?: MenuItem[];
}

export interface StatCard {
  title: string;
  value: number;
  icon: JSX.Element;
  color?: string;
}

export interface Appointment {
  id: number;
   notes?: string;
   time?: string;
  patient?: {
    id?: null;
    name?: string;

 };
  patientName: string 
  appointmentDate?: string;
  type: string;
  status:  "SCHEDULED" |  "CONFIRMED" |  "CANCELLED"
}

export interface MedicalNote {
  id: number;
  patientName: string;
  timestamp: string;
  content: string;
}