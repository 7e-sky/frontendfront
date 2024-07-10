import { parametresConfigs } from "./parametres/parametresConfigs";
import { utilisateursConfigs } from "./utilisateurs/utilisateursConfigs";
import { demandeConfigs } from "./demande_achat/demandeConfigs";
import { abonnementsConfigs } from "./abonnements/abonnementsConfigs";
import { demandeDevisConfigs } from "./demandeDevis/demandeDevisConfigs";
import { produitConfigs } from "./gestion_produit/produitConfigs";
import { portailConfigs } from "./portail/portailConfigs";
import { contactFournisseurConfigs } from "./contactFournisseur/contactFournisseurConfigs";
import { compteProvisoireConfigs } from "./compteProvisoire/compteProvisoireConfigs";

export const administrateurConfigs = [
    ...parametresConfigs,
    ...utilisateursConfigs,
    ...abonnementsConfigs,
    ...portailConfigs,
    ...compteProvisoireConfigs,
    demandeDevisConfigs,
    demandeConfigs,
    produitConfigs,
    contactFournisseurConfigs
];
