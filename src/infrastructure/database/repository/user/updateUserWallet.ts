import UserModel from "../../model/userModel";

// Function to update user's wallet balance
export const updateUserWallet = async (
  userId: string,
  refundAmount: number,
  userModel:typeof UserModel
): Promise<string | null> => {
  try {
    console.log("Update user wallet");
    console.log("userId", userId);
    console.log("refundAmount", refundAmount);

    // Fetch the user
    const user = await userModel.findById(userId).select("-password");
    console.log("user", user);

    if (user) {
      // Ensure wallet balance doesn't go negative
      user.wallet = (user.wallet || 0) + refundAmount;
      if (user.wallet < 0) {
        throw new Error("Insufficient funds in user's wallet");
      }

      // Save the updated user
      const res = await user.save();
      console.log("res", res);
      return "Successfully updated wallet"; // Return success message
    } else {
      return null; // User not found
    }
  } catch (error) {
    throw error;
  }
}