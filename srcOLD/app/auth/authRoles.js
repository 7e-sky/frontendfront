/**
 * Authorization Roles
 */
const authRoles = {
    admin           : ['ROLE_ADMIN'],
    acheteur_pre    : ['ROLE_ACHETEUR_PRE'],
    acheteur        : ['ROLE_ACHETEUR'],
    fournisseur_pre : ['ROLE_FOURNISSEUR_PRE'],
    fournisseur     : ['ROLE_FOURNISSEUR'],
    registe         : ['ROLE_ACHETEUR', 'ROLE_FOURNISSEUR','ROLE_ADMIN'],
    onlyGuest: []
};

export default authRoles;
