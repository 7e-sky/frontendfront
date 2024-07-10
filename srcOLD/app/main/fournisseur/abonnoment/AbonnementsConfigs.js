import { CommandesAppConfig } from "./commandeJeton/CommandesAppConfig";
import { commandeAbonnementConfigs } from "./commandeAbonnement/commandeAbonnementConfigs";
import { abonnementConfigs } from "./abonnement/abonnementConfigs";
import { renouvelerAbonnementConfigs } from "./renouvelerAbonnement/renouvelerAbonnementConfigs";

export const AbonnementsConfigs = [
    CommandesAppConfig,
    commandeAbonnementConfigs,
    abonnementConfigs,
    renouvelerAbonnementConfigs
];
