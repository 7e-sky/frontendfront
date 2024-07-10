import { AdminsAppConfig } from "./admins/AdminsAppConfig";
import { ZonesAppConfig } from "./zones/ZonesAppConfig";
import { CommercialsAppConfig } from "./commercials/CommercialsAppConfig";
import { fournisseursConfigs } from "./fournisseurs/fournisseursConfigs";
import { acheteursConfigs } from "./acheteurs/acheteursConfigs";

export const utilisateursConfigs = [
    AdminsAppConfig,
    ZonesAppConfig,
    CommercialsAppConfig,
    fournisseursConfigs,
    acheteursConfigs
];
