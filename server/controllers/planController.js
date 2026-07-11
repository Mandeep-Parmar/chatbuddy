import { plans } from "../configs/plans.js";

export const getPlans = async (req, res) => {
  try {
    res.json({ success: true, plans });
  } catch (error) {
    res.json({ success: true, message: error.message });
  }
};
