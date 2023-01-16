export default async function submitExisting
(
    firstName, 
    lastName, 
    paymentInfo, 
    street, 
    city, 
    state, 
    zip, email, 
    lastChargeDate, 
    packageId, 
    setAlertOpen, 
    setLoading, 
    setAlertMessage, 
    setAlertType
    ) {

    setLoading(true);
   
    

    const res = await submitCreditRecharge({
      billingFirstName: firstName,
      billingLastName: lastName,
      cardExpirationDate: `${paymentInfo.expiration.slice(0,2)}${paymentInfo.expiration.slice(3,5)}`,
      cardNumber: paymentInfo.cardNumber.trim(),
      cvv: paymentInfo.cvv,
      MailingStreet: street,
      MailingCity: city,
      MailingState: state,
      MailingPostalCode: zip,
      email: email,
      startDate: lastChargeDate,
      packageId
    })
  
    if(res.data.success) {
        setLoading(false);
        setAlertOpen(true);
        setAlertMessage(res.data.msg)
        setAlertType("SUCCESS")    
    } else if(!res.data.success) {
        setLoading(false);
        setAlertOpen(true);
        setAlertMessage(res.data.msg)
        setAlertType("SUCCESS")
    }
  }