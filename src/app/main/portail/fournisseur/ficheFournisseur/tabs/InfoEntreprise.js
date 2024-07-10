import React from "react";
import { FuseAnimateGroup } from "@fuse";
import { URL_SITE } from "@fuse/Constants";
import {
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Icon,
  Chip,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Link2 from "@material-ui/core/Link";
import _ from "@lodash";

function InfoEntreprise(props) {
  const params = props.match.params;
  const { id, slug } = params;
  const data = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.data
  );
  const produitsApercu = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.produitsApercu
  );
  const loadingProduitsApercu = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.loadingProduitsApercu
  );
  const loading = useSelector(
    ({ fournisseursApp }) => fournisseursApp.fournisseur.loading
  );

  if (!data) {
    return null;
  }

  /*
    const {general, work, contact, groups, friends} = data;
    */
  return (
    <div className="p-20">
      {loading ? (
        "loading ... "
      ) : (
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn",
          }}
        >
          <Typography className=" text-justify leading-relaxed text-14 whitespace-pre-line">
            {data.description}
          </Typography>
          <Typography
            variant="h2"
            className="my-24 p-12 bg-gray-300 uppercase font-bold text-16"
          >
            Aperçu du catalogue produits
          </Typography>
          {!loadingProduitsApercu ? (
            produitsApercu.length > 0 ? (
              <GridList className="" spacing={8} cols={0}>
                {produitsApercu &&
                  produitsApercu.map((item, index) => (
                    <GridListTile
                      classes={{
                        root: "w-full sm:w-1/2 md:w-1/4",
                        tile: "rounded-8",
                      }}
                      component={Link}
                      to={`/detail-produit/${item.sousSecteurs.slug}/${item.categorie.slug}/${item.id}-${item.slug}`}
                      key={index}
                    >
                      <img
                        src={
                          item.featuredImageId
                            ? URL_SITE + item.featuredImageId.url
                            : "assets/images/ecommerce/product-placeholder.jpg"
                        }
                        alt={item.titre}
                      />
                      <GridListTileBar
                        title={item.titre}
                        actionIcon={
                          <IconButton
                            component={Link}
                            to={`/detail-produit/${item.sousSecteurs.slug}/${item.categorie.slug}/${item.id}-${item.slug}`}
                          >
                            <Icon className="text-white opacity-75">
                              arrow_forward_ios
                            </Icon>
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  ))}
              </GridList>
            ) : (
              <div className="text-center mt-16">
                Aucun produit n'est ajouté par cette entreprise
              </div>
            )
          ) : (
            <div className="text-center mt-16">Chargement...</div>
          )}

          {produitsApercu.length > 0 && (
            <div className="text-right mt-16">
              <Link2
                component={Link}
                to={`/entreprise/${id}-${slug}/produits`}
                className=""
              >
                Voir tout le catalogue de produits >
              </Link2>
            </div>
          )}

          <Typography
            variant="h2"
            className="my-24 p-12 bg-gray-300 uppercase font-bold text-16"
          >
            Activités
          </Typography>
          {data.categories &&
            data.categories.map((item, index) => (
              <Chip
                label={_.capitalize(item.name)}
                classes={{
                  root: "h-24",
                  label: "pl-4 pr-6 py-4 text-11",
                }}
                onClick={() =>
                  item.sousSecteurs[0] &&
                  props.history.push({
                    pathname:
                      "/entreprises/" +
                      item.sousSecteurs[0].secteur.slug +
                      "/" +
                      item.sousSecteurs[0].slug +
                      "/" +
                      item.slug,
                  })
                }
                key={index}
                variant="outlined"
                className="ml-4 mb-4 h-24"
              />
            ))}
        </FuseAnimateGroup>
      )}
    </div>
  );
}

export default InfoEntreprise;
