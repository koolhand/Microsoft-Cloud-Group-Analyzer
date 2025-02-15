const helper = require('../helper');

async function init(accessToken, accessTokenAzure, groupID, groupName, tenantID) {
    let result = await helper.getAllWithNextLink(accessToken, `/beta/groups/${groupID}/memberOf`)

    if (result == undefined) {
        return null
    }
    
    return result
        .filter(res => res['@odata.type'] == '#microsoft.graph.group')    
        .map(res => ({
            "file": 'groups',
            "groupID": groupID,
            "service": "Entra ID Group",
            "resourceID": res.id,
            "name": res.displayName,
            "details": `Parent group of '${groupName}'`
    }))
}


module.exports = { init }