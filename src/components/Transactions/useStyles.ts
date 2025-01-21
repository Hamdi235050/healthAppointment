import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  container: {
    padding: "2rem",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  header: {
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#6b7280",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  input: {
    padding: "12px 20px",
    margin: "10px 0",
    height: "20px",
    border: "2px solid #ddd",
    width: "200px",
    borderRadius: 8,
    fontSize: 16,
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#f9f9f9",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    gap: "1rem",
    flexWrap: "wrap",
  },
  searchContainer: {
    position: "relative",
    flex: "1",
    maxWidth: "32rem",
  },
  searchIcon: {
    position: "absolute",
    left: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
  },
  searchInput: {
    width: "100%",
    padding: "0.625rem 1rem 0.625rem 2.5rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    "&:focus": {
      outline: "none",
      borderColor: "#2563eb",
      boxShadow: "0 0 0 2px rgba(37, 99, 235, 0.2)",
    },
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.625rem 1rem",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "all 0.2s",
  },
  filterButton: {
    extend: "button",
    backgroundColor: "white",
    border: "1px solid #d1d5db",
    color: "#374151",
    "&:hover": {
      backgroundColor: "#f9fafb",
    },
  },
  exportButton: {
    extend: "button",
    backgroundColor: "#2563eb",
    color: "white",
    "&:hover": {
      backgroundColor: "#1d4ed8",
    },
  },
  table: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  thead: {
    backgroundColor: "#f9fafb",
  },
  th: {
    padding: "0.75rem 1rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    color: "#4b5563",
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "1rem",
    fontSize: "0.875rem",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
  },
  status: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.75rem",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: 500,
  },
  statusPaid: {
    extend: "status",
    backgroundColor: "#dcfce7",
    color: "#16a34a",
  },
  statusPending: {
    extend: "status",
    backgroundColor: "#fef9c3",
    color: "#ca8a04",
  },
  statusFailed: {
    extend: "status",
    backgroundColor: "#fee2e2",
    color: "#dc2626",
  },
  actionButton: {
    padding: "0.375rem",
    borderRadius: "0.375rem",
    color: "#6b7280",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#f3f4f6",
      color: "#374151",
    },
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    backgroundColor: "white",
    borderTop: "1px solid #e5e7eb",
  },
  pageInfo: {
    fontSize: "0.875rem",
    color: "#4b5563",
  },
  pageControls: {
    display: "flex",
    gap: "0.25rem",
  },
  pageButton: {
    padding: "0.5rem",
    borderRadius: "0.375rem",
    color: "#4b5563",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#f3f4f6",
      color: "#374151",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
});
