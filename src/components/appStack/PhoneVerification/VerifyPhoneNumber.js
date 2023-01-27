import {Animated, Image, SafeAreaView, Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { phoneNumberVerification, updateUser } from '../../../api/nodeApi';
import Alert from '../../utils/Alert';
import { closeDrawer } from '../../../store/drawerSlice';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 6;


const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

function VerifyPhoneNumber({navigation, numberState}){
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("")
  const [alertOpen, setAlertOpen] = useState(false)
  const {colorPalette, MobilePhone, Email} = useSelector((state) => state.userSlice)

  const dispatch = useDispatch()
    
    React.useEffect(() => {
        dispatch(closeDrawer())
    },[])


  function sanitizeNumber(MobilePhone) {
    var cleaned = ('' + MobilePhone).replace(/\D/g, '')
    
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
            const number = [ '(', match[2], ') ', match[3], '-', match[4]].join('');
        return number
    } 
    return MobilePhone
}

  async function handleResend() {
    setLoading(true)
    try {
      const usr = await updateUser({
        update: { MobilePhone: MobilePhone },
        onboardingStep: '4',
      });
      if(usr.data.success) {
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      }
    } catch(err) {
      console.log(err)
    }
    
  }

  async function handlePress() {
    try {
    setLoading(true)
    const res = await phoneNumberVerification({
        phoneNumber: MobilePhone,
        code: value,
        email: Email
      });


      if (res?.data?.success) {
        //means that the verify code is correct
            updateUser({
            phone_number_verified: true,
            onboardingStep:  '5',
            });
            numberState? navigation.navigate("Profile") : navigation.navigate("Payment Information")
            
        } else {
            setLoading(false)
            setAlertMessage("Wrong code")
            setAlertType("WARNING")
            setAlertOpen(true)
        }
    } catch(err) {
            setLoading(false)
            setAlertMessage("Server Error. Please close the app and try again.")
            setAlertType("ERROR")
            setAlertOpen(true)
        }

  }

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
    <ActivityIndicator color={colorPalette.accentSecondary} animating={loading} style={{zIndex: 10000, position: 'absolute', alignSelf: "center", top: "50%", bottom: "50%"}} size="large" />
      <Text style={styles.title}>Verification</Text>
      <Image style={styles.icon} source={require("../../../assets/pictures/lock.png")} />
      <Text style={styles.subTitle}>
        Please enter the verification code{'\n'}
        we sent to {`${sanitizeNumber(MobilePhone)}`}{'\n'}{'\n'}
      </Text>
        <View style={styles.centerContainer}>
        <View style={styles.btnWrapper}>
            <TouchableOpacity onPress={() => navigation.navigate("Verify Phone Number")}>
              <Text style={[styles.resendText, {color: colorPalette.accent}]}>Change Phone Number</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.btnWrapper, {marginTop: 15}]}>
            <TouchableOpacity onPress={handleResend}>
              <Text style={[styles.resendText, {color: colorPalette.accent}]}>Resend Code</Text>
            </TouchableOpacity>
          </View>
          
          
        </View>
      

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <Alert visible={alertOpen} setVisible={setAlertOpen} message={alertMessage} type={alertType}/>
      
      <TouchableOpacity disabled={loading} onPress={handlePress} style={[styles.nextButton, {backgroundColor: colorPalette.accent }]}>
        <Text style={styles.nextButtonText}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyPhoneNumber;

