import instance from "../../../environment/axiosInstance";

export const postBook = async(bookDto) => {
  try {
    const response = instance.post('/api/admin/book',bookDto);
    return response;
  } catch (error) {
      throw error;
  }
}
