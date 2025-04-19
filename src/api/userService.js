import axiosInstance from '../api/axiosInstance';

// to skip auth
export const getPublicPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts', {
      skipAuth: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUser = async userId => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Multipart demo
export const uploadProfilePicture = async (userId, imageFile) => {
  const formData = new FormData();

  formData.append('userId', userId);
  formData.append('profileImage', {
    uri: imageFile.uri,
    name: imageFile.fileName || 'profile.jpg',
    type: imageFile.type || 'image/jpeg',
  });

  try {
    const response = await axiosInstance.post(
      '/upload/profile-picture',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // skipAuth: true,
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// // ✅ Get User by ID
// export const getUser = async (userId) => {
//   try {
//     const response = await axiosInstance.get(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ✅ Create a new user
// export const createUser = async (userData) => {
//   try {
//     const response = await axiosInstance.post('/users', userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ✅ Update user
// export const updateUser = async (userId, updates) => {
//   try {
//     const response = await axiosInstance.put(`/users/${userId}`, updates);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// // ✅ Delete user
// export const deleteUser = async (userId) => {
//   try {
//     const response = await axiosInstance.delete(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// Example code
// import {launchImageLibrary} from 'react-native-image-picker';

// launchImageLibrary({mediaType: 'photo'}, response => {
//   if (!response.didCancel && !response.errorCode) {
//     const imageFile = response.assets[0];
//     uploadProfilePicture('123', imageFile)
//       .then(data => console.log('Upload success:', data))
//       .catch(err => console.error('Upload error:', err));
//   }
// });
