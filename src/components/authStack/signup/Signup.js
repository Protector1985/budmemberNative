import React,{useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Alert, Modal, Platform, InputAccessoryView, Touchable, ActivityIndicator } from "react-native";
import Checkbox from 'expo-checkbox';
import { ScrollView } from 'react-native-gesture-handler'
import {useFonts} from 'expo-font'
import { A } from '@expo/html-elements';
import moment from 'moment'
import {findNodeHandle} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons'; 
import generateDaysInMonth from '../lib/generateDaysInMonth';
import {months} from '../lib/monthsObject'
import { generateYears } from "../lib/years";
import handleCreateAccount from './lib/signupHelpers';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboardVisible } from '../../utils/useKeyboardVisible';
import {deleteNullSFEntry} from '../../../api/nodeApi'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserToken } from '../../../store/authSlice';

export default function Signup({navigation}) {
   
    const dispatch = useDispatch()
    const keyboardOpen = useKeyboardVisible();

    //params are only sent with oAuth. (accesstoken)
    const params = navigation?.state?.params?.params
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))
    const [modalOpen, setModalOpen] = useState(true);
    //state for forms
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState(navigation?.state?.params?.email || "");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    //state for dropdown
    const [monthOpen, setMonthOpen] = useState(false)
    const [dayOpen, setDayOpen] = useState(false)
    const [yearOpen, setYearOpen] = useState(false)
    const [birthMonth, setBirthMonth] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [daysInMonth, setDaysInMonth] = useState([])
    const [dayOfBirth, setDayOfBirth] = useState("");
    const [isLoading, setIsLoading] = React.useState(false)
  
    const [birthDayString, setBirthdayString] = React.useState(new Date(moment().subtract(18, "years").format("YYYY-MM-DD")))
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    const [ageError, setAgeError] = React.useState(null)
    const [termsAccepted, setTermsAccepted] = React.useState(false)
    const [privacyAccepted, setPrivacyAccepted] = React.useState(false)
    const [acceptError, setAcceptError] = React.useState(null)
    const scrollViewRef= React.useRef();
    const [errors, setErrors] = React.useState({
        firstName:null,
        lastName: null,
        email:null,
        password: null,
    })

    const emailRef = React.useRef();
    const firstNameRef = React.useRef();
    const lastNameRef = React.useRef();
    const passwordRef = React.useRef();
    const passwordRepeatRef = React.useRef();
    const datePickRef = React.useRef();
    const checkBox1 = React.useRef();
    const checkBox2 = React.useRef();
 
   function submitDisabled() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
        if(reg.test(email) && firstName.length > 0 && lastName.length > 0 && password.length > 0) {
            return false
        } else {
            return true
        }
   }
    

   async function signUp(email, password, firstName, lastName, birthDayString) {
    setIsLoading(true)
    try {
    
    const res = await handleCreateAccount(email, password, firstName, lastName, birthDayString)
    if(!res?.success) {
        Alert.alert("Something went wrong", "Please close the app and try again")
        const deleteRes = await deleteNullSFEntry(email, res.header);
        if(deleteRes.data.success) {
            setIsLoading(false) 
        } else {
            setIsLoading(false) 
        }

    } else if (res?.success) {
        dispatch(setUserToken(res.token))
        AsyncStorage.setItem("userToken", res?.token);
        setIsLoading(false)
    }
    
} catch(err) {
    console.log(err)
}
            
}
     
      async function handleSignup() {
        setIsLoading(true)
        try {
            
            setErrors({
                firstName:null,
                lastName: null,
                email:null,
                password: null,
            })
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
        if(!submitDisabled()) {
            if(password === repeatPassword) {
                if(mediumPassword.test(password)) {
                    if(moment().diff(moment(birthDayString), 'years',false) >= 18) {
                        if(privacyAccepted && termsAccepted) {
                            signUp(email.toLowerCase(), password, firstName, lastName, moment(birthDayString).format("YYYY-MM-DD"))
                        
                        } else {
                            setAcceptError("You have to accept our privacy policy and terms in order to accept")
                            setIsLoading(false)
                        }
                        
                    } else {
                        setAgeError("You have to be at least 18 years old to sign up")
                        setIsLoading(false)
                    }
                    
                    setErrors({
                        email: null,
                        firstName: null,
                        password: null,
                        lastName: null, 
                    })
                } else {
                    setErrors({
                        email: null,
                        firstName: null,
                        password: "Your password is not strong enough",
                        lastName: null, 
                    })
                    setIsLoading(false)
                }
            } else if(password !== repeatPassword) {
                setErrors({
                    email: null,
                    firstName: null,
                    password: "Your passwords don't match",
                    lastName: null, 
                })
                setIsLoading(false)
                
            }

        } else if(submitDisabled()) {
            setErrors({
                email: "Please enter a valid email address",
                firstName: "Your first name is required",
                password:"Please enter a password",
                lastName: "Your last name is required", 
            })
            setIsLoading(false)
            if(firstName.length > 0 && lastName.length === 0 && password.length === 0 && !reg.test(email)) {
                setErrors({
                    email: "Please enter a valid email address",
                    lastName: "Your last name is required", 
                    firstName: null,
                    password: "Please enter a password"
                })
                setIsLoading(false)
            } else if(firstName.length === 0 && lastName.length > 0 && password.length === 0 && !reg.test(email)) { 
                setErrors({
                    email: "Please enter a valid email address",
                    lastName: null, 
                    firstName: "Your first name is required",
                    password: "Please enter a password"
                })
                setIsLoading(false)
            } else if(firstName.length === 0 && lastName.length === 0 && password.length > 0 && !reg.test(email)) { 
                setErrors({
                    email: "Please enter a valid email address",
                    lastName: "Your last name is required", 
                    firstName: "Your first name is required",
                    password: null
                })
                setIsLoading(false)
            }else if(firstName.length === 0 && lastName.length === 0 && password.length === 0 && reg.test(email)) { 
                setErrors({
                    email: null,
                    lastName: "Your last name is required", 
                    firstName: "Your first name is required",
                    password: "Please enter a password"
                })
                setIsLoading(false)
            } else if(firstName.length > 0 && lastName.length > 0 && password.length > 0 && !reg.test(email)) { 
                setErrors({
                    email: "Please enter a valid email address",
                    lastName: null, 
                    firstName: null,
                    password: null
                })
                setIsLoading(false)
            }else if(firstName.length > 0 && lastName.length > 0 && password.length === 0 && !reg.test(email)) { 
                setErrors({
                    email: "Please enter a valid email address",
                    lastName: null, 
                    firstName: null,
                    password: "Please enter a password"
                })
                setIsLoading(false)
            } else if(firstName.length > 0 && lastName.length === 0 && password.length === 0 && !reg.test(email)) { 
                setErrors({
                    email: "Please enter a valid email address",
                    lastName: "Your last name is required", 
                    firstName: null,
                    password: "Please enter a password"
                })
                setIsLoading(false)
            } else if(firstName.length > 0 && lastName.length === 0 && password.length > 0 && !reg.test(email)) { 
                setErrors({
                    email: "Please enter a valid email address",
                    lastName: "Your last name is required", 
                    firstName: null,
                    password: null
                })
                setIsLoading(false)
            } else if(firstName.length === 0 && lastName.length === 0 && password.length > 0 && !reg.test(email)) { 
                setErrors({
                    email: "Please enter a valid email address",
                    lastName: "Your last name is required", 
                    firstName: "Your first name is required",
                    password: null
                })
                setIsLoading(false)
            }else if(firstName.length === 0 && lastName.length === 0 && password.length > 0 && reg.test(email)) { 
                setErrors({
                    email: null,
                    lastName: "Your last name is required", 
                    firstName: "Your first name is required",
                    password: null
                })
                setIsLoading(false)
            }else if(firstName.length > 0 && lastName.length === 0 && password.length > 0 && reg.test(email)) { 
                setErrors({
                    email: null,
                    lastName: "Your last name is required", 
                    firstName: null,
                    password: null
                })
                setIsLoading(false)
            }else if(firstName.length === 0 && lastName.length > 0 && password.length > 0 && reg.test(email)) { 
                setErrors({
                    email: null,
                    lastName: null, 
                    firstName: "Your first name is required",
                    password: null
                })
                setIsLoading(false)
            }else if(firstName.length > 0 && lastName.length > 0 && password.length === 0 && reg.test(email)) { 
                setErrors({
                    email: null,
                    lastName: null, 
                    firstName: null,
                    password: "Please enter a password"
                })
                setIsLoading(false)
            }else if(firstName.length > 0 && lastName.length === 0 && password.length === 0 && reg.test(email)) { 
                setErrors({
                    email: null,
                    lastName: "Please enter your last name", 
                    firstName: null,
                    password: "Please enter a password"
                })
                setIsLoading(false)
            }
              
        }

        } catch(err) {
            console.log(err)
        } 
    }
    
     
     
      function handleDatePress() {
        if(Platform.OS === "android") {
            DateTimePickerAndroid.open({
                mode:"date",
                display:"default",
                value: birthDayString,
                onChange: (event) => {
                    const {
                        type,
                        nativeEvent,

                      } = event;
                      console.log()
                      setBirthdayString(new Date(nativeEvent.timestamp))


                }
            })
        }
      }


    

   

    return (
        <View style={styles.masterContainer}>
            <ActivityIndicator color={"#2CA491"} animating={isLoading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
            <KeyboardAwareScrollView
                extraHeight={-64}
                extraScrollHeight={150}
                style={{width: "90%", }}
                contentContainerStyle={{
                    alignItems:"flex-start",
                    flexGrow: 1,
                    overflow:"scroll"
                }}
                >
                <InputAccessoryView nativeID="signUp">
                    <View style={styles.accessoryView}>
                        <TouchableOpacity style={styles.accessibilitArrowDown}>
                            <AntDesign name="arrowdown" size={27} color="#2CA491" />
                        </TouchableOpacity>
                    </View>
                
                </InputAccessoryView>
                <View style={styles.imgContainer}>
                    <Image style={styles.logo} source={require('../login/logo.jpg')} />
                </View>
                <View style={styles.topContainer}>
                    <View style={styles.headlineContainer}>
                        <Text style={styles.createAcc}>Create an account</Text>
                        <View style={styles.topTextContainer}>
                            <Text style={styles.alreadyMember}>Already a Budmember?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Signin")}><Text style={styles.signIn}>Sign In</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.socialContainer}>
                        <Text style={styles.signupWithSocial}>Sign up with Social</Text>
                        <Image style={styles.googleLogo} source={require("../../../assets/pictures/google.png")} />
                    </View>
                </View>  

                <View style={styles.lineContainer}>
                    <View style={styles.line}></View>
                        <Text style={styles.or}>Or</Text>
                    <View style={styles.line}></View>
                </View>

                <View style={styles.inputContainer}>
                    {!params? <View style={styles.inputSubContainer}>
                    {errors.email !== null ? <View style={{flexDirection:'row'}}><Text style={styles.label}>Email</Text><Text style={styles.errorText}>{errors.email}</Text></View> : <Text style={styles.label}>Email</Text>}
                        <TextInput onSubmitEditing={() => firstNameRef.current.focus()} ref={emailRef} keyboardType="email-address" textContentType="emailAddress" autoComplete="email" inputAccessoryViewID="signUp" onChangeText={(text) => setEmail(text)} editable={!navigation?.state?.params?.email ? true : false} value={email} style={errors.email !== null ? styles.inputFieldError : styles.inputField} />
                    </View> : null}
                    
                    <View style={styles.inputSubContainer}>
                    {errors.firstName !== null ? <View style={{flexDirection:'row'}}><Text style={styles.label}>First Name</Text><Text style={styles.errorText}>{errors.firstName}</Text></View> : <Text style={styles.label}>First Name</Text>}
                        <TextInput
                            ref={firstNameRef}
                            value={firstName} 
                            autoComplete="name-given"
                            textContentType="givenName"
                            inputAccessoryViewID="signUp"
                            onChangeText={(text) => setFirstName(text)}
                            onSubmitEditing={() => lastNameRef.current.focus()}
                            blurOnSubmit={false}
                            style={errors.firstName !== null ? styles.inputFieldError : styles.inputField} />
                    </View>

                    <View style={styles.inputSubContainer}>
                    {errors.lastName !== null ? <View style={{flexDirection:'row'}}><Text style={styles.label}>Last Name</Text><Text style={styles.errorText}>{errors.lastName}</Text></View> : <Text style={styles.label}>Last Name</Text>}
                        <TextInput
                            ref={lastNameRef}
                            inputAccessoryViewID="signUp"
                            autoComplete="name-family"
                            textContentType="familyName"
                            value={lastName} 
                            onChangeText={(text) => setLastName(text)}
                            onSubmitEditing={() => passwordRef.current.focus()}
                            blurOnSubmit={false}
                            style={errors.lastName!== null ? styles.inputFieldError : styles.inputField} />
                    </View>

                    <View style={styles.inputSubContainer}> 
                        {errors.password !== null ? <View style={{flexDirection:'row'}}><Text style={styles.label}>Password</Text><Text style={styles.errorText}>{errors.password}</Text></View> : <Text style={styles.label}>Password</Text>}
                        <TextInput 
                            ref={passwordRef}
                            inputAccessoryViewID="signUp"
                            secureTextEntry={true} 
                            style={errors.password !== null ? styles.inputFieldError : styles.inputField}
                            value={password} 
                            onSubmitEditing={() => passwordRepeatRef.current.focus()}
                            blurOnSubmit={false}
                            onChangeText={(text) => setPassword(text)}
                             />
                    </View>
                    <View style={styles.inputSubContainer}>  
                        {errors.password !== null ? <View style={{flexDirection:'row'}}><Text style={styles.label}>Password</Text><Text style={styles.errorText}>{errors.password}</Text></View> : <Text style={styles.label}>Repeat Password</Text>}
                        <TextInput 
                            ref={passwordRepeatRef}
                            inputAccessoryViewID="signUp"
                            secureTextEntry={true}   
                            style={errors.password !== null ? styles.inputFieldError : styles.inputField}
                            value={repeatPassword} 
                            blurOnSubmit={false}
                            onChangeText={(text) => setRepeatPassword(text)}
                             />
                    
                    </View> 
                    
                    </View>
                    

                            {Platform.OS === "ios" ? 
                            <View>
                            <View style={styles.dateContainer}>
                                <Text style={styles.bdayText}> Birthdate: </Text>
                                <DateTimePicker 
                                    ref={datePickRef} 
                                    mode="date"
                                    themeVariant='dark'
                                    style={styles.iosPicker}
                                    display="default"
                                    value={birthDayString}
                                    onChange={(event) => {
                                    const {type, nativeEvent, timeStamp} = event;
                                    
                                    if(nativeEvent.timestamp) {
                                        setBirthdayString(new Date(nativeEvent.timestamp))
                                    }
                                
                                }} />

                                </View>
                                {ageError !== null ? <Text style={[styles.errorText, {marginLeft: 0}]}>{ageError}</Text> : null}
                                </View>
                        
                            
                            :
                            <View>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.bdayText}> Birthdate: </Text>
                                    <TouchableOpacity style={styles.androidBtnOpacity} onPress={handleDatePress} >
                                        <Text style={styles.androidBtnText}>{moment(birthDayString).format("M/D/YY")}</Text>
                                    </TouchableOpacity>
                                </View>
                                {ageError !== null ? <Text style={styles.errorText}>{ageError}</Text> : null}
                            </View>
                               }
                            
                            
                
                
                <View style={styles.termsPrivacy}>
                    <Text style={styles.termsHeadline}>By clicking create account, I agree that:</Text>
                    <View style={styles.termsStatementContainer}>
                        <Checkbox
                            ref={checkBox1}
                            value={termsAccepted}
                            onValueChange={setTermsAccepted}
                            style={styles.checkbox}
                            />
                        <Text style={styles.termsStatement}>I have read and accepted the <A href="https://budmember.com/terms-and-conditions/" style={styles.link}>terms & conditions</A></Text>
                    </View>
                    <View style={styles.termsStatementContainer}>
                        <Checkbox
                            ref={checkBox2}
                            value={privacyAccepted}
                            onValueChange={setPrivacyAccepted}
                            style={styles.checkbox}
                        />
                        <Text style={styles.termsStatement}>I have read and accepted the <A href="https://budmember.com/privacy-policy/" style={styles.link}>privacy policy</A></Text>
                    </View> 
                    {acceptError !== null ? <Text style={[styles.errorText, {marginLeft: 0, marginTop: 10}]}>{acceptError}</Text> : null}
                </View>

                <TouchableOpacity disabled={isLoading} onPress={handleSignup} style={styles.btn}>
                    <Text style={styles.btnText}>{isLoading? "Please Wait...": "Create Account"}</Text>
                </TouchableOpacity>
                </KeyboardAwareScrollView>
                
                
            
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex:1,
        backgroundColor:"#2a1b6e",
        width: "100%", 
        justifyContent: "center",
        alignItems: "center",   
    },
    accessoryView: {
        width: "100%",
        height: 50,
        backgroundColor:"#D3D3D3",
        justifyContent: "center",
        alignItems:"flex-end",
    },
    accessibilitArrowDown: {
        height: 35,
        width: 35,
        backgroundColor: "#bebebe",
        borderRadius: 8,
        justifyContent: "center",
        alignItems:"center",
        marginRight: 25,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    iosPicker: {
       
    },
    androidBtnOpacity:{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: 8,
        marginLeft: 35,
        

    },
    bdayText : {
        color: "white",
        fontSize: 19
        
    },
    androidBtnText: {
        color:"white",
        fontSize: 14,
        padding: 6,
    },
    dateContainer: {
        flex:1, 
        flexDirection: "row",
        alignItems:'center',
        marginTop:20,
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
        height: "150%",
        
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
        marginBottom:10,
    },
    createAcc:{
        color: "#dbdbdb",
        fontSize: 25,
        
    },

    topTextContainer: {
        flexDirection: "row",
    },

    alreadyMember: {
        color: "#dbdbdb",
        fontSize: 14,
        marginRight: 7,
    },

    signIn: {
        color: "#2da491",
        textDecorationLine: "underline",
        fontSize: 14,
    },

    imgContainer: {
        width: "100%",
        height: 150,
        
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
        color: "#dbdbdb", 
        fontSize: 21,
    },

    label: {
        color: "#dbdbdb", 
        fontSize: 12,
        marginBottom:6,
    },
    errorText: {
        fontSize: 12,
        color: "#d9534f",
        marginLeft: 25,
        marginBottom: 6,
    },
    inputField: {
        backgroundColor: "#fff",
        minHeight: 35,
        borderRadius: 5,
        paddingLeft:10,
    },
    inputFieldError: {
        backgroundColor: "#d9534f",
        opacity: 0.9,
        borderColor: "#d9534f",
        minHeight: 35,
        borderRadius: 5,
        paddingLeft:10,
    },

    dateOfBirth: {
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

    },
    checkbox: {
        marginRight: 15,
    },
    termsStatementContainer: {
        marginLeft: 0,
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginTop: 6,
    },
    termsStatement : {
        color: "#b4b4b4",
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
        marginBottom: 300,
       
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
        fontSize: 20,
        textAlign: "center",
    }
    
})



//New Modal
// <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={modalOpen}
//                 onRequestClose={() => {
//           Alert.alert('Modal has been closed.');
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.modalContainer}>
//             <View style={styles.modalBox}>
//                 <View style={styles.picker}>
//                 <Text style={styles.dobText}>Please select your date of birth</Text>
//                     <DatePicker 
//                         onChange={(value) => setBirthDayString(moment(value).format("YYYY-MM-DD"))}
//                         format="yyyy-mm-dd"
                        
//                     />
//                 </View>
//                 <TouchableOpacity onPress={() => setModalOpen(false)} style={styles.btn2}>
//                     <Text style={styles.btnText2}>Confirm</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
        
//         </Modal>













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




// <DropDownPicker
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
//                             items={["31"]} 
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