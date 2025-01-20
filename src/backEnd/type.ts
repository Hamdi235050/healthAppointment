export type noteType = {
    dateAjout: string,
    contenu: string,
    observations: string,
    diagnosis: string,
    noteId: number,
    hoursElapsed: number,
    suivi: string,
    patient: {
      id: number,
      firstName?: string,
      lastName?: string,
    },
    id: string;

 
  }

  export type patientType = {
    id: string
    firstName: string;
    lastName: string;
    birthDate: Date |String | number |  null; // Or use Date if you want to store it as a Date object
    gender?: "Male" | "Female" | "Other"; // You can refine this based on possible values
    phone: string;
    email: string;
    address: string;
    condition?: string; // You might want to use a more specific type if the conditions are known
    appointments:  [];
    consultations:  [];
    transactions:  [];

  }