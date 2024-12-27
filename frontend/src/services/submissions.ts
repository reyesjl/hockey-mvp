import { axiosInstance } from "@/config/apiConfig"

export const createTournamentSubmission = async (newSubmission: any) => {
  try {
    const response = await axiosInstance.post('/tournament-submissions/', newSubmission)
    if (response.data.success) {
      return response.data
    } else {
      return {
        success: false,
        message: response.data.message || 'Error from backend.',
      }
    }
  } catch (err: any) {
    console.error(err)
    return {
      success: false,
      message: err.response?.data?.message || 'Error from backend.',
    }
  }
}
