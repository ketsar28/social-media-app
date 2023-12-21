const cloud_name = "dw7jveagk";
const upload_preset = "aaw-social";

export const uploadToCloudinary = async (pics, fileType) => {
  if (pics && fileType) {
    const data = new FormData();
    data.append("file", pics);
    data.append("cloud_name", cloud_name);
    data.append("upload_preset", upload_preset);

    const resApi = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      { method: "post", body: data }
    );

    console.log("response ---", resApi);

    const fileData = await resApi.json();
    console.log("response file data ---", fileData.url);
    return fileData.url;
  } else {
    console.log("error...");
  }
};
