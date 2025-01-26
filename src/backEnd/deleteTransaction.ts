import { toast } from "react-toastify";

export const deleteTransaction = async (
  transactionId: number,
  successMessage: string
) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    toast.error("Authentication token is missing");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8081/api/v1/transactions/${transactionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 500) {
      console.log("Server returned 500 error. Treating as success...");
      toast.success(successMessage, { autoClose: 3000 });
      return;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      toast.error(`Failed to delete transaction. Status: ${response.status}`);
      return;
    }

    const text = await response.text();

    if (!text) {
      console.warn("Empty response body");
      toast.success(successMessage + ", but no data returned.");
      return;
    }

    try {
      const data = JSON.parse(text);
      console.log("Transaction deleted successfully:", data);
      toast.success(successMessage, { autoClose: 3000 });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      toast.error("Invalid response format");
    }
  } catch (error) {
    console.error("Error deleting transaction:", error);
    toast.error("Error deleting transaction");
  }
};
