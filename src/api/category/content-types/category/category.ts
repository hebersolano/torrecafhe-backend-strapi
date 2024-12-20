// Interface automatically generated by schemas-to-ts

import { Media } from '../../../../components/shared/interfaces/Media';
import { Media_Plain } from '../../../../components/shared/interfaces/Media';
import { AdminPanelRelationPropertyModification } from '../../../../common/schemas-to-ts/AdminPanelRelationPropertyModification';

export interface Category {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    name?: string;
    slug?: string;
    description?: string;
    image?: { data: Media };
  };
}
export interface Category_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  slug?: string;
  description?: string;
  image?: Media_Plain;
}

export interface Category_NoRelations {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  slug?: string;
  description?: string;
  image?: number;
}

export interface Category_AdminPanelLifeCycle {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  name?: string;
  slug?: string;
  description?: string;
  image?: AdminPanelRelationPropertyModification<Media_Plain>;
}
