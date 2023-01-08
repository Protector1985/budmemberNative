import QRCode from 'react-native-qrcode-svg';
import { AntDesign } from '@expo/vector-icons'
import { Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';


export default function QrCode({navigation}) {
  const {sub} = useSelector((state) => state.cognitoDataSlice.cognitoData);
  const {colorPalette} = useSelector((state) => state.userSlice)
  const size = Dimensions.get("window").width * 0.6;

 
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require("../../../assets/pictures/logo_white.png")} />
        <Text style={styles.text}>Show this QR code to the Budtender when ready: </Text>
        <QRCode
          size={size}
          value={sub}
        />
        <View style={styles.btnHoldingContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Subscription Data")} style={[styles.btn, {backgroundColor: colorPalette.accent}]} >
            <View style={styles.btnWriting}>
              <Text style={styles.subsData}>Subscription Data</Text>
              <AntDesign style={styles.arrows} name="doubleright" size={22} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        
      
      </SafeAreaView>
       
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  qrCode: {
    width: "80%",
  },
  logo: {
    width: "90%",
    height: "20%",
    resizeMode:"contain",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    
  },
  btn: {
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnWriting: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  subsData: {
    fontSize: 24,
    color: "white",
  },
  btnHoldingContainer: {
    width: "80%",
  },
  arrows: {
    marginLeft: 15,
    color: "white"
  }
})