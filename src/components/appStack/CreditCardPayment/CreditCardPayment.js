import {
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
  } from 'react-native'

import LottieView from 'lottie-react-native'
import { FormProvider, useForm } from 'react-hook-form'
import CreditCardForm, { Button, FormModel } from 'rn-credit-card'
import { useDispatch, useSelector } from 'react-redux';
import { setCCDetails} from '../../../store/paymentInfoSlice';
export default function CreditCardPayment({navigation}) {
  
  const dispatch = useDispatch();
    const formMethods = useForm({
        // to trigger the validation on the blur event
        mode: 'onBlur',
        defaultValues: {
          holderName: '',
          cardNumber: '',
          expiration: '',
          cvv: '',
          zip: '',
        },
      })
      const {  formState, getValues } = formMethods
   
      function handleSubmit(e) {
        const values = getValues()
        dispatch(setCCDetails(values))
        navigation.navigate("Billing Information")
      }
      
      return (
        <FormProvider {...formMethods}>
          <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              style={styles.avoider}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <CreditCardForm
                LottieView={LottieView}
                horizontalStart={false}
                overrides={{
                  labelText: {
                    marginTop: 16,
                  },
                }}
              />
            </KeyboardAvoidingView>
            {formState.isValid && (
              <Button
                style={styles.button}
                title={'CONFIRM PAYMENT'}
                onPress={handleSubmit}
              />
            )}
          </SafeAreaView>
        </FormProvider>
      )
    }


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "white",
        },
        avoider: {
          flex: 1,
          padding: 36,
        },
        button: {
          margin: 36,
          marginTop: 0,
        },
      })