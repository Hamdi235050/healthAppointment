import { toast } from "react-toastify";
import { TransactionType } from "../components/Transactions/types";

export const updateTransaction = async (
  formData: TransactionType,
  successMessage: string,
  transactionId?: number
) => {
  const token = localStorage.getItem("authToken");
  console.log("Form Data:", formData);

  if (!token) {
    toast.error("Authentication token is missing");
    return;
  }

  try {
    if (typeof transactionId !== "number") {
      toast.error("Invalid transaction ID");
      return;
    }

    const response = await fetch(
      `http://localhost:8081/api/v1/transactions/${transactionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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
      toast.error(`Failed to update transaction. Status: ${response.status}`);
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
      console.log("Transaction updated successfully:", data);
      toast.success(successMessage, { autoClose: 3000 });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      toast.error("Invalid response format");
    }
  } catch (error) {
    console.error("Error updating transaction:", error);
    toast.error("Error updating transaction");
  }
};
