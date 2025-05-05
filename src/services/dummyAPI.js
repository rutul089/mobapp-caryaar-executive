// export const getPublicPosts = async () => {
//   try {
//     const response = await axiosInstance.get('/posts', {
//       skipAuth: true,
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// //Multipart demo
// export const uploadProfilePicture = async (userId, imageFile) => {
//   const formData = new FormData();

//   formData.append('userId', userId);
//   formData.append('profileImage', {
//     uri: imageFile.uri,
//     name: imageFile.fileName || 'profile.jpg',
//     type: imageFile.type || 'image/jpeg',
//   });

//   try {
//     const response = await axiosInstance.post(
//       '/upload/profile-picture',
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         // skipAuth: true,
//       },
//     );

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
