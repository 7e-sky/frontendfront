import { IndexConfig } from './index/IndexConfig';
import { ProduitConfig } from './produit/ProduitConfig';
import { FournisseurConfig } from './fournisseur/FournisseurConfig';
import { demandeAchatConfig } from './demande-achat/demandeAchatConfig';
import { newsConfig } from './news/newsConfig';
import { faqsConfig } from './faqs/faqsConfig';
import { parcourirSecteursConfig } from './parcourir-secteurs/parcourirSecteursConfig';
import { ConditionsConfig } from './conditions/ConditionsConfig';
import { TarifsConfig } from './tarifs/TarifsConfig';

export const PortailConfig = [
    ProduitConfig,
    FournisseurConfig,
    IndexConfig,
    demandeAchatConfig,
    newsConfig,
    parcourirSecteursConfig,
    faqsConfig,
    ConditionsConfig,
    TarifsConfig
];
