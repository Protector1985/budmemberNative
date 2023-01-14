import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchCognitoUser from './fetchCognitoUser'
import fetchDispensaries from './fetchDispensaries'
import fetchImage from './fetchImage'
import fetchPlans from './fetchPlans'
import fetchUserData from './fetchUserData'
import getLocation from './getLocation'

export default function useInitData() {
    const {userSlice} = useSelector((state) => state)
    const {cognitoData} = useSelector((state) => state.cognitoDataSlice);
    const {avatarUri} = userSlice
    const dispatch = useDispatch()
    const [initState, setInitState] = useState({})

   

    function fetchData() {
        try {
        //gets location
        setInitState({
            progress: 0.10,
            stepsLeft: 4,
            message: "Getting permissions/fetching dispensaries"
        })
        getLocation(dispatch)
        fetchDispensaries(dispatch, cognitoData)
        //fetches initial user state
        setInitState({
            progress: 0.20,
            stepsLeft: 4,
            message: "Checking for your data on our servers"
        })
        
        fetchUserData(dispatch)
        .then(async (res) => {
            if(res) {
            setInitState({
                progress: 0.25,
                stepsLeft: 3,
                message: "Found you! Fetching your avatar picture"
            })
            const steps = []
            //fetches avatar picture
            const imageFetched = await fetchImage(res.Email, dispatch, avatarUri)
            setInitState({
                progress: 0.60,
                stepsLeft: 2,
                message: "Awesome! Looking for your store's plans"
            })
            //fetches plans (packages) by store
            const plansFetched = await fetchPlans(dispatch, res.OwnerId)
            setInitState({
                progress: 0.92,
                stepsLeft: 1,
                message: "You have tons of options! Finishing up your profile!"
            })
            //fetches cognito information
            const cognitoFetched = fetchCognitoUser(dispatch, res.Email, res.Membership_Status__c)
            setInitState({
                progress: 0.99,
                stepsLeft: 0,
                message: "Finishing!"
            })
        } else {
            //logout
        }
     })    
    }catch(err) {
        console.log(err)
    }
    }

    function fetchDataUpdate() {
        //fetches initial user state
        setInitState({})
        setInitState({
            progress: 0.10,
            stepsLeft: 4,
            message: "Updating your data"
        })
        fetchUserData(dispatch)
        .then(async (res) => {
            setInitState({
                progress: 0.25,
                stepsLeft: 3,
                message: "Getting my stuff together"
            })
            const steps = []
            //fetches avatar picture
            const imageFetched = await fetchImage(res.Email, dispatch, avatarUri)
            setInitState({
                progress: 0.60,
                stepsLeft: 2,
                message: "Making sure you continue to save BIG"
            })
            //fetches plans (packages) by store
            const plansFetched = await fetchPlans(dispatch, res.OwnerId)
            setInitState({
                progress: 0.92,
                stepsLeft: 1,
                message: "Putting your account back together!"
            })
            //fetches cognito information
            const cognitoFetched = fetchCognitoUser(dispatch, res.Email)
            setInitState({
                progress: 0.99,
                stepsLeft: 0,
                message: "Almost Done!"
            })
        })    
    }
    //------INIT - ALL STARTING STATE------
    return {
        initProgress: initState,
        fetchAllData: fetchData,
        fetchAllDataUpdate: fetchDataUpdate,
    }
}
