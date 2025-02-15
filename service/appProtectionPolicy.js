const helper = require('../helper');

async function init(accessToken, accessTokenAzure, groupID, groupName, tenantID) {
    let windows = await helper.getAllWithNextLink(accessToken, `/beta/deviceAppManagement/mdmWindowsInformationProtectionPolicies?$expand=assignments`)
    let ios = await helper.getAllWithNextLink(accessToken, `/beta/deviceAppManagement/iosManagedAppProtections?$expand=assignments`)
    let android = await helper.getAllWithNextLink(accessToken, `/beta/deviceAppManagement/androidManagedAppProtections?$expand=assignments`)
    let windowsIP = await helper.getAllWithNextLink(accessToken, `/beta/deviceAppManagement/windowsInformationProtectionPolicies?$expand=assignments`)
    let combinedArray = windows.concat(ios, android, windowsIP);

    if (combinedArray == undefined) {
        return null
    }

    return combinedArray
        .filter(res => (res.assignments.filter(assignment => assignment.target.groupId == groupID)?.length > 0))
        .map(res => ({
            "file": 'appProtectionPolicy',
            "groupID": groupID,
            "service": "Intune App Protection Policy",
            "resourceID": res.id,
            "name": res.displayName,
            "details": `group '${groupName}'`
    }))
}


module.exports = { init }