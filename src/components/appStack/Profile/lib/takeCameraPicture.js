import * as ImagePicker from 'expo-image-picker';
import { sendAvatarPicture } from '../../../../api/nodeApi';
import { setPictureUri } from "../../../../store/userSlice";


export default async function takeCameraPicture(dispatch, email) {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3 ,
      });
   
  
      if (!result.canceled) {
          dispatch(setPictureUri(result.assets[0].uri))
          const fetchedImg = await fetch(result.assets[0].uri);
          const blob = await fetchedImg.blob();
          const file = new File([blob], `${email}avatarPicture.png`, {type:"image/png", lastModified:new Date()});
          const data = new FormData() 
          
          
          data.append("file", {
              file,
              name: `${email}avatarPicture.png`,
              type: "image/png",
              uri: Platform.OS === 'ios' ? 
                  result.assets[0].uri.replace('file://', '')
                  : result.assets[0].uri,
              });
    
          const res = await sendAvatarPicture(data);
      }
}