// Représentation de la vue de pagination
export interface HydraView {
  "@id": string; // Lien vers la vue actuelle, ex: "/collection?page=1"
  type: string; // Type de la vue, ex: "hydra:PartialCollectionView"
  "hydra:first"?: string; // Lien vers la première page
  "hydra:last"?: string; // Lien vers la dernière page
  "hydra:previous"?: string; // Lien vers la page précédente (facultatif)
  "hydra:next"?: string; // Lien vers la page suivante
}

// Représentation d'un mapping dans la recherche Hydra
export interface HydraSearchMapping {
  "@type": string; // Type du mapping, ex: "IriTemplateMapping"
  variable: string; // Nom de la variable
  property: string; // Propriété associée
  required: boolean; // Indique si la variable est obligatoire
}

// Représentation des métadonnées de recherche Hydra
export interface HydraSearch {
  "@type": string; // Type de recherche, ex: "hydra:IriTemplate"
  "hydra:template": string; // Modèle d'URL pour la recherche
  "hydra:variableRepresentation": string; // Représentation des variables
  "hydra:mapping": HydraSearchMapping[]; // Tableau des mappings
}

export interface HydraResponse<T> {
  "hydra:member": T[]; // Liste des entités de type T
  "hydra:totalItems": number; // Nombre total d'entités
  "hydra:view"?: HydraView; // Pagination (facultatif)
  "hydra:search"?: HydraSearch; // Recherche (facultatif)
}
