import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux';
import { setPictureUri } from '../../../store/userSlice';
const ENDPOINT = Platform.OS === 'ios' ? "http://localhost:5000" : "http://10.0.2.2:5000" // ios || android avd localhost

export default async function fetchImage(email, dispatch, hook) {
    
    if(email) {
      const resp = await fetch(`${ENDPOINT}/avatarPicture/${email}avatarPicture.png`)
        const imageBlob = await resp.blob();
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        reader.onloadend = () => {
        const base64data = reader.result;
        if(hook != base64data) {
            AsyncStorage.setItem("pic", base64data)
            dispatch(setPictureUri( base64data))
        }
    };
    }
}