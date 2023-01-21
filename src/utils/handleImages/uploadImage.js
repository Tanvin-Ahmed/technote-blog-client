import axios from "axios";

const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_IMAGEBB_API_KEY}`,
  },
};

export const uploadImageInImageBB = async (image, type = "user") => {
  try {
    const folderName =
      type === "blog" ? "tech-blog-cover-image" : "tech-blog-user-image";

    // const folderId = await axios(
    //   `https://api.imgbb.com/folder/by-name/${folderName}?key=${process.env.REACT_APP_IMAGEBB_API_KEY}`
    // );

    const formData = new FormData();
    formData.append("image", image);
    formData.append("folder_name", folderName);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGEBB_API_KEY}`,
      formData
    );

    const imgObj = {
      display_url: data.data.display_url,
      id: data.data.id,
      delete_url: data.data.delete_url,
    };

    return {
      img: JSON.stringify(imgObj),
      errorMessage: null,
    };
  } catch (error) {
    console.log(error);
    return {
      img: null,
      errorMessage: "Image not uploaded",
    };
  }
};

export const deleteImageFromImageBB = async (url) => {
  try {
    if (!url) return;
    await axios.delete(url, config);

    return { message: "image deleted successfully!", errorMessage: null };
  } catch (error) {
    return { message: null, errorMessage: "Image not deleted" };
  }
};
