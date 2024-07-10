import { demandeConfigs } from "./demande_achat/demandeConfigs";
import { produitConfigs } from "./gestion_produit/produitConfigs";
import { ProfileConfigs } from "./profile/ProfileConfigs";
import { consultationConfigs } from "./mes_consultations/consultationConfigs";
import { PersonnelsAppConfig } from "./personnel/PersonnelsAppConfig";
import { AbonnementsConfigs } from "./abonnoment/AbonnementsConfigs";
import { DashboardAppConfig } from "./dashboard/DashboardAppConfig";
import { demandeDevisConfigs } from "./demandeDevis/demandeDevisConfigs";
import { messagesConfigs } from "./messages/messagesConfigs";
import { childsConfigs } from "./childs/childsConfigs";
import { BillingAppConfig } from "./billing/BillingAppConfig";


export const fournisseurConfigs = [
    demandeConfigs,
    demandeDevisConfigs,
    messagesConfigs,
    produitConfigs,
    ProfileConfigs,
    consultationConfigs,
    PersonnelsAppConfig,
    DashboardAppConfig,
    childsConfigs,
    BillingAppConfig,
    ...AbonnementsConfigs
];
