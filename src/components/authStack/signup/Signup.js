import {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert, Modal } from "react-native";
import { ScrollView } from 'react-native-gesture-handler'
import {useFonts} from 'expo-font'
import { A } from '@expo/html-elements';
import moment from 'moment'
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '@dietime/react-native-date-picker';

import generateDaysInMonth from '../lib/generateDaysInMonth';
import {months} from '../lib/monthsObject'
import { generateYears } from "../lib/years";
import { signUp } from '../../../api/nodeApi';
import handleCreateAccount from './lib/signupHelpers';
import { AuthContext } from '../../../context/AuthContext';

export default function Signup({navigation}) {
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [modalOpen, setModalOpen] = useState(true);
    //state for forms
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState(navigation.state.params.email || "");
    const [password, setPassword] = useState("");

    //state for dropdown
    const [monthOpen, setMonthOpen] = useState(false)
    const [dayOpen, setDayOpen] = useState(false)
    const [yearOpen, setYearOpen] = useState(false)
    const [birthMonth, setBirthMonth] = useState();
    const [birthYear, setBirthYear] = useState();
    const [daysInMonth, setDaysInMonth] = useState("")
    const [dayOfBirth, setDayOfBirth] = useState({label:"", value:""});
    const {signUp, login, logout} = useContext(AuthContext);
    
    //generates array of years since 1900
    let years = generateYears();
    // const birthDayString = `${birthYear}-${moment().month(Number(birthMonth) - 1).format("MM")}-${dayOfBirth}`
    //sets state for font
    const [regular] = useFonts({
        Roboto: require('../../../../assets/fonts/roboto-regular.ttf'),
      });

      const [birthDayString, setBirthDayString] = useState(moment().subtract("18", "years").format("YYYY-MM-DD").toString())


      //Initialize dropdown values ----
    //     useEffect(() => {
    //         const monthIndex = moment().month();
    //         setBirthMonth(months[monthIndex].value)
    //         setBirthYear(moment().subtract(18, 'years').format("YYYY"))
    //         setDayOfBirth(moment().format("DD"))
    //         const days = moment(`${moment().subtract(18, 'years').format("YYYY")}-${months[monthIndex].label}`, "YYYY-MMMM").daysInMonth()
    //         setDaysInMonth(JSON.stringify(generateDaysInMonth(days)))
    //   }, [])
      //----end of dropdown initialization




      //side effect functions from dropdown ----------- 
      //sets days per month dynamically when year and month is changed - includes leap year
      //closes dropdown after selection
    //   function monthValSideEffects(value) {
    //     const days = moment(`${Number(birthYear)}-${months[Number(value) -1].label}`, "YYYY-MMMM").daysInMonth();
        
    //     //stringified value to avoid re-renders
    //     setDaysInMonth(JSON.stringify(generateDaysInMonth(days)))
    //   }

    //   function yearValSideEffects(value) {
    //     const days = moment(`${value}-${months[Number(birthMonth) -1].label})`, "YYYY-MMMM").daysInMonth();
    //     const dim = generateDaysInMonth(days)
        
    //     //stringified value to avoid re-renders
    //     setDaysInMonth(JSON.stringify(dim))
    //   }
    //   //-----end of side effect functions
    //   if (!regular) {
    //     return null;
    //   }
      console.log(birthDayString)
      async function handleSignup() {
        signUp(email, password, firstName, lastName, birthDayString.toString())
      }
    
      function startYear() {
        return Number(moment().subtract("18", "years").format("YYYY"))
      }
     
console.log(birthDayString)
console.log(modalOpen)
    return (
        <View style={styles.masterContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalOpen}
                onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
                <View style={styles.picker}>
                <Text style={styles.dobText}>Please select your date of birth</Text>
                    <DatePicker 
                        onChange={(value) => setBirthDayString(moment(value).format("YYYY-MM-DD"))}
                        format="yyyy-mm-dd"
                        startYear={startYear()}
                    />
                </View>
                <TouchableOpacity onPress={() => setModalOpen(false)} style={styles.btn2}>
                    <Text style={styles.btnText2}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        </Modal>
        
        
        
      
       
            <View style={styles.subContainer}>
            
            <ScrollView
                contentContainerStyle={{
                    flexGrow:0.8,
                    justifyContent: 'space-between',
                    overflow: "hidden",
                }}>
                <View style={styles.imgContainer}>
                    <Image style={styles.logo} source={require('../login/logo.jpg')} />
                </View>
                <View style={styles.topContainer}>
                    <View style={styles.headlineContainer}>
                        <Text style={styles.createAcc}>Create an account</Text>
                        <View style={styles.topTextContainer}>
                            <Text style={styles.alreadyMember}>Already a Budmember?</Text>
                            <Text style={styles.signIn}>Sign In</Text>
                        </View>
                    </View>
                    <View style={styles.socialContainer}>
                        <Text style={styles.signupWithSocial}>Sign up with Social</Text>
                        <Image style={styles.googleLogo} source={require("../login/google.png")} />
                    </View>
                </View>  

                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                        <Text style={styles.or}>Or</Text>
                    <View style={styles.line}></View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputSubContainer}>
                        <Text style={styles.label}>Email address</Text>
                        <TextInput editable={false} value={email} style={styles.inputField} />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            value={firstName} 
                            onChangeText={(text) => setFirstName(text)}
                            style={styles.inputField} />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            value={lastName} 
                            onChangeText={(text) => setLastName(text)}
                            style={styles.inputField} />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput 
                            secureTextEntry={true} 
                            autoComplete={'password'}  
                            style={styles.inputField}
                            value={password} 
                            onChangeText={(text) => setPassword(text)}
                             />
                    </View>

                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.dateOfBirth}>Date of Birth</Text>
                    
                    </View>
                <View style={styles.termsPrivacy}>
                    <Text style={styles.termsHeadline}>By clicking create account, I agree that:</Text>
                    <View style={styles.termsStatementContainer}>
                        <Text style={styles.bulletPoint}>{`\u2B24`}</Text>
                        <Text style={styles.termsStatement}>I have read and accepted the <A href="https://budmember.com/terms-and-conditions/" style={styles.link}>terms & conditions</A></Text>
                    </View>
                    <View style={styles.termsStatementContainer}>
                        <Text style={styles.bulletPoint}>{`\u2B24`}</Text>
                        <Text style={styles.termsStatement}>I have read and accepted the <A href="https://budmember.com/privacy-policy/" style={styles.link}>privacy policy</A></Text>
                    </View> 
                </View>
                <TouchableOpacity onPress={handleSignup} style={styles.btn}>
                    <Text style={styles.btnText}>Create Account</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        position: 'absolute',
        flex:1,
        backgroundColor:"#2a1b6e",
        height: "100%",
        width: "100%", 
        justifyContent: "center",
        alignItems: "center", 
           
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    modalBox: {
        borderRadius: "15%",
        height: "50%",
        width: "90%",
        backgroundColor: "white",
        position:"absolute",
        justifyContent: "space-around"

    },

   
    
    subContainer: {
        flex: 1,
        width: "90%",
        height: "80%",
        
    },

    topContainer: {
        flexGrow: 1,
        width: "100%",
       
    },

    inputContainer : {
        flex: 1.3,
        width: "100%",

    },

    inputSubContainer: {
        flex: 1,
    },

    bottomContainer: {
        flex: 1,
        width: "100%",

    },

    createAcc:{
        color: "#dbdbdb",
        fontSize: 25,
        fontFamily: "Roboto",
        
    },

    topTextContainer: {
        flexDirection: "row",
    },

    alreadyMember: {
        fontFamily: "Roboto",
        color: "#dbdbdb",
        fontSize: 14,
    },

    signIn: {
        color: "#2da491",
        fontFamily: "Roboto",
        textDecorationLine: "underline",
        fontSize: 14,
    },

    imgContainer: {
        flex: 3,
        width: "100%",
        height: "auto",
        marginTop: 10,
        flexDirection:"column",
    },

    logo: {
        flex:1,
        height: null,
        width: null,
        resizeMode: "contain",
    },

    headlineContainer: {
        flex:1,
    },

    socialContainer : {
        flex:1,
        flexDirection: "column",
    },

    googleLogo: {
        marginTop: "2%"
    },

    signupWithSocial: {
        fontFamily: "Roboto",
        color: "#dbdbdb",
        fontSize: 16,
        marginTop: "8%",
    },

    lineContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        
    },

    line: {
        width: "41%",
        borderColor: "#dbdbdb",
        borderWidth: 0.5,
    },

    or : {
        fontFamily: "Roboto",
        color: "#dbdbdb", 
        fontSize: 21,
    },

    label: {
        fontFamily: "Roboto",
        color: "#dbdbdb", 
        fontSize: 12,
    },

    inputField: {
        backgroundColor: "#fff",
        minHeight: 35,
        borderRadius: 5,
    },

    dateOfBirth: {
        fontFamily: "Roboto",
        color: "#dbdbdb", 
        fontSize: 16,
        marginTop: "3%",
    },
    dropDownContainer: {
        flexDirection: "row",
        width: "70%",
    },
    dropDownShort: {
       width: 80,
       height: 25, 
       marginRight: 7
    },
    dropDownLong: {
        height: 25,
        width: 110, 
        marginRight: 7,
     },
     
    indDropDownContainer: {
        flexDirection: "column",
    },
    termsPrivacy : {
      marginTop: "8%",
    },
    termsHeadline: {
        color: "#b4b4b4",
        fontFamily: "Roboto",
    },
    termsStatementContainer: {
        marginLeft: 30,
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginTop: 6,
    },
    termsStatement : {
        color: "#b4b4b4",
        fontFamily: "Roboto",
        fontSize: 10,
    },
    bulletPoint : {
        fontSize: 7,
        color: "#b4b4b4",
        marginRight: 10,
    },
    btn: {
        backgroundColor: "#2da491",
        width: "100%",
        padding: 10,
        marginTop: 15,
        textAlign: "center",
        borderRadius: 15,
       
    }, 
    btnText: {
        textAlign: "center",
        color: "#fff"
    },

    btn2: {
        backgroundColor: "#2da491",
        width: "90%",
        padding: 10,
        marginTop: 15,
        textAlign: "center",
        borderRadius: 7,
        marginLeft: "auto",
        marginRight: "auto",
       
    }, 
    btnText2: {
        textAlign: "center",
        color: "#fff"
    },
    link: {
        color: "rgb(22, 169, 46)"
    },
    dobText: {
        fontFamily: "Roboto",
        fontSize: 20,
        textAlign: "center",
    }
    
})






// <View style={styles.dropDownContainer}>
                    
//                     <View style={styles.indDropDownContainer}>
//                         <Text style={styles.label}>Month</Text>
//                         <DropDownPicker
//                             style={styles.dropdownGlobalStyle} 
//                             placeholder={birthMonth}
//                             containerStyle={styles.dropDownLong} 
//                             value={birthMonth} 
//                             items={months} 
//                             setValue={setBirthMonth} 
//                             onClose={() => setMonthOpen(false)} 
//                             onChangeValue={(value) => monthValSideEffects(value)} 
//                             open={monthOpen} 
//                             setOpen={() => setMonthOpen(true)} />
//                     </View>
//                     <View style={styles.indDropDownContainer}>
//                         <Text style={styles.label}>Day</Text>
//                         <DropDownPicker 
//                             placeholder={dayOfBirth}
//                             containerStyle={styles.dropDownShort} 
//                             value={dayOfBirth} 
//                             items={JSON.parse(daysInMonth)} 
//                             setValue={setDayOfBirth} 
//                             onClose={() => setDayOpen(false)} 
//                             open={dayOpen} 
//                             setOpen={() => setDayOpen(true)} />
//                     </View>
//                     <View style={styles.indDropDownContainer}>
//                         <Text style={styles.label}>Year</Text>
//                         <DropDownPicker 
//                             placeholder={birthYear}
//                             containerStyle={styles.dropDownLong} 
//                             value={birthYear} 
//                             items={years} 
//                             setValue={setBirthYear} 
//                             open={yearOpen} 
//                             onClose={() => setYearOpen(false)} 
//                             onChangeValue={(value) => yearValSideEffects(value)} 
//                             setOpen={() => setYearOpen(true)}/>
//                     </View>
//                     </View>