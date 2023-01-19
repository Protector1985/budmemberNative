import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import fetchCognitoUser from './fetchCognitoUser'
import fetchDispensaries from './fetchDispensaries'
import fetchImage from './fetchImage'
import fetchPlans from './fetchPlans'
import fetchUserData from './fetchUserData'
import fetchUserPurchases from './fetchUserPurchases'
import getLocation from './getLocation'

export default function _init(locationPermission, userSlice, cognitoData, avatarUri, dispatch, setInitState) {
    
    async function fetchData() {
        try {
        //gets location
        setInitState({
            progress: 0.10,
            stepsLeft: 8,
            message: "Getting permissions/fetching dispensaries"
        })
        
        //fetches initial user state
        setInitState({
            progress: 0.25,
            stepsLeft: 7,
            message: "Checking for your data on our servers"
        })
        const res = await fetchUserData(dispatch)
            if(res) {
                setInitState({
                    progress: 0.25,
                    stepsLeft: 6,
                    message: "Found you! Fetching your location"
                })
                
            getLocation(dispatch, locationPermission)
            setInitState({
                progress: 0.35,
                stepsLeft: 5,
                message: "Fetching your avatar picture"
            })
            //fetches avatar picture
            await fetchImage(res?.Email, dispatch, avatarUri)
            setInitState({
                progress: 0.60,
                stepsLeft: 4,
                message: "Awesome! Looking for stores in your area"
            })
            //fetches plans (packages) by store
            await fetchDispensaries(dispatch, cognitoData)
            setInitState({
                progress: 0.86,
                stepsLeft: 3,
                message: "Checking your previous purchases"
            })
            fetchUserPurchases(dispatch)
            setInitState({
                progress: 0.86,
                stepsLeft: 2,
                message: "Finding the plans of your favorite store!"
            })
            await fetchPlans(dispatch, res?.OwnerId)
            setInitState({
                progress: 0.92,
                stepsLeft: 1,
                message: "You have tons of options! Finishing up your profile!"
            })
             //fetches cognito information
            
            await fetchCognitoUser(dispatch, res.Email, res.Membership_Status__c)
            setInitState({
                progress: 0.99,
                stepsLeft: 0,
                message: "Finishing!"
            })
                   
        } else {
            //logout
        }
   
    }catch(err) {
        console.log(err)
    }
    }
    fetchData()
    //------INIT - ALL STARTING STATE------

}
