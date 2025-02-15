const helper = require('../helper');

async function init(accessToken, accessTokenAzure, groupID, groupName, tenantID) {
    let result = await helper.getAllWithNextLink(accessToken, `/beta/groups/${groupID}/appRoleAssignments`)

    if (result == undefined) {
        return null
    }

    return result
        .map(res => ({
            "file": 'app',
            "groupID": groupID,
            "service": "Entra ID Enterprise Application",
            "resourceID": res.id,
            "name": res.resourceDisplayName,
            "details": `has member group '${groupName}'`
    }))
}


module.exports = { init }