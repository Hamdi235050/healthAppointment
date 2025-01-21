import {
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Edit,
  Eye,
  Filter,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar from "../../frontEnd/Pages/Dashboard/components/Sidebar";
import { Popup } from "./Popup";
import { useStyles } from "./useStyles";
import getAllTransactions from "../../backEnd/getTransacrion";
import { patientType } from "../../backEnd/type";
import { Patient } from "../../frontEnd/Pages/Dashboard/Patients";
import { getPatientData } from "../../backEnd/getPatients";

export default function AdminTransactions() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false); // Add state for the Add Transaction popup
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const colorVariants = {
    primary: "#007bff",
    success: "#28a745",
    danger: "#d32f2f",
    warning: "#ffc107",
    default: "#6c757d",
  };

  interface Transaction {
    id: number;
    transactionDate: Date;
    paymentMethod: string;
    patient: patientType;
    type: string;
    amount: number;
    status: string;
  }

  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [formData, setFormData] = useState({
    patientId: "",
    transactionDate: "",
    paymentMethod: "",
    amount: "",
    status: "pending", // Default status is "pending"
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const patientData = await getPatientData();

        const list = await getAllTransactions();
        setTransaction(list);
        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchTransaction();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "paid":
        return classes.statusPaid;
      case "pending":
        return classes.statusPending;
      case "failed":
        return classes.statusFailed;
      default:
        return classes.status;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "paid":
        return "Payé";
      case "pending":
        return "En attente";
      case "failed":
        return "Échec";
      default:
        return status;
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTransaction = () => {
    // Handle the addition of the new transaction
    console.log("Adding transaction", formData);
    // You could integrate with your backend here to save the data
    setOpenAdd(false); // Close the popup after submission
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className={`${classes.container} flex-1`}>
        <div className={classes.header}>
          <h1 className={classes.title}>Gestion des Transactions</h1>
          <p className={classes.subtitle}>
            Consultez et gérez toutes les transactions du cabinet médical
          </p>
        </div>

        <div className={classes.controls}>
          <div className={classes.searchContainer}>
            <Search className={classes.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Rechercher une transaction..."
              className={classes.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={classes.actions}>
            <button className={classes.filterButton}>
              <Filter size={16} />
              Filtrer
            </button>
            <button
              className={classes.exportButton}
              onClick={() => setOpenAdd(true)} // Open the add transaction form
            >
              <PlusCircle size={16} />
              Ajouter
            </button>
          </div>
        </div>

        <div className={classes.table}>
          <table className="w-full border-collapse">
            <thead className={classes.thead}>
              <tr>
                <th className={classes.th}>ID</th>
                <th className={classes.th}>Patient</th>
                <th className={classes.th}>Date</th>
                <th className={classes.th}>Montant</th>
                <th className={classes.th}>Statut</th>
                <th className={classes.th}>Méthode</th>
                <th className={classes.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((transaction) => (
                <tr key={transaction.id}>
                  <td className={classes.td}>#{transaction.id}</td>
                  <td className={classes.td}>{transaction.patient.id}</td>
                  <td className={classes.td}>
                    {new Date(transaction.transactionDate).toLocaleDateString()}
                  </td>
                  <td className={classes.td}>
                    {transaction.amount.toFixed(2)} €
                  </td>
                  <td className={classes.td}>
                    <span className={getStatusClass(transaction.status)}>
                      {getStatusLabel(transaction.status)}
                    </span>
                  </td>
                  <td className={classes.td}>{transaction.paymentMethod}</td>
                  <td className={classes.td}>
                    <div className={classes.actions}>
                      <button
                        className={classes.actionButton}
                        title="Voir"
                        onClick={() => setIsOpen(true)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className={classes.actionButton}
                        title="Modifier"
                        onClick={() => setOpenEdit(true)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className={classes.actionButton}
                        onClick={() => setOpenDelete(true)}
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={classes.pagination}>
            <span className={classes.pageInfo}>
              Affichage de 1-{transaction.length} sur {transaction.length}{" "}
              transactions
            </span>
            <div className={classes.pageControls}>
              <button
                className={classes.pageButton}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className={classes.pageButton}
                disabled={currentPage * itemsPerPage >= transaction.length}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <Popup
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          variant={colorVariants["primary"]}
        >
          qsdqsdqsd
        </Popup>
      )}
      {openDelete && (
        <Popup
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={() => console.log("todo")}
          onCancel={() => setOpenDelete(false)}
          variant={colorVariants["danger"]}
        >
          <div>voulez vous supprimer cette transactions ?</div>
        </Popup>
      )}
      {openEdit && (
        <Popup
          isOpen={openEdit}
          onCancel={() => {
            setOpenEdit(false);
          }}
          onConfirm={() => {
            console.log("todo");
          }}
          onClose={() => {
            setOpenEdit(false);
          }}
          variant={colorVariants["primary"]}
        >
          <div>openEdit</div>
        </Popup>
      )}

      <Popup
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        onConfirm={() => console.log("todo")}
        onCancel={() => setOpenAdd(false)}
        variant={colorVariants["primary"]}
      >
        <div className="popupContent">
          <span className={classes.center}>Ajouter une Transaction</span>
          <form onSubmit={handleAddTransaction} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label htmlFor="patientId" className="w-1/3">
                Patient ID:
              </label>
              <select
                id="patientId"
                name="patientId"
                className={classes.input + " w-2/3"} // Adjust input width to ensure alignment
                value={formData.patientId}
                onChange={handleFormChange}
              >
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="transactionDate" className="w-1/3">
                Transaction Date:
              </label>
              <input
                type="date"
                id="transactionDate"
                name="transactionDate"
                className={classes.input + " w-2/3"}
                value={formData.transactionDate}
                onChange={handleFormChange}
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="paymentMethod" className="w-1/3">
                Payment Method:
              </label>
              <input
                type="text"
                id="paymentMethod"
                className={classes.input + " w-2/3"}
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleFormChange}
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="amount" className="w-1/3">
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                className={classes.input + " w-2/3"}
                name="amount"
                value={formData.amount}
                onChange={handleFormChange}
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="status" className="w-1/3">
                Status:
              </label>
              <select
                id="status"
                name="status"
                className={classes.input + " w-2/3"}
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
}
