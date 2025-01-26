import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Filter,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getPatientData } from "../../backEnd/getPatients";
import getAllTransactions from "../../backEnd/getTransacrion";
import { submitTransaction } from "../../backEnd/submitTransaction";
import { updateTransaction } from "../../backEnd/updateTransaction";
import Sidebar from "../../frontEnd/Pages/Dashboard/components/Sidebar";
import { Patient } from "../../frontEnd/Pages/Dashboard/Patients";
import { DD_MM_YYYY, decodePlainDate, localDate } from "./localDate";
import { Popup } from "./Popup";
import { TransactionType } from "./types";
import { useStyles } from "./useStyles";
import { deleteTransaction } from "../../backEnd/deleteTransaction";

export default function AdminTransactions() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState<number | null>();
  const [openEdit, setOpenEdit] = useState<TransactionType | null>(null);
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

  const [transaction, setTransaction] = useState<TransactionType[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filtredTransaction] = transaction.filter((t) => t.id === openEdit?.id);
  const [formData, setFormData] = useState({
    patient: {
      id: filtredTransaction?.patient.id ?? (null as number | null),
    },
    transactionDate: filtredTransaction?.transactionDate || "",
    paymentMethod: filtredTransaction?.paymentMethod || "",
    amount: filtredTransaction?.amount || "",
    status: filtredTransaction?.status || "pending",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const patientData = await getPatientData();

        const list = await getAllTransactions();
        const transactionToEdit =
          openEdit != null && transaction.find((t) => t.id === openEdit?.id);

        if (transactionToEdit) {
          setFormData({
            patient: { id: transactionToEdit.patient.id },
            transactionDate: transactionToEdit.transactionDate
              ? new Date(transactionToEdit.transactionDate)
              : new Date(),
            paymentMethod: transactionToEdit.paymentMethod,
            amount: transactionToEdit.amount.toString(),
            status: transactionToEdit.status,
          });
        }
        setTransaction(list);
        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchTransaction();
  }, [openEdit]);

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
  const refetchTransactions = async () => {
    try {
      const transactionData = await getAllTransactions();
      setTransaction(transactionData);
    } catch (error) {
      console.error("Error refetching transaction data:", error);
    }
  };
  const handleAddTransaction = () => {
    if (
      !formData.patient.id ||
      !formData.transactionDate ||
      !formData.paymentMethod ||
      !formData.amount ||
      isNaN(Number(formData.amount))
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }
    const newTransaction: TransactionType = {
      transactionDate: new Date(formData.transactionDate),
      paymentMethod: formData.paymentMethod,
      patient: {
        id: patients.find((p) => p.id === formData.patient.id)?.id!,
      },
      amount: parseFloat(formData.amount.toString()),
      status: formData.status,
    };

    setFormData({
      patient: {
        id: 0,
      },
      transactionDate: new Date(),
      paymentMethod: "",
      amount: "",
      status: "pending",
    });

    setOpenAdd(false);

    submitTransaction(newTransaction, "Transaction ajoutée avec succès!");
    refetchTransactions();
  };
  const handleDelete = (id: number) => {
    deleteTransaction(id, "la transaction est supprimer");
    setOpenDelete(null);
    refetchTransactions();
  };
  const handleUpdate = (updatedData: typeof formData) => {
    if (
      !updatedData.patient.id ||
      !updatedData.transactionDate ||
      !updatedData.paymentMethod ||
      !updatedData.amount ||
      isNaN(Number(updatedData.amount))
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    const updatedTransaction: TransactionType = {
      transactionDate: new Date(updatedData.transactionDate),
      paymentMethod: updatedData.paymentMethod,
      patient: { id: updatedData.patient.id! },
      amount: parseFloat(updatedData.amount.toString()),
      status: updatedData.status,
    };
    console.log({ updatedTransaction });
    setTransaction((prevTransactions) =>
      prevTransactions.map((t) =>
        t.patient.id === updatedData.patient.id ? updatedTransaction : t
      )
    );

    setOpenEdit(null);
    console.log({ updatedTransaction });
    const transactionId = openEdit?.id ?? 0;
    updateTransaction(
      updatedTransaction,
      "la transaction est modifier",
      transactionId
    );
    refetchTransactions();
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
              {transaction.map((transaction, index) => (
                <tr key={index}>
                  <td className={classes.td}>#{index}</td>
                  <td className={classes.td}>{transaction.patient.id}</td>
                  <td className={classes.td}>
                    {localDate(
                      decodePlainDate(
                        new Date(transaction?.transactionDate) ?? null
                      ),
                      "fr-FR",
                      DD_MM_YYYY
                    )}
                  </td>
                  <td className={classes.td}>
                    {transaction.amount.toFixed(2)} DT
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
                        onClick={() => setOpenEdit(transaction)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className={classes.actionButton}
                        onClick={() => setOpenDelete(transaction.id)}
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
          isOpen={openDelete != null}
          onClose={() => setOpenDelete(null)}
          onConfirm={() => handleDelete(openDelete)}
          onCancel={() => setOpenDelete(null)}
          variant={colorVariants["danger"]}
        >
          <div>voulez vous supprimer cette transactions ?</div>
        </Popup>
      )}
      {openEdit && (
        <Popup
          isOpen={openEdit != null}
          onCancel={() => {
            setOpenEdit(null);
          }}
          onConfirm={() => {
            handleUpdate(formData);
          }}
          onClose={() => {
            setOpenEdit(null);
          }}
          variant={colorVariants["primary"]}
        >
          <div className={classes.popupContent}>
            <span className={classes.center}>Editer une Transaction</span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTransaction();
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <label htmlFor="transactionDate" className="w-1/3">
                  Transaction Date:
                </label>
                <input
                  type="date"
                  id="transactionDate"
                  name="transactionDate"
                  className={classes.input + " w-2/3"}
                  value={
                    formData.transactionDate
                      ? new Date(formData.transactionDate)
                          .toISOString()
                          .split("T")[0] // Convert to Date and extract date part
                      : ""
                  }
                  onChange={handleFormChange}
                  required
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
                  required
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
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="status" className="w-1/3">
                  Status:
                </label>
                <select
                  id="status"
                  name="status"
                  className="px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px] h-7"
                  value={formData.status}
                  onChange={handleFormChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </form>
          </div>
        </Popup>
      )}
      <Popup
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        onConfirm={() => handleAddTransaction()}
        onCancel={() => setOpenAdd(false)}
        variant={colorVariants["primary"]}
      >
        <div className={classes.popupContent}>
          <span className={classes.center}>Ajouter une Transaction</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTransaction();
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="patientId" className="w-1/3">
                Patient:
              </label>
              <select
                id="patientId"
                name="patient.id"
                className="px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px] h-7"
                value={formData.patient.id || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    patient: { id: parseInt(e.target.value) },
                  })
                }
                required
              >
                <option value="" disabled className="text-sm">
                  Choisir un patient
                </option>
                {patients.map((patient) => (
                  <option
                    key={patient.id}
                    value={patient.id}
                    className="text-sm"
                  >
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
                value={
                  formData.transactionDate instanceof Date
                    ? formData.transactionDate.toISOString().split("T")[0]
                    : formData.transactionDate
                }
                onChange={handleFormChange}
                required
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
                required
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
                min="0"
                step="1"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <label htmlFor="status" className="w-1/3">
                Status:
              </label>
              <select
                id="status"
                name="status"
                className="px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[200px] h-7"
                value={formData.status}
                onChange={handleFormChange}
                required
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
