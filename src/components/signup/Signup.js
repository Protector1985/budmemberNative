import {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import {useFonts} from 'expo-font'
import moment from 'moment'
import DropDownPicker from 'react-native-dropdown-picker';

//lib imports
import generateDaysInMonth from '../lib/generateDaysInMonth';
import {months} from '../lib/monthsObject'
import { generateYears } from "../lib/years";

export default function Signup() {
    

    //state for forms
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //state for dropdown
    const [monthOpen, setMonthOpen] = useState(false)
    const [dayOpen, setDayOpen] = useState(false)
    const [yearOpen, setYearOpen] = useState(false)
    const [birthMonth, setBirthMonth] = useState();
    const [birthYear, setBirthYear] = useState();
    const [daysInMonth, setDaysInMonth] = useState("")
    const [dayOfBirth, setDayOfBirth] = useState({label:"", value:""});

    
    //generates array of years since 1900
    let years = generateYears();
    const birthDayString = `${birthYear}-${moment().month(Number(birthMonth) - 1).format("MM")}-${dayOfBirth}`
    //sets state for font
    const [regular] = useFonts({
        Roboto: require('../../../assets/fonts/roboto-regular.ttf'),
      });

    


      //Initialize dropdown values ----
        useEffect(() => {
            const monthIndex = moment().month();
            setBirthMonth(months[monthIndex].value)
            setBirthYear(moment().subtract(18, 'years').format("YYYY"))
            setDayOfBirth(moment().format("DD"))
            const days = moment(`${moment().subtract(18, 'years').format("YYYY")}-${months[monthIndex].label}`, "YYYY-MMMM").daysInMonth()
            setDaysInMonth(JSON.stringify(generateDaysInMonth(days)))
      }, [])
      //----end of dropdown initialization




      //side effect functions from dropdown ----------- 
      //sets days per month dynamically when year and month is changed - includes leap year
      //closes dropdown after selection
      function monthValSideEffects(value) {
        const days = moment(`${Number(birthYear)}-${months[Number(value) -1].label}`, "YYYY-MMMM").daysInMonth();
        
        //stringified value to avoid re-renders
        setDaysInMonth(JSON.stringify(generateDaysInMonth(days)))
      }

      function yearValSideEffects(value) {
        const days = moment(`${value}-${months[Number(birthMonth) -1].label})`, "YYYY-MMMM").daysInMonth();
        const dim = generateDaysInMonth(days)
        
        //stringified value to avoid re-renders
        setDaysInMonth(JSON.stringify(dim))
      }
      //-----end of side effect functions
      if (!regular) {
        return null;
      }

    return (
        <View style={styles.masterContainer}>
            <View style={styles.subContainer}>
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
                        <TextInput style={styles.inputField} />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput style={styles.inputField} />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput style={styles.inputField} />
                    </View>

                    <View style={styles.inputSubContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.inputField} />
                    </View>

                </View>

                <View style={styles.bottomContainer}>
                    <Text style={styles.dateOfBirth}>Date of Birth</Text>
                    <View style={styles.dropDownContainer}>
                    
                    <View style={styles.indDropDownContainer}>
                        <Text style={styles.label}>Month</Text>
                        <DropDownPicker
                            style={styles.dropdownGlobalStyle} 
                            placeholder={birthMonth}
                            containerStyle={styles.dropDownLong} 
                            value={birthMonth} 
                            items={months} 
                            setValue={setBirthMonth} 
                            onClose={() => setMonthOpen(false)} 
                            onChangeValue={(value) => monthValSideEffects(value)} 
                            open={monthOpen} 
                            setOpen={() => setMonthOpen(true)} />
                    </View>
                    <View style={styles.indDropDownContainer}>
                        <Text style={styles.label}>Day</Text>
                        <DropDownPicker 
                            placeholder={dayOfBirth}
                            containerStyle={styles.dropDownShort} 
                            value={dayOfBirth} 
                            items={JSON.parse(daysInMonth)} 
                            setValue={setDayOfBirth} 
                            onClose={() => setDayOpen(false)} 
                            open={dayOpen} 
                            setOpen={() => setDayOpen(true)} />
                    </View>
                    <View style={styles.indDropDownContainer}>
                        <Text style={styles.label}>Year</Text>
                        <DropDownPicker 
                            placeholder={birthYear}
                            containerStyle={styles.dropDownLong} 
                            value={birthYear} 
                            items={years} 
                            setValue={setBirthYear} 
                            open={yearOpen} 
                            onClose={() => setYearOpen(false)} 
                            onChangeValue={(value) => yearValSideEffects(value)} 
                            setOpen={() => setYearOpen(true)}/>
                    </View>
                    
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    masterContainer: {
        flex:1,
        backgroundColor:"#2a1b6e",
        height: "100%",
        width: "100%", 
        justifyContent: "center",
        alignItems: "center",      
    },

    subContainer: {
        flex: 1,
        width: "90%",
        height: "90%",
    },

    topContainer: {
        flex: 1,
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
        flex: 1,
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
    },

    lineContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "2%",
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
       }
    
})