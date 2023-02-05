import {View} from 'react-native'


export default function ApplePay() {
    const DETAILS = {
        id: 'basic-example',
        displayItems: [
          {
            label: 'VIP Membership',
            amount: { currency: 'USD', value: '49.00' }
          },
        ],
        total: {
          label: 'Bare Dispensary',
          amount: { currency: 'USD', value: '49.00' }
        }
      };

      const METHOD_DATA = [{
        supportedMethods: ['apple-pay'],
        data: {
          merchantIdentifier: 'merchant.com.budmember',
          supportedNetworks: ['visa', 'mastercard', 'amex'],
          countryCode: 'US',
          currencyCode: 'USD'
        }
      }];

      const OPTIONS = {
        requestPayerName: true,
        requestPayerPhone: true,
        requestPayerEmail: true,
        requestShipping: true
      };

      const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, OPTIONS);

      paymentRequest.canMakePayments()
        .then((canMakePayment) => {
            if (canMakePayment) {
            Alert.alert(
                'Apple Pay',
                'Apple Pay is available in this device'
            );
            }
      })
    return (
        <View>
        
        </View>
    )
}