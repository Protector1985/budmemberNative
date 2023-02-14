import { cardOnFileMembershipChange } from "../../../../api/nodeApi";

export default async function changeWithCardOnFile(email, selected, previous, membershipPlans, setLoading) {
  const selectedPlanData = membershipPlans.filter((plan) => plan.Id === selected)
  const previousPlanData = membershipPlans.filter((plan) => plan.Id === previous)

try {
  const dueNow = Number(previousPlanData[0].Package_Amount__c) >= Number(selectedPlanData[0].Package_Amount__c) ? 0 : Math.abs(Number(selectedPlanData[0].Package_Amount__c) - Number(previousPlanData[0].Package_Amount__c))

  return await cardOnFileMembershipChange(email, selected, dueNow)

    
  }catch (err) {
    console.log(err)
  }
}