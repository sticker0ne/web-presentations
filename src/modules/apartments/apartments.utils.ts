import type { ApartmentPosition, ApartmentType } from "@/modules/apartments/apartments.types";
import { apartmentPositionToTitleMap, apartmentTypeToTitleMap } from "@/modules/apartments/apartments.types";

export function buildApartmentImageUrl(fileName: string) {
  return import.meta.env.APP_APARTMENT_IMAGE_LINK_PREFIX + fileName;
}

export function buildApartmentPresentationUrl(fileName: string) {
  return import.meta.env.APP_APARTMENT_PDF_LINK_PREFIX + fileName;
}

export function getApartmentTypeTitle(apartmentType?: ApartmentType | string) {
  if (!apartmentType) return "";
  return apartmentTypeToTitleMap[apartmentType as ApartmentType] || "";
}

export function getApartmentPositionTitle(apartmentPosition?: ApartmentPosition | string) {
  if (!apartmentPosition) return "";
  return apartmentPositionToTitleMap[apartmentPosition as ApartmentPosition] || "";
}
